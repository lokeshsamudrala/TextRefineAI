import React, { useEffect, useState, useCallback } from 'react';
import { StyleSelector } from './StyleSelector';
import { paraphraseText, ParaphrasingStyle } from '../utils/paraphrasingUtils';
import { CopyIcon, RefreshCwIcon, ArrowRightIcon } from 'lucide-react';
export function TextParaphraser() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ParaphrasingStyle>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleParaphrase = useCallback(async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const result = await paraphraseText(inputText, selectedStyle);
      setOutputText(result);
    } catch {
      setOutputText('Error: Failed to process text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedStyle]);

  useEffect(() => {
    if (inputText.trim()) {
      handleParaphrase();
    } else {
      setOutputText('');
    }
  }, [selectedStyle, handleParaphrase, inputText]);
  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Transform Your Text with AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Instantly rephrase any text to match your desired style and tone with our advanced AI technology.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Text
            </label>
            <div className="relative">
              <textarea id="inputText" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Enter your text here to paraphrase..." className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
          </div>
          <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
          <div className="flex justify-center my-6">
            <button onClick={handleParaphrase} disabled={!inputText.trim() || isLoading} className={`
                flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-all
                ${!inputText.trim() || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}>
              {isLoading ? <>
                  <RefreshCwIcon className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </> : <>
                  <ArrowRightIcon className="h-5 w-5" />
                  <span>Paraphrase</span>
                </>}
            </button>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="outputText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Paraphrased Text
              </label>
              <button onClick={handleCopy} disabled={!outputText} className={`
                  flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded transition-colors
                  ${!outputText ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600'}
                `}>
                <CopyIcon className="h-3.5 w-3.5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className={`
              w-full h-40 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto
              ${outputText ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-400 italic'}
            `}>
              {outputText || 'Paraphrased text will appear here...'}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            TextRefine AI uses advanced natural language processing to provide high-quality paraphrasing.
          </div>
        </div>
      </div>
      
    </div>;
}