
import React from 'react';
import { SparklesIcon } from './icons/Icons';

const Loader: React.FC = () => {
  const messages = [
    "Warming up the AI's creative circuits...",
    "Mixing digital paints and pixels...",
    "Consulting with virtual art masters...",
    "Generating a masterpiece...",
    "Adding the finishing touches...",
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-24 h-24 mb-6">
        <SparklesIcon className="w-full h-full text-cyan-400 animate-pulse" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">Creating your image...</h2>
      <p className="text-gray-400 w-64 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default Loader;
