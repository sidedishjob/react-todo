import React from 'react';

const TodoStats = ({ todos, clearCompleted }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  
  return (
    <div className="mt-6 bg-card rounded-md p-4 shadow-card">
      <div className="flex justify-between items-center">
        <div className="stats">
          <div className="flex gap-4">
            <div className="stat">
              <p className="text-sm text-gray-500">残りのタスク</p>
              <p className="text-2xl font-semibold text-primary">{remainingCount}</p>
            </div>
            <div className="stat">
              <p className="text-sm text-gray-500">完了したタスク</p>
              <p className="text-2xl font-semibold text-secondary">{completedCount}</p>
            </div>
            <div className="stat">
              <p className="text-sm text-gray-500">合計</p>
              <p className="text-2xl font-semibold">{todos.length}</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={clearCompleted}
          className="btn btn-danger"
          disabled={completedCount === 0}
        >
          完了したタスクを削除
        </button>
      </div>
      
      {todos.length > 0 && (
        <div className="mt-3 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-secondary h-full rounded-full transition-all duration-500" 
            style={{ width: `${Math.round((completedCount / todos.length) * 100)}%` }} 
          />
        </div>
      )}
    </div>
  );
};

export default TodoStats; 