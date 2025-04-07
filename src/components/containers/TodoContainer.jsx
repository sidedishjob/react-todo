import React from 'react';
import useTodos from '../../hooks/useTodos';
import TodoAppUI from '../presentational/TodoAppUI';

// 状態を管理し、UI層に渡すだけのコンテナ
const TodoContainer = () => {
	const {
		todos,
		isLoading,
		isDarkMode,
		add,
		updateTitle,
		toggleTodo,
		remove,
		toggleDarkMode,
	} = useTodos();

	return (
		<TodoAppUI
			todos={todos}
			isLoading={isLoading}
			isDarkMode={isDarkMode}
			add={add}
			updateTitle={updateTitle}
			toggleTodo={toggleTodo}
			remove={remove}
			toggleDarkMode={toggleDarkMode}
		/>
	);
};

export default TodoContainer;
