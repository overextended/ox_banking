import React, { Suspense } from 'react';
import { useAtmVisibilityState } from '../../state/visibility';
import BaseCard from '../bank/components/BaseCard';
import { LogOut, Settings2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useExitListener } from '../../hooks/useExitListener';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import AccountSelector from './components/AccountSelector';
import QuickWithdraw from './components/QuickWithdraw';
import { fetchNui } from '../../utils/fetchNui';
import SpinningLoader from '../../components/SpinningLoader';
import locales from '@/locales';
import { Account } from '../../../../common/typings';
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
      {visible && (
        <div className="bg-background relative flex min-w-[400px] max-w-lg flex-col gap-2 rounded-lg p-2">
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
