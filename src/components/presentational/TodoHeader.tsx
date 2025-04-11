import React from 'react';

const TodoHeader = () => {
	return (
		<header className="mb-6">
			<h1 className="text-3xl font-bold text-primary dark:text-blue-400 transition-colors duration-300">Todo App</h1>
			<p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">毎日のタスクを管理しましょう</p>
		</header>
	);
};

export default TodoHeader; 