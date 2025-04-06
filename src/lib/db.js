import initSqlJs from "sql.js";

let db;

export async function initDb() {
	const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
	db = new SQL.Database();

	// todos table（TODO管理テーブル）
	db.run(`
		CREATE TABLE IF NOT EXISTS todos (
			id TEXT PRIMARY KEY,					-- タスクID（UUIDなど）
			name TEXT NOT NULL,						-- タスク名
			completed INTEGER NOT NULL DEFAULT 0	-- 完了フラグ
		);
	`);

	// app_settings table（アプリケーション設定テーブル）
	db.run(`
		CREATE TABLE IF NOT EXISTS app_settings (
			id TEXT PRIMARY KEY,		-- 設定ID（UUIDなど、または 'default' 固定）
			dark_mode INTEGER NOT NULL,	-- ダークモード（0: ライトモード, 1: ダークモード）
			updated_at TEXT				-- 更新日時
		);
	`);
	// 初期データの挿入（ダークモードのデフォルト値）
	db.run(`
		INSERT OR IGNORE INTO app_settings (id, dark_mode, updated_at)
		VALUES ('default', 0, '${new Date().toISOString()}');
	`);

	window.db = db; // デバッグ用
}

export function getDb() {
	if (!db) throw new Error("Database not initialized");
	return db;
}
