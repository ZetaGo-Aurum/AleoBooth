
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon, CameraIcon } from './icons/Icons';

interface ImageInputProps {
  onImageSelected: (imageDataUrl: string) => void;
  onStartCamera: () => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelected, onStartCamera }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (PNG, JPG, etc.).');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageSelected(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg text-center p-8 bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl shadow-xl transition-all duration-300 hover:border-cyan-500 hover:bg-gray-800/80">
      <h2 className="text-2xl font-semibold text-white mb-4">Start Creating</h2>
      <p className="text-gray-400 mb-8">Choose a photo from your device or use your camera.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleUploadClick}
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          <UploadIcon />
          Upload Image
        </button>
        <button
          onClick={onStartCamera}
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          <CameraIcon />
          Use Camera
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default ImageInput;
