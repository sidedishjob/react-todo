import { useState, useEffect } from "react";
import { initDb, getDb } from "../lib/db";
import { v4 as uuidv4 } from "uuid";

export function useTodos() {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	
	useEffect(() => {
		(async () => {
			await initDb();
			const db = getDb();

			// todos の読み込み
			const todoRes = db.exec("SELECT * FROM todos");
			if (todoRes.length > 0) {
				const rows = todoRes[0].values.map(([id, name, completed]) => ({
					id, name, completed: Boolean(completed)
				}));
				setTodos(rows);
			}

			// darkMode の読み込み
			const settingsRes = db.exec("SELECT dark_mode FROM app_settings WHERE id = 'default' ");
			const isDark = Boolean(settingsRes[0].values[0][0]);
			setDarkMode(isDark);

			setIsLoading(false);
		})();
	}, []);

	// darkModeの値が変化した時時に実行（クラス付与）
	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);
	
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

	// ダークモードの切り替え
	const toggleDarkMode = () => {
		const db = getDb();
		db.run("UPDATE app_settings SET dark_mode = ?, updated_at = ? WHERE id = 'default' ", [darkMode ? 0 :1, new Date().toISOString()]);
		setDarkMode(!darkMode);
	}

	return { todos, isLoading, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted, darkMode, toggleDarkMode };
}
