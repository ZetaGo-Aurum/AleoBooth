
import React from 'react';
import { Template } from '../types';

interface EditorProps {
  sourceImage: string;
  templates: Template[];
  onGenerate: (template: Template) => void;
  onBack: () => void;
}

const Editor: React.FC<EditorProps> = ({ sourceImage, templates, onGenerate, onBack }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Your Photo</h2>
        <img src={sourceImage} alt="Source" className="rounded-xl shadow-2xl object-contain w-full max-h-[40vh]" />
        <button 
          onClick={onBack}
          className="w-full mt-4 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Choose a different photo
        </button>
      </div>
      
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onGenerate(template)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-cyan-900/50 hover:border-cyan-500 transition-all duration-200 aspect-square"
              title={template.name}
            >
              <span className="text-cyan-400 text-3xl">{template.icon}</span>
              <span className="text-sm font-medium text-center">{template.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
