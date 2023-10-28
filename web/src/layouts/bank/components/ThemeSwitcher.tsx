import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant='ghost' size='icon' className='w-[50px] h-[50px]' onClick={() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeSwitcher;
