import React, { useState } from 'react';

const TodoInput = ({ add }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
			add(inputValue);
			setInputValue('');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4 flex">
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="新しいタスクを入力..."
				className={"input flex-grow mr-2 transition-colors duration-300"}
			/>
			<button
				type="submit"
				className="btn btn-primary"
				disabled={!inputValue.trim()}
			>
				追加
			</button>
		</form>
	);
};

export default TodoInput; 