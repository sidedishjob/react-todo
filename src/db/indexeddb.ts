import { openDB, IDBPDatabase } from 'idb';

// Todo型を定義
interface Todo {
	// id はDBで autoIncrement: true なので、追加時は undefined でもOKなように ? にしておきます。
	id?: number;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

// Todoと設定を含むDB型を定義
interface DBStructure {
	todos: Todo;
	settings: {
		key: string;
		value: string;
	};
}

// indexedDB を初期化（DBがなければ作成）
export const initDB = async (): Promise<IDBPDatabase<DBStructure>> => {
	return openDB<DBStructure>('todoAppDB', 1, {
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
export const getAllTodos = async (): Promise<Todo[]> => {
	const db = await initDB();
	const tx = db.transaction('todos', 'readonly');
	const store = tx.store.index('createdAt');
	return store.getAll();
};

// Todoをidで取得する
export const getTodoById = async (id: number): Promise<Todo | undefined> => {
	const db = await initDB();
	return db.get('todos', id);
}

// Todoを追加する
export const addTodo = async (todo: Todo): Promise<number> => {
	const db = await initDB();
	return db.add('todos', todo) as Promise<number>;
};

// タイトルを更新する（DB専用）
export const updateTodoTitleInDB = async (id: number, newTitle: string): Promise<Todo | undefined> => {
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
export const deleteTodo = async (id: number): Promise<void> => {
	const db = await initDB();
	await db.delete('todos', id);
	return;
};

// 完了状態を切り替えて更新する（DB専用）
export const toggleTodoInDB = async (id: number): Promise<Todo | undefined> => {
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
export const getSetting = async (key: string): Promise<string | undefined> => {
	const db = await initDB();
	const result = await db.get('settings', key);
	//TODO: valueが取れなかった場合、nullまたはundefinedどちらが返るか確認。
	return result?.value ?? undefined;
};

// 設定の値を保存・更新する
export const saveSetting = async (key: string, value: string): Promise<void> => {
	const db = await initDB();
	await db.put('settings', { key, value });
	return;
};
