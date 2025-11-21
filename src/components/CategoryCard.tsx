import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Check, X } from 'lucide-react';
import { Category, Task } from '../types';

interface CategoryCardProps {
  category: Category;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      
      onUpdateCategory({
        ...category,
        tasks: [...category.tasks, newTask],
      });
      
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    onUpdateCategory({
      ...category,
      tasks: category.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const handleDeleteTask = (taskId: string) => {
    onUpdateCategory({
      ...category,
      tasks: category.tasks.filter(task => task.id !== taskId),
    });
  };

  const handleMoveTask = (taskId: string, direction: 'up' | 'down') => {
    const index = category.tasks.findIndex(task => task.id === taskId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === category.tasks.length - 1)
    ) {
      return;
    }

    const newTasks = [...category.tasks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newTasks[index], newTasks[newIndex]] = [newTasks[newIndex], newTasks[index]];

    onUpdateCategory({
      ...category,
      tasks: newTasks,
    });
  };

  const completedCount = category.tasks.filter(t => t.completed).length;
  const totalCount = category.tasks.length;

  return (
    <div className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#e8f0ff', backdropFilter: 'blur(10px)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full shadow-md"
            style={{ backgroundColor: category.color }}
          />
          <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
        </div>
        <button
          onClick={() => onDeleteCategory(category.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
          title="Delete category"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="mb-4 rounded-lg p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span className="font-medium">
            {completedCount} / {totalCount}
          </span>
        </div>
        <div className="mt-2 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%',
              backgroundColor: category.color,
            }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
        {category.tasks.map((task, index) => (
          <div
            key={task.id}
            className={`rounded-xl p-3 transition-all duration-200 ${
              task.completed ? 'opacity-60' : ''
            }`}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleTask(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  task.completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-400 hover:border-green-500'
                }`}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              
              <span
                className={`flex-1 text-gray-700 ${
                  task.completed ? 'line-through' : ''
                }`}
              >
                {task.text}
              </span>

              <div className="flex gap-1">
                <button
                  onClick={() => handleMoveTask(task.id, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:bg-white/30 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleMoveTask(task.id, 'down')}
                  disabled={index === category.tasks.length - 1}
                  className="p-1 hover:bg-white/30 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddingTask ? (
        <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Enter task..."
            className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddTask}
              className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingTask(false);
                setNewTaskText('');
              }}
              className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-gray-700 font-medium"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      )}
    </div>
  );
};
