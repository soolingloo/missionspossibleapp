import React from 'react';
import { Mail, X } from 'lucide-react';

interface SuccessPopupProps {
  onClose: () => void;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in" style={{ backgroundColor: '#e8f0ff' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Check Your Email</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/40 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700 text-lg">
            We've sent a confirmation email to your inbox.
          </p>
          <p className="text-gray-600">
            Please check your email and click the confirmation link to activate your account.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Don't forget to check your spam folder if you don't see the email within a few minutes.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          OK, Got It
        </button>
      </div>
    </div>
  );
};
