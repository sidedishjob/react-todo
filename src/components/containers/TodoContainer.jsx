import React from 'react';
import useTodos from '../../hooks/useTodos';
import useDarkMode from '../../hooks/useDarkMode';
import TodoAppUI from '../presentational/TodoAppUI';

// 状態を管理し、UI層に渡すだけのコンテナ
const TodoContainer = () => {
	const {
		todos,
		isLoading,
		add,
		updateTitle,
		toggleTodo,
		remove,
	} = useTodos();

	const { isDarkMode, toggleDarkMode } = useDarkMode();

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
