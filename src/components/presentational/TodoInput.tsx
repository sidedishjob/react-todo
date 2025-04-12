import React, { useState } from 'react';
import { todoTitleSchema } from '../../lib/validation/todoSchema';

interface TodoInputProps {
	add: (title: string) => Promise<void>;
}

const TodoInput = ({ add }: TodoInputProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const result = todoTitleSchema.safeParse(inputValue);
		if (!result.success) {
			// エラーメッセージをstateに格納
			setError(result.error.issues[0].message);
			return;
		}

		setError(null);
		add(inputValue);
		setInputValue('');
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
			<div className="flex">
				<input
					type="text"
					value={inputValue}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
					placeholder="新しいタスクを入力..."
					className="input flex-grow mr-2 transition-colors duration-300"
				/>
				<button
					type="submit"
					className="btn btn-primary"
					disabled={!inputValue.trim()}
				>
					追加
				</button>
			</div>
			{error && <p className="text-red-500 text-sm ml-1">{error}</p>}
		</form>
	);
};

export default TodoInput; 