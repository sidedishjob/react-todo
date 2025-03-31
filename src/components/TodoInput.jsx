import React, { useState } from 'react';
import { cn } from '../lib/utils';

const TodoInput = ({ addTodo, darkMode }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
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
        className={cn(
          "input flex-grow mr-2",
          darkMode ? "placeholder:text-gray-500" : "placeholder:text-gray-400"
        )}
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