
import React from 'react';
import { AlertTriangleIcon } from './icons/Icons';

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  return (
    <div className="w-full max-w-lg text-center p-8 bg-red-900/20 border-2 border-red-500 rounded-2xl shadow-xl">
      <div className="flex justify-center items-center mb-4">
        <AlertTriangleIcon className="w-12 h-12 text-red-400" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">An Error Occurred</h2>
      <p className="text-red-300 mb-6">{message}</p>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
