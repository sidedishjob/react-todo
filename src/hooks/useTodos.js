import { useState, useEffect } from 'react';
import {
	getAllTodos,
	addTodo,
	updateTodoTitleInDB,
	toggleTodoInDB,
	deleteTodo,
} from '../db/indexeddb';

// Todo用のカスタムフック（状態管理 + 永続化）
const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// 初期表示時にIndexedDBからデータを取得
	useEffect(() => {
		const fetchTodos = async () => {
			const data = await getAllTodos();
			setTodos(data);
		};
		fetchTodos();

		setIsLoading(false);
	}, []);

	// Todoを追加する
	const add = async (title) => {
		const newTodo = {
			title,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		const id = await addTodo(newTodo);
		setTodos((prev) => [...prev, { ...newTodo, id }]);
	};

	// タイトルを更新する（DB & State)
	const handleUpdateTitle = async (id, newTitle) => {
		const updated = await updateTodoTitleInDB(id, newTitle);
		if (!updated) return;

		setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
	}

	// 完了状態を切り替える（DB & State）
	const handleToggleTodo = async (id) => {
		const updated = await toggleTodoInDB(id);
		if (!updated) return;

		setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
	};

	// Todoを削除する
	const remove = async (id) => {
		await deleteTodo(id);
		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	return {
		todos,
		isLoading,
		add,
		updateTitle: handleUpdateTitle,
		toggleTodo: handleToggleTodo,
		remove,
	};

};

export default useTodos;
