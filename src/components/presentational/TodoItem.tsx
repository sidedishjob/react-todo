import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { todoAppearClass, todoCompleteClass, CompletedCheck } from './TodoAnimations';
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi';
import { Todo } from '../../types/todo';

interface TodoItemProps {
	todo: Todo;
	updateTitle: (id: number, newTitle: string) => Promise<void>;
	toggleTodo: (id: number) => Promise<void>;
	remove: (id: number) => Promise<void>;
}

const TodoItem = ({ todo, updateTitle, toggleTodo, remove }: TodoItemProps) => {
	const navigate = useNavigate();
	const [isCompleting, setIsCompleting] = useState(false);
	// タスク名編集フラグの状態
	const [isEditing, setIsEditing] = useState(false);
	// 入力幅の状態
	const [inputWidth, setInputWidth] = useState("auto");
	// 編集用の状態
	const [editTitle, setEditTitle] = useState(todo.title);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const hiddenSpanRef = useRef<HTMLSpanElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	// 編集モードに入る前に幅を計算してから状態を更新
	const startEditing = () => {
		if (hiddenSpanRef.current && containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const textWidth = hiddenSpanRef.current.offsetWidth + 20;
			const availableSpace = containerWidth - 120;
			const optimalWidth = Math.min(textWidth, availableSpace);
			
			// 先に幅を設定してから編集モードに切り替え
			setInputWidth(`${optimalWidth}px`);
			setIsEditing(true);
		}

		setEditTitle(todo.title);
		recalculateInputWidth();
		setIsEditing(true);
	};

	// 入力中のタイトルに応じて幅を再計算する
	const recalculateInputWidth = () => {
		if (hiddenSpanRef.current && containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const textWidth = hiddenSpanRef.current.offsetWidth + 20;	// テキスト幅+余白
			const availableSpace = containerWidth - 120;	// チェックボックス&削除ボタン領域
			const optimalWidth = Math.min(textWidth, availableSpace);
			setInputWidth(`${optimalWidth}px`);
		}
	};

	const handleTodoClick = () => {
		if (!todo.completed) {
			setIsCompleting(true);
			setTimeout(() => {
				toggleTodo(todo.id);
				setIsCompleting(false);
			}, 300);
		} else {
			toggleTodo(todo.id);
		}
	};

	const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		remove(todo.id);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value;
		// 入力中は state に保持のみ（DB書き込みしない）
		setEditTitle(newTitle);
		// 入力に応じて幅調整
		recalculateInputWidth();

		// 入力内容が変わったら幅も再計算
		if (hiddenSpanRef.current && containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const textWidth = hiddenSpanRef.current.offsetWidth + 20;
			const availableSpace = containerWidth - 120;
			const optimalWidth = Math.min(textWidth, availableSpace);
			setInputWidth(`${optimalWidth}px`);
		}
	}

	const handleTitleClick = () => {
		startEditing();
	}

	const handleInputBlur = () => {
		finishEditing();
	}

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			finishEditing();
		}
	}

	const finishEditing = () => {
		if (editTitle !== todo.title) {
			updateTitle(todo.id, editTitle);
		}
		setIsEditing(false);
	}

	return (
		<div 
			ref={containerRef}
			className={cn(
				"todo-card mb-2 flex items-center justify-between group transition-colors duration-300",
				todoAppearClass,
				isCompleting && todoCompleteClass,
				todo.completed && "bg-gray-100"
			)}
		>
			<div className="flex items-center gap-3">
				<div className="relative flex items-center justify-center w-5 h-5">
					<input 
						type="checkbox" 
						checked={todo.completed} 
						onChange={handleTodoClick} 
						className={cn(
							"h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer",
							todo.completed ? "opacity-0" : "opacity-100"
						)}
					/>
					{todo.completed && (
						<div className="absolute inset-0 flex items-center justify-center">
							<CompletedCheck />
						</div>
					)}
				</div>

				{isEditing && !todo.completed ? (
					<input 
						ref={inputRef}
						type="text"
						value={editTitle}
						onChange={handleInputChange}
						onBlur={handleInputBlur}
						onKeyDown={handleInputKeyDown}
						style={{ width: inputWidth, maxWidth: "100%" }}
						className={cn(
							"input p-0 h-6 text-lg transition-all duration-300",
							"overflow-hidden text-ellipsis",
							todo.completed && "line-through text-gray-500"
						)}
					/>
				) : (
					<span
						onClick={handleTitleClick}
						className={cn(
							"relative h-6 group cursor-pointer text-lg transition-all duration-300 flex items-center gap-1",
							todo.completed && "line-through text-gray-500"
						)}
					>
						{todo.title}
						{!todo.completed && <FiEdit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
					</span>
				)}

				{/* テキスト幅を測定するための非表示のspan */}
				<span
					ref={hiddenSpanRef}
					className="absolute invisible whitespace-pre text-lg"
				>
					{editTitle}
				</span>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => navigate(`/todo/${todo.id}`)}
					className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary transition-opacity duration-200"
					aria-label="詳細ページへ"
				>
					<FiSearch className="w-5 h-5" />
				</button>

				<button 
					onClick={handleDeleteClick}
					className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-danger transition-opacity duration-200"
					aria-label="タスクを削除"
				>
					<FiTrash2 className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

export default TodoItem; 