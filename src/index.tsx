import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// favicon を動的に切り替える関数
function updateFaviconForTheme(theme: string) {
	const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
	if (!favicon) return;

	if (theme === "dark") {
		favicon.type = "image/x-icon";
		favicon.href = `${process.env.PUBLIC_URL}/favicon.ico?v=${Date.now()}`;
	} else {
		favicon.type = "image/svg+xml";
		favicon.href = `${process.env.PUBLIC_URL}/favicon.svg?v=${Date.now()}`;
	}
}

// DOMContentLoadedイベントでファビコンを設定する
document.addEventListener('DOMContentLoaded', () => {
	const darkModeMedia = window.matchMedia("(prefers-color-scheme: dark)");
	updateFaviconForTheme(darkModeMedia.matches ? "dark" : "light");

	darkModeMedia.addEventListener("change", (e) => {
		updateFaviconForTheme(e.matches ? "dark" : "light");
	});
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
