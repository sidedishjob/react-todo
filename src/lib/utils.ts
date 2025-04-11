/**
 * クラス名を結合するためのユーティリティ関数
 * @param  {...string} classes - 結合するクラス名
 * @returns {string} 結合されたクラス名
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
	return classes.filter(Boolean).join(" ");
}