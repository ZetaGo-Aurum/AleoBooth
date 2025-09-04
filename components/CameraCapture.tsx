
import React, { useRef, useEffect, useCallback, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please check permissions and try again.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  if (error) {
    return (
        <div className="w-full max-w-lg text-center p-8 bg-gray-800 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Camera Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
                onClick={onCancel}
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
                Back
            </button>
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-4 border-2 border-gray-700">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCapture}
          className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-full shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Capture
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
