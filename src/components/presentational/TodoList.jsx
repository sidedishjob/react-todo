import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTitle, toggleTodo, remove }) => {
	
	if (todos.length === 0) {
		return (
			<div className="py-10 text-center text-gray-500">
				<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
				</svg>
				<p className="text-lg">タスクがありません</p>
				<p className="text-sm">新しいタスクを追加しましょう</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
					updateTitle={updateTitle}
					toggleTodo={toggleTodo}
					remove={remove}
				/>
			))}
		</div>
	);
};

export default TodoList; 