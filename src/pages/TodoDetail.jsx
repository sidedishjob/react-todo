import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import useTodos from '../hooks/useTodos';
import { LoadingSpinner } from '../components/presentational/TodoAnimations';

const TodoDetail = () => {
	const { id } = useParams();
	const { getById } = useTodos();

	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const fetchTodo = async () => {
			setIsLoading(true);
			const result = await getById(Number(id));
			if (result) {
				setTodo(result);
				setNotFound(false);
			} else {
				setNotFound(true);
			}
			setIsLoading(false);
		};

		fetchTodo();
	}, [id, getById]);
	
	return (
		<AppLayout>
			{isLoading ? (
				<LoadingSpinner />
			) : notFound ? (
				<p className="text-gray-500">該当するTodoは存在しません。</p>
			) : (
				<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
					<h2 className="text-3xl font-bold text-primary dark:text-blue-400 transition-colors duration-300">Todo詳細</h2>

					<div className="space-y-2">
						<p className="text-lg">
							<span className="font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">タイトル：</span>
							{todo.title}
						</p>

						<p className="text-lg">
							<span className="font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">ステータス：</span>
							<span
								className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium  ${
									todo.completed ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
								}`}
							>
								{todo.completed ? '完了' : '未完了'}
							</span>
						</p>

						<p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
							作成日時：{new Date(todo.createdAt).toLocaleString()}
						</p>
						{todo.updatedAt && (
							<p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
								更新日時：{new Date(todo.updatedAt).toLocaleString()}
							</p>
						)}
					</div>
				</div>
			)}
		</AppLayout>

	);
};

export default TodoDetail;
