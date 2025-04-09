
import { useEffect, useState } from 'react';
import { getSetting, saveSetting } from '../db/indexeddb';

/**
 * ダークモード設定を管理するカスタムフック
 */
const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// 初回レンダリング時に設定を取得
	useEffect(() => {
		const fetchDarkMode = async () => {
			const mode = await getSetting('darkMode');
			setIsDarkMode(mode === 'dark');
		};
		fetchDarkMode();
	}, []);

	// 状態が変更されたらDOMに反映
	useEffect(() => {
		const root = document.documentElement;
		if (isDarkMode) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [isDarkMode]);

	// ダークモードの切り替え
	const toggleDarkMode = async () => {
		const newMode = isDarkMode ? 'light' : 'dark';
		await saveSetting('darkMode', newMode);
		setIsDarkMode(newMode === 'dark');
	};
		
	return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
