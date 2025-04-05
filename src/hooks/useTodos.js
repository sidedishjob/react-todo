import { useState, useEffect } from "react";
import { initDb, getDb } from "../lib/db";
import { v4 as uuidv4 } from "uuid";

export function useTodos() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		(async () => {
			await initDb();
			const db = getDb();
			const res = db.exec("SELECT * FROM todos");
			if (res.length > 0) {
				const rows = res[0].values.map(([id, name, completed]) => ({
					id, name, completed: Boolean(completed)
				}));
				setTodos(rows);
			}
			setIsLoading(false);
		})();
	}, []);
	
	const addTodo = (name) => {
		const db = getDb();
		const id = uuidv4();
		db.run("INSERT INTO todos (id, name, completed) VALUES (?, ?, ?)", [id, name, 0]);
		setTodos([...todos, { id, name, completed: false}]);
	};

	const toggleTodo = (id) => {
		const db = getDb();
		const target = todos.find(t => t.id === id);
		db.run("UPDATE todos SET completed = ? WHERE id = ?", [target.completed ? 0 : 1, id]);
		setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed } : t ));
	};

	const deleteTodo = (id) => {
		const db = getDb();
		db.run("DELETE FROM todos WHERE id = ?", [id]);
		setTodos(todos.filter(t => t.id !== id));
	};

	const updateTodo = (id, name) => {
		const db = getDb();
		db.run("UPDATE todos SET name = ? WHERE id = ?", [name, id]);
		setTodos(todos.map(t => t.id === id ? {...t, name } : t ));
	};

	const clearCompleted = () => {
		const db = getDb();
		db.run("DELETE FROM todos WHERE completed = 1");
		setTodos(todos.filter(t => !t.completed));
	}

	return { todos, isLoading, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted };
}
