import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import TodoContainer from '../components/containers/TodoContainer';

const Home = () => {
	const navigate = useNavigate();

	return (
		<AppLayout>
			<TodoContainer />

			<div className="mt-10 flex flex-col items-start gap-4">
				<button
					onClick={() => navigate('/settings')}
					className="text-sm text-blue-500 hover:underline"
				>
					⚙️ 設定ページへ
				</button>

				<button
					onClick={() => navigate('/todo/1')}
					className="text-sm text-blue-500 hover:underline"
				>
					📄 Todo #1 の詳細ページへ
				</button>
			</div>
		</AppLayout>
	)
};

export default Home;
