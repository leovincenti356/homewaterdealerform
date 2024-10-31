import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  success: boolean;
  message: string;
}

export default function SuccessMessage({ success, message }: Props) {
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-successFadeIn">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-successCheckmark">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 p-4 rounded-lg shadow-lg bg-yellow-50 text-yellow-800 max-w-md animate-fadeIn">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}