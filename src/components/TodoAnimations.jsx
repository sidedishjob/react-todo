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
    className="w-5 h-5 text-secondary" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M5 13l4 4L19 7"
      className="animate-draw-check" 
    />
  </svg>
);

// タスク追加時のアニメーション用クラス
export const todoAppearClass = "animate-fade-in";

// タスク完了時のアニメーション用クラス
export const todoCompleteClass = "animate-complete";

// タスク削除時のアニメーション用クラス
export const todoDeleteClass = "animate-fade-out"; 