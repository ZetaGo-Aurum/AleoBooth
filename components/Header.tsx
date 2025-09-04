import React from 'react';
import { SparklesIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-5xl text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-white flex items-center justify-center gap-3">
        <span className="text-cyan-400">
            <SparklesIcon />
        </span>
        AleoBooth
      </h1>
      <p className="text-lg text-gray-400 mt-2">
        Create stunning AI transformations of your photos.
      </p>
    </header>
  );
};

export default Header;