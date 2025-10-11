import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TextParaphraser } from './components/TextParaphraser';
import { DarkModeProvider } from './contexts/DarkModeContext';

export function App() {
  return (
    <DarkModeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <TextParaphraser />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}