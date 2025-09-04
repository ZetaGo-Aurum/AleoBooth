
import React, { useState } from 'react';
import { SparklesIcon } from './icons/Icons';

interface CustomPromptModalProps {
  onGenerate: (prompt: string) => void;
  onCancel: () => void;
}

const CustomPromptModal: React.FC<CustomPromptModalProps> = ({ onGenerate, onCancel }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <SparklesIcon className="text-cyan-400" />
          Create Your Own Transformation
        </h2>
        <p className="text-gray-400 mb-4">
          Describe the changes you want to see. Be as specific as you like! For example, "turn me into a pirate on a ship" or "add a cute cat on my shoulder".
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Make the background a futuristic city at night..."
          className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          aria-label="Custom AI prompt"
        />
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptModal;
