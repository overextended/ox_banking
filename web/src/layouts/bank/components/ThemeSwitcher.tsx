import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import NavItem from '@/layouts/bank/components/NavItem';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <NavItem
      icon={theme === 'dark' ? Sun : Moon}
      label='Change theme'
      variant='ghost'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  );

};

export default ThemeSwitcher;
