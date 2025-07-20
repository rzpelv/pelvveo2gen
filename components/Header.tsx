
import React from 'react';
import { VeoLogo } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-xl p-4 border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <VeoLogo className="w-8 h-8"/>
        <h1 className="text-2xl font-bold text-white text-center tracking-wide">
          <span className="text-indigo-400">Veo 2</span> Video Generation
        </h1>
      </div>
    </header>
  );
};
