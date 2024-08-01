import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';


export const Header: React.FC = () => {
  return (
    <header className="p-4">
        <div className="absolute top-0 left-0 w-full h-16 py-10 bg-gradient-to-l bg-green-300 flex items-center p-4">
          <img src="/bannerIFC.png" alt="Banner IFC" className="h-16 w-auto object-contain" />
        </div>
        <div className='absolute right-2'><ModeToggle  /></div>
    </header>
  );
};