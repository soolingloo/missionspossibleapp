import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessPopupProps {
  onClose: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in" style={{ backgroundColor: '#e8f0ff' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Success!</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/40 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <p className="text-gray-700 text-lg">
          Your account has been created successfully! Welcome to Missions Possible.
        </p>
      </div>
    </div>
  );
};
