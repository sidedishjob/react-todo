import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

const TodoDetail = () => {
	const { id } = useParams();
	
	return (
		<AppLayout>
			<h2 className="text-2xl font-bold">Todoの詳細ページ</h2>
			<p className="mt-2">対象のID：{id}</p>

			{/* ここにidを元にTodoを検索して表示など */}

		</AppLayout>

	);
};

export default TodoDetail;
