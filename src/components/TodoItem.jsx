import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { todoAppearClass, todoCompleteClass, CompletedCheck } from './TodoAnimations';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
	const [isCompleting, setIsCompleting] = useState(false);
	
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
		deleteTodo(todo.id);
	};

	return (
		<div 
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
				
				<span 
					className={cn(
						"text-lg transition-all duration-200",
						todo.completed && "line-through text-gray-500"
					)}
				>
					{todo.name}
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