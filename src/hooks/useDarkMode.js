
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

	// ダークモードの切り替え
	const toggleDarkMode = async () => {
		const newMode = isDarkMode ? 'light' : 'dark';
		await saveSetting('darkMode', newMode);
		setIsDarkMode(newMode === 'dark');
	};
		
	return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
