import React from 'react';
import { fetchNui } from '../utils/fetchNui';

// Basic hook to listen for key presses in NUI in order to exit
export const useExitListener = (visibleSetter: (visible: boolean) => void) => {
  const handleESC = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    visibleSetter(false);
    fetchNui('exit').then();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleESC);

    return () => window.removeEventListener('keydown', handleESC);
  }, []);
};
