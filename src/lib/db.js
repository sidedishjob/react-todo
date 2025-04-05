import initSqlJs from "sql.js";

let db;

export async function initDb() {
	const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
	db = new SQL.Database();
	db.run(`
		CREATE TABLE IF NOT EXISTS todos (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			completed INTEGER NOT NULL DEFAULT 0
		);
	`);
}

export function getDb() {
	if (!db) throw new Error("Database not initialized");
	return db;
}
