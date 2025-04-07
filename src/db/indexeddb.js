import { openDB } from 'idb';

// indexedDB を初期化（DBがなければ作成）
export const initDB = async () => {
	return openDB('todoAppDB', 1, {
		upgrade(db) {
			// Todo用オブジェクトストア作成
			const todoStore = db.createObjectStore('todos', {
				keyPath: 'id',
				autoIncrement: true,
			});
			// completedとcreatedAtで検索できるようにインデックスを作成
			todoStore.createIndex('completed', 'completed');
			todoStore.createIndex('createdAt', 'createdAt');

			// アプリ設定用のオブジェクトストア作成
			db.createObjectStore('settings', {
				keyPath: 'key',
			});
		},
	});
};

// -------------------- Todo関連 --------------------
// Todoを全件取得する
export const getAllTodos = async () => {
	const db = await initDB();
	const tx = db.transaction('todos', 'readonly');
	const store = tx.store.index('createdAt');
	return store.getAll();
};

// Todoを追加する
export const addTodo = async (todo) => {
	const db = await initDB();
	return db.add('todos', todo);
};

// タイトルを更新する（DB専用）
export const updateTodoTitleInDB = async (id, newTitle) => {
	const db = await initDB();

	// IDで対象のTodo取得
	const todo = await db.get('todos', id);
	if (!todo) return;
	
	// タイトルの更新
	const updated = {
		...todo,
		title: newTitle,
		updatedAt: new Date().toISOString(),
	}

	await db.put('todos', updated);
	return updated;
}

// Todoを削除する
export const deleteTodo = async (id) => {
	const db = await initDB();
	return db.delete('todos', id);
};

// 完了状態を切り替えて更新する（DB専用）
export const toggleTodoInDB = async (id) => {
	const db = await initDB();

	// IDで対象のTodo取得
	const todo = await db.get('todos', id);
	if (!todo) return;

	// 完了状態の切り替え
	const updated = {
		...todo,
		completed: !todo.completed,
		updatedAt: new Date().toISOString(),
	};

	// 更新されたTodoをDBに保存
	await db.put('todos', updated);

	return updated;
};


// -------------------- 設定関連 --------------------
// 設定の値を取得する
export const getSetting = async (key) => {
	const db = await initDB();
	const result = await db.get('settings', key);
	return result?.value;
};

// 設定の値を保存・更新する
export const saveSetting = async (key, value) => {
	const db = await initDB();
	return db.put('settings', { key, value });
};
