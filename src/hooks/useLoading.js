import { useState, useCallback } from 'react';

/**
 * 汎用的な読み込み状態を管理するカスタムフック
 */
const useLoading = (initial = true) => {
	const [isLoading, setIsLoading] = useState(initial);

	const startLoading = useCallback(() => setIsLoading(true), []);
	const stopLoading = useCallback(() => setIsLoading(false), []);

	return {
		isLoading,
		startLoading,
		stopLoading,
	}
}

export default useLoading;
