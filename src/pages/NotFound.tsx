import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

export default function NotFound() {
	return (
		// <div className="text-center mt-20">
		// 	<h1 className="text-5xl font-bold">404</h1>
		// 	<p className="mt-4 text-xl">ページが見つかりませんでした。</p>
		// 	<Link to="/" className="text-blue-500 underline mt-4 inline-block">
		// 		ホームに戻る
		// 	</Link>
		// </div>
		<AppLayout>
			<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
				<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">404 Not Found</h2>
				<p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">ページが見つかりませんでした。</p>
				<Link to="/" className="text-blue-500 underline mt-4 inline-block">
					ホームに戻る
				</Link>
			</div>
		</AppLayout>
	);
}
