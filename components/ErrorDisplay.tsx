import React from 'react';
import { AlertTriangleIcon } from './icons/Icons';

interface ErrorDisplayProps {
  message: string;
  onReset: () => void;
}

const isApiKeyError = (message: string): boolean => {
    const lowerCaseMessage = message.toLowerCase();
    return lowerCaseMessage.includes('api key') || lowerCaseMessage.includes('api_key');
}

const ApiKeyInstructions: React.FC = () => (
    <div className="text-left bg-gray-800 p-4 rounded-lg mt-6 border border-gray-600">
        <h3 className="font-bold text-lg text-white mb-2">How to Fix This:</h3>
        <p className="text-gray-300 mb-3">
            This error usually means the Gemini API Key is not configured correctly on the server. Please follow these steps in your Vercel project dashboard:
        </p>
        <ol className="list-decimal list-inside text-gray-400 space-y-2">
            <li>Go to your project's <strong>Settings</strong> tab.</li>
            <li>Click on <strong>Environment Variables</strong> in the side menu.</li>
            <li>Create a new variable with the name <code className="bg-gray-900 px-1.5 py-0.5 rounded text-cyan-400">API_KEY</code>.</li>
            <li>Paste your Gemini API key into the value field.</li>
            <li><strong>Important:</strong> Re-deploy your project for the changes to take effect.</li>
        </ol>
    </div>
);

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onReset }) => {
  const showInstructions = isApiKeyError(message);

  return (
    <div className="w-full max-w-2xl text-center p-8 bg-red-900/20 border-2 border-red-500 rounded-2xl shadow-xl">
      <div className="flex justify-center items-center mb-4">
        <AlertTriangleIcon className="w-12 h-12 text-red-400" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">An Error Occurred</h2>
      <p className="text-red-300 mb-6 break-words">{message}</p>
      <button
        onClick={onReset}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
      >
        Try Again
      </button>

      {showInstructions && <ApiKeyInstructions />}
    </div>
  );
};

export default ErrorDisplay;