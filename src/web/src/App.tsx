import React from 'react';
import Bank from '@/layouts/bank/Bank';
import DeveloperDrawer from './layouts/dev/DeveloperDrawer';
import { isEnvBrowser } from './utils/misc';
import ModalsProvider from './components/ModalsProvider';
import ATM from '@/layouts/atm/ATM';
import locales, { setLocale } from './locales';
import { setPermissions } from './permissions';
import { useNuiEvent } from './hooks/useNuiEvent';
import { AccountPermissions, AccountRole } from './typings';

const App: React.FC = () => {
  useNuiEvent(
    'setInitData',
    (data: { locales: typeof locales; permissions: Record<AccountRole, AccountPermissions> }) => {
      setLocale(data.locales);
      setPermissions(data.permissions);
    }
  );

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
