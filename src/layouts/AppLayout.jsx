import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const getPageTitle = (pathname) => {
	if (pathname === '/') return 'Todo アプリ';
	if (pathname === '/todo/') return 'Todo の詳細';
	if (pathname === '/settings') return '設定';
	return 'ページ';
};

const AppLayout = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const pageTitle = getPageTitle(location.pathname);
	const isHome = location.pathname === '/';

	return (
		<div className="in-h-screen bg-background text-gray-800 dark:text-gray-100 transition-colors duration-300">
			{/* ナビゲーションバー */}
			<header className="bg-card dark:bg-gray-800 shadow p-4 flex justify-between items-center">
				<div className="flex items-center gap-3">
					{/* 戻る */}
					{!isHome && (
						<button
							onClick={() => navigate(-1)}
							className="text-sm text-blue-500 hover:underline"
						>
							← 戻る
						</button>
					)}

					{/* ホーム */}
					<button
						onClick={() => navigate('/')}
						className="text-sm text-blue-500 hover:underline"
					>
						🏠 ホームへ
					</button>
				</div>

				{/* 現在のページ名 */}
				<h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100">{pageTitle}</h1>
			</header>

			{/* ページごとの中身 */}
			<main className="p-4 sm:p-6 md:p-8">
				{children}
			</main>
		</div>
	);
};

export default AppLayout;
