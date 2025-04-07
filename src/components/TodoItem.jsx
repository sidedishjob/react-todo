import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { todoAppearClass, todoCompleteClass, CompletedCheck } from './TodoAnimations';
import { FiEdit2 } from 'react-icons/fi';

const TodoItem = ({ todo, updateTitle, toggleTodo, remove }) => {
	const [isCompleting, setIsCompleting] = useState(false);
	// タスク名編集フラグの状態
	const [isEditing, setIsEditing] = useState(false);
	// 入力幅の状態
	const [inputWidth, setInputWidth] = useState("auto");
	// 編集用の状態
	const [editTitle, setEditTitle] = useState(todo.title);
	const inputRef = useRef(null);
	const hiddenSpanRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	// 編集モードに入る前に幅を計算してから状態を更新
	const startEditing = () => {
		if (hiddenSpanRef.current && containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const textWidth = hiddenSpanRef.current.offsetWidth + 8;
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
			const textWidth = hiddenSpanRef.current.offsetWidth + 8;	// テキスト幅+余白
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

	const handleDeleteClick = (e) => {
		e.stopPropagation();
		remove(todo.id);
	};

	const handleInputChange = (e) => {
		const newTitle = e.target.value;
		// 入力中は state に保持のみ（DB書き込みしない）
		setEditTitle(newTitle);
		// 入力に応じて幅調整
		recalculateInputWidth();

		// 入力内容が変わったら幅も再計算
		if (hiddenSpanRef.current && containerRef.current) {
			const containerWidth = containerRef.current.clientWidth;
			const textWidth = hiddenSpanRef.current.offsetWidth + 8;
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

	const handleInputKeyDown = (e) => {
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
				"todo-card mb-2 flex items-center justify-between group",
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
						//style={{ width: inputWidth }} // スタイルで幅を直接指定
						style={{ width: inputWidth, maxWidth: "100%" }}
						className={cn(
							"input p-0 text-lg transition-all duration-200",
							"overflow-hidden text-ellipsis",
							todo.completed && "line-through text-gray-500"
						)}
					/>
				) : (
					<span
						onClick={handleTitleClick}
						className={cn(
							"relative group cursor-pointer text-lg transition-all duration-200 flex items-center gap-1",
							todo.completed && "line-through text-gray-500"
						)}
					>
						{todo.title}
						{!todo.completed && <FiEdit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
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

			<button 
				onClick={handleDeleteClick}
				className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-danger transition-opacity duration-200"
				aria-label="タスクを削除"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	);
};

export default TodoItem; 