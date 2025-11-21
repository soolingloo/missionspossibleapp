import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddCategoryModalProps {
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}

const PRESET_COLORS = [
  '#FF6B9D', '#4ECDC4', '#95E1D3', '#FFA07A', '#9B59B6',
  '#3498DB', '#E74C3C', '#F39C12', '#2ECC71', '#1ABC9C',
  '#34495E', '#E67E22', '#16A085', '#8E44AD', '#C0392B',
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name.trim(), selectedColor);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-strong rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/30 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter category name..."
              className="w-full px-4 py-3 glass-light rounded-xl outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-200"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Color
            </label>
            <div className="grid grid-cols-5 gap-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-full aspect-square rounded-xl transition-all duration-200 ${
                    selectedColor === color
                      ? 'ring-4 ring-blue-400 scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
