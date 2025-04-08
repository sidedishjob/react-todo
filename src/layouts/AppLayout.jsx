import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiArrowLeft ,FiSettings } from 'react-icons/fi';

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
	const isSettings = location.pathname === '/settings';

	return (
		<div className="in-h-screen bg-background text-gray-800 dark:text-gray-100 transition-colors duration-300">
			{/* ナビゲーションバー */}
			<header className="bg-card dark:bg-gray-800 shadow p-4 flex justify-between items-center">
				{/* 左側ナビ：戻る / ホーム / 設定 */}
				<div className="flex items-center gap-4">
					{/* 戻る（ホーム以外） */}
					{!isHome && (
						<button
							onClick={() => navigate(-1)}
							className="text-gray-400 hover:text-gray-700"
							aria-label="戻る"
						>
							<FiArrowLeft className="w-5 h-5" />
						</button>
					)}

					{/* ホーム */}
					<button
						onClick={() => navigate('/')}
						className="text-gray-400 hover:text-gray-700"
						aria-label="ホーム"
					>
						<FiHome className="w-5 h-5" />
					</button>
					{/* 設定 */}
					{!isSettings && (
						<button
							onClick={() => navigate('/settings')}
							className="text-sm text-gray-400 hover:text-gray-700"
							aria-label="設定"
						>
							<FiSettings className="w-5 h-5" />
						</button>
					)}
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
