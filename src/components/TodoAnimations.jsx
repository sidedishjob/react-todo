import React from 'react';

// スタイル付きのローディングアニメーションコンポーネント
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
  </div>
);

// 完了時のチェックマークアニメーション
export const CompletedCheck = () => (
	<svg 
		className="w-5 h-5 text-primary" 
		viewBox="0 0 24 24" 
		fill="none" 
		stroke="currentColor" 
		strokeWidth="2" 
		strokeLinecap="round" 
		strokeLinejoin="round"
	>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);

// タスク追加時のアニメーション用クラス
export const todoAppearClass = "animate-[slideIn_0.3s_ease-out]";

// タスク完了時のアニメーション用クラス
export const todoCompleteClass = "animate-[complete_0.3s_ease-out]";

// タスク削除時のアニメーション用クラス
export const todoDeleteClass = "animate-fade-out"; 