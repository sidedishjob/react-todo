import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import { LoadingSpinner } from "./components/TodoAnimations";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
	const [todos, setTodos] = useState(() => {
		const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
		return storedTodos ? JSON.parse(storedTodos) : [];
	});
	const [isLoading, setIsLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(() => {
		const savedMode = localStorage.getItem("darkMode");
		return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	useEffect(() => {
		// 読み込みシミュレーション
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 800);
		
		return () => clearTimeout(timer);
	}, []);

	const addTodo = (name) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: uuidv4(), name, completed: false },
		]);
	};

	const toggleTodo = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	const updateTodo = (id, name) => {
		setTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? {...todo, name} : todo
			)
		);
	}

	const clearCompleted = () => {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
	};

	return (
		<div className={`min-h-screen bg-background p-4 sm:p-6 md:p-8 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
			<div className="mx-auto max-w-3xl bg-card dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6 transition-colors duration-300">
				<div className="flex justify-between items-center mb-4">
					<TodoHeader />
					
					<button 
						onClick={() => setDarkMode(!darkMode)}
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
						aria-label={darkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
					>
						{darkMode ? (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
							</svg>
						)}
					</button>
				</div>
				
				<TodoInput addTodo={addTodo} darkMode={darkMode} />
				
				<main className="min-h-[300px]">
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<TodoList 
							todos={todos} 
							toggleTodo={toggleTodo} 
							deleteTodo={deleteTodo} 
							updateTodo={updateTodo}
						/>
					)}
				</main>
				
				<TodoStats todos={todos} clearCompleted={clearCompleted} />
			</div>
		</div>
	);
}

export default App;
