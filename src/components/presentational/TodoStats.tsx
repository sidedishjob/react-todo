import React from 'react';
import { Todo } from '../../types/todo';

interface TodoStatsProps {
	todos: Todo[];
}

const TodoStats = ({ todos }: TodoStatsProps) => {
	const total = todos.length;
	const completed = todos.filter((todo) => todo.completed).length;
	const remaining = total - completed;

	return (
		<div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
			<span>合計: {total}件</span>
			<span>完了: {completed}件</span>
			<span>残り: {remaining}件</span>
		</div>
	);
};

export default TodoStats; 