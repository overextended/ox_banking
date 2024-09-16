import React, { Suspense } from 'react';
import { useAtmVisibilityState } from '@/state/visibility';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExitListener } from '@/hooks/useExitListener';
import { useNuiEvent } from '@/hooks/useNuiEvent';
import AccountSelector from './components/AccountSelector';
import QuickWithdraw from './components/QuickWithdraw';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import locales from '@/locales';
import { Account } from '~/src/common/typings';
import CustomWithdrawAmount from './components/CustomWithdrawAmount';
import { delay } from '@/utils/misc';

const Atm: React.FC = () => {
  const [visible, setVisible] = useAtmVisibilityState();
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState<Account>({
    id: 0,
    balance: 0,
    type: 'personal',
    label: '',
    role: 'viewer',
  });

  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (visible) setShouldRender(true);
  }, [visible]);

  useExitListener(setVisible);

  useNuiEvent('openATM', () => {
    setVisible(true);
  });

  const handleWithdraw = React.useCallback(
    async (amount: number) => {
      setIsWithdrawing(true);
      await delay(500);
      const resp = await fetchNui('withdrawMoney', { accountId: selectedAccount?.id, amount }, { data: true }).then();
      if (resp) selectedAccount.balance -= amount;
      setIsWithdrawing(false);
    },
    [selectedAccount]
  );

  return (
    <>
      {shouldRender && (
        <div
          onAnimationEnd={() => !visible && setShouldRender(false)}
          data-state={visible ? 'open' : 'closed'}
          className="bg-background fill-mode-forwards data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom relative flex min-w-[400px] max-w-lg flex-col gap-2 rounded-lg p-2"
        >
          <Suspense
            fallback={
              <div className="flex h-[150px] items-center justify-center self-center">
                <SpinningLoader variant="primary" size={32} />
              </div>
            }
          >
            <>
              <AccountSelector setSelectedAccount={setSelectedAccount} />
              <QuickWithdraw account={selectedAccount} isWithdrawing={isWithdrawing} handleWithdraw={handleWithdraw} />
              <CustomWithdrawAmount
                isWithdrawing={isWithdrawing}
                handleWithdraw={handleWithdraw}
                account={selectedAccount}
              />
              <div className="flex flex-col">
                <Button
                  className="flex items-center gap-2"
                  variant="secondary"
                  onClick={() => {
                    setVisible(false);
                    fetchNui('exit').then();
                  }}
                >
                  <LogOut size={20} />
                  {locales.exit}
                </Button>
              </div>
            </>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Atm;
