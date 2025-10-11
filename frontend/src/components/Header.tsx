import React, { useContext } from 'react';
import { ScanSearchIcon, SunIcon, MoonIcon } from 'lucide-react';
import { DarkModeContext } from '../contexts/DarkModeContext';

export function Header() {
  const context = useContext(DarkModeContext);

  if (!context) {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ScanSearchIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              TextRefine<span className="text-blue-600">AI</span>
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-md">
            <MoonIcon className="h-5 w-5" />
          </button>
        </div>
      </header>
    );
  }

  const { isDarkMode, toggleDarkMode } = context;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ScanSearchIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            TextRefine<span className="text-blue-600">AI</span>
          </span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}