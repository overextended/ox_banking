import ATM from '@/layouts/atm/ATM';
import Bank from '@/layouts/bank/Bank';
import React from 'react';
import ModalsProvider from './components/ModalsProvider';
import { useNuiEvent } from './hooks/useNuiEvent';
import DeveloperDrawer from './layouts/dev/DeveloperDrawer';
import locales, { setLocale } from './locales';
import { Permissions, setPermissions } from './permissions';
import { isEnvBrowser } from './utils/misc';

const App: React.FC = () => {
  useNuiEvent('setInitData', (data: { locales: typeof locales; permissions: Permissions }) => {
    setLocale(data.locales);
    setPermissions(data.permissions);
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ModalsProvider>
        <Bank />
        {isEnvBrowser() && <DeveloperDrawer />}
        <ATM />
      </ModalsProvider>
    </div>
  );
};

export default App;
