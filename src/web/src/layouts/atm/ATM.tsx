import React, { Suspense } from 'react';
import { useAtmVisibilityState } from '../../state/visibility';
import BaseCard from '../bank/components/BaseCard';
import { ChevronDown, ChevronUp, CreditCard, LogOut, Settings2, X, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useExitListener } from '../../hooks/useExitListener';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import AccountSelector from './components/AccountSelector';
import QuickWithdraw from './components/QuickWithdraw';
import { fetchNui } from '../../utils/fetchNui';
import SpinningLoader from '../../components/SpinningLoader';

const Atm: React.FC = () => {
  const [visible, setVisible] = useAtmVisibilityState();

  useExitListener(setVisible);

  useNuiEvent('openATM', () => {
    setVisible(true);
  });

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
              <AccountSelector />
              <QuickWithdraw />
              <BaseCard title="Custom amount" icon={Settings2}>
                <Input placeholder="Amount..." />
                <Button className="self-end">Withdraw</Button>
              </BaseCard>
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
                  Exit
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
