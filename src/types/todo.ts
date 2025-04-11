export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

// 新規追加用：まだ ID がない状態の Todo
export type NewTodo = Omit<Todo, 'id'>;