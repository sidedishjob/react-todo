import React from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import { LoadingSpinner } from './TodoAnimations';

const TodoAppUI = ({
	todos,
	isLoading,
	add,
	updateTitle,
	toggleTodo,
	remove,
}) => {
	return (
		<div className={"p-4 sm:p-6 md:p-8"}>
			<div className="mx-auto max-w-3xl bg-card dark:bg-card-dark shadow-lg rounded-lg p-4 sm:p-6 transition-colors duration-300">
				<div className="flex justify-between items-center mb-4">
					<TodoHeader />
				</div>

				<TodoInput add={add} />

				<main className="min-h-[300px]">
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<TodoList
						todos={todos}
						updateTitle={updateTitle}
						toggleTodo={toggleTodo}
						remove={remove}
						/>
					)}
				</main>

				<TodoStats todos={todos} />
			</div>
		</div>
	);
}

export default TodoAppUI;
