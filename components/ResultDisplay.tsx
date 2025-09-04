
import React from 'react';
import { AiResult } from '../types';
import { DownloadIcon, RefreshCwIcon, LayoutGridIcon, HomeIcon } from './icons/Icons';

interface ResultDisplayProps {
  result: AiResult;
  sourceImage: string;
  onReset: () => void;
  onRegenerate: () => void;
  onBackToEditor: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, sourceImage, onReset, onRegenerate, onBackToEditor }) => {
  const downloadImage = () => {
    if (result.imageUrl) {
      const link = document.createElement('a');
      link.href = result.imageUrl;
      link.download = `aleobooth-result-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-6">Here's your creation!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-400">Original</h3>
          <img src={sourceImage} alt="Original" className="rounded-xl shadow-lg w-full object-contain max-h-[60vh]" />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-3 text-cyan-400">AI Generated</h3>
          {result.imageUrl ? (
            <img src={result.imageUrl} alt="AI Generated" className="rounded-xl shadow-2xl w-full object-contain max-h-[60vh]" />
          ) : (
            <div className="w-full aspect-square bg-gray-800 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">No image was generated.</p>
            </div>
          )}
        </div>
      </div>

      {result.text && (
        <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg mb-8">
            <h4 className="font-semibold text-lg text-cyan-400 mb-2">AI's Note:</h4>
            <p className="text-gray-300 italic">{result.text}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        {result.imageUrl && (
          <button
            onClick={downloadImage}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-transform transform hover:scale-105"
          >
            <DownloadIcon />
            Download
          </button>
        )}
        <button
          onClick={onRegenerate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
        >
          <RefreshCwIcon />
          Regenerate
        </button>
         <button
          onClick={onBackToEditor}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
        >
          <LayoutGridIcon />
          Change Template
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
        >
          <HomeIcon />
          New Photo
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
