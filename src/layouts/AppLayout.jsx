import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiArrowLeft ,FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { cn } from '../lib/utils';
import useDarkMode from '../hooks/useDarkMode';

const getPageTitle = (pathname) => {
	if (pathname === '/') return 'Todo App for React';
	if (pathname.startsWith('/todo/')) return 'Todo の詳細';
	if (pathname === '/settings') return '設定';
	return 'ページ';
};

const AppLayout = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isDarkMode, toggleDarkMode } = useDarkMode();

	const pageTitle = getPageTitle(location.pathname);
	const isHome = location.pathname === '/';
	const isActive = (path) => location.pathname === path;

	return (
		<div className="in-h-screen">
			{/* ナビゲーションバー */}
			<header className="bg-card dark:bg-card-dark shadow p-4 flex justify-between items-center transition-colors duration-300">
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
						className={cn(
							!isActive('/') && "text-gray-400 hover:text-gray-700",
							isActive('/') && "text-blue-600 font-bold"
						)}
						aria-label="ホーム"
					>
						<FiHome className="w-5 h-5" />
					</button>
					{/* 設定 */}
					<button
						onClick={() => navigate('/settings')}
						// className="text-sm text-gray-400 hover:text-gray-700"
						className={cn(
							!isActive('/settings') && "text-gray-400 hover:text-gray-700",
							isActive('/settings') && "text-blue-600 font-bold"
						)}
							aria-label="設定"
					>
						<FiSettings className="w-5 h-5" />
					</button>
					{/* ダークモード切り替え */}
					<button
						onClick={toggleDarkMode}
						className="text-gray-400 dark:text-yellow-500"
						aria-label="ダークモード切り替え"
					>
						{isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
					</button>
				</div>

				{/* 現在のページ名 */}
				<h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100 transition-colors duration-300">{pageTitle}</h1>
			</header>

			{/* ページごとの中身 */}
			<main className="p-4 sm:p-6 md:p-8">
				{children}
			</main>
		</div>
	);
};

export default AppLayout;
