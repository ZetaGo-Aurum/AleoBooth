
import React, { useState, useCallback } from 'react';
import { AppState, AiResult, Template } from './types';
import { TEMPLATES } from './constants';
import { editImageWithPrompt } from './services/geminiService';

import Header from './components/Header';
import ImageInput from './components/ImageInput';
import CameraCapture from './components/CameraCapture';
import Editor from './components/Editor';
import Loader from './components/Loader';
import ResultDisplay from './components/ResultDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import CustomPromptModal from './components/CustomPromptModal';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastUsedTemplate, setLastUsedTemplate] = useState<Template | null>(null);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(false);

  const handleImageSelected = useCallback((imageDataUrl: string) => {
    setSourceImage(imageDataUrl);
    setAppState(AppState.IMAGE_SELECTED);
  }, []);

  const handleStartCamera = useCallback(() => {
    setAppState(AppState.CAPTURING);
  }, []);
  
  const handleReset = useCallback(() => {
    setSourceImage(null);
    setAiResult(null);
    setErrorMessage('');
    setLastUsedTemplate(null);
    setShowCustomPrompt(false);
    setAppState(AppState.INITIAL);
  }, []);

  const executeGeneration = useCallback(async (template: Template) => {
    if (!sourceImage) {
      setErrorMessage('No source image available.');
      setAppState(AppState.ERROR);
      return;
    }
    setAppState(AppState.GENERATING);
    setLastUsedTemplate(template);
    setErrorMessage('');
    try {
      const result = await editImageWithPrompt(sourceImage, template.prompt);
      setAiResult(result);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(`Failed to generate image: ${message}`);
      setAppState(AppState.ERROR);
    }
  }, [sourceImage]);

  const handleGenerate = useCallback((template: Template) => {
    if (template.id === 'custom') {
      setShowCustomPrompt(true);
    } else {
      executeGeneration(template);
    }
  }, [executeGeneration]);

  const handleCustomGenerate = useCallback((customPrompt: string) => {
    const customTemplate: Template = {
        id: 'custom',
        name: 'Custom',
        prompt: customPrompt,
        icon: <></>, // Icon is not used in generation logic
    };
    setShowCustomPrompt(false);
    executeGeneration(customTemplate);
  }, [executeGeneration]);

  const handleRegenerate = useCallback(() => {
    if (lastUsedTemplate) {
      executeGeneration(lastUsedTemplate);
    }
  }, [lastUsedTemplate, executeGeneration]);

  const handleBackToEditor = useCallback(() => {
    setAiResult(null);
    setAppState(AppState.IMAGE_SELECTED);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.INITIAL:
        return <ImageInput onImageSelected={handleImageSelected} onStartCamera={handleStartCamera} />;
      case AppState.CAPTURING:
        return <CameraCapture onCapture={handleImageSelected} onCancel={handleReset} />;
      case AppState.IMAGE_SELECTED:
        return sourceImage && <Editor sourceImage={sourceImage} templates={TEMPLATES} onGenerate={handleGenerate} onBack={handleReset} />;
      case AppState.GENERATING:
        return <Loader />;
      case AppState.RESULT:
        return aiResult && sourceImage && (
          <ResultDisplay 
            result={aiResult} 
            sourceImage={sourceImage} 
            onReset={handleReset} 
            onRegenerate={handleRegenerate}
            onBackToEditor={handleBackToEditor}
          />
        );
      case AppState.ERROR:
        return <ErrorDisplay message={errorMessage} onReset={handleReset} />;
      default:
        return <p>Invalid state</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <Header />
      <main className="w-full max-w-5xl flex-grow flex flex-col items-center justify-center">
        {renderContent()}
        {showCustomPrompt && (
          <CustomPromptModal 
            onGenerate={handleCustomGenerate}
            onCancel={() => setShowCustomPrompt(false)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
