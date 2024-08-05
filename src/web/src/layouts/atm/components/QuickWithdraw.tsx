import React from 'react';
import BaseCard from '../../bank/components/BaseCard';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatNumber';
import config from '~/config.json';
import locales from '@/locales';
import SpinningLoader from '@/components/SpinningLoader';
import { Account } from '@/typings';

interface Props {
  isWithdrawing: boolean;
  handleWithdraw: (amount: number) => void;
  account: Account;
}

const QuickWithdraw: React.FC<Props> = ({ isWithdrawing, handleWithdraw, account }) => {
  return (
    <BaseCard title={locales.quick_withdraw} icon={Zap} className="flex justify-between">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          {config.withdraw_amounts.map(
            (amount, index) =>
              index % 2 === 0 && (
                <Button
                  key={amount}
                  onClick={() => handleWithdraw(amount)}
                  disabled={isWithdrawing || amount > account.balance}
                >
                  {!isWithdrawing ? formatNumber(amount) : <SpinningLoader />}
                </Button>
              )
          )}
        </div>
        <div className="flex flex-col gap-2">
          {config.withdraw_amounts.map(
            (amount, index) =>
              index % 2 === 1 && (
                <Button
                  key={amount}
                  onClick={() => handleWithdraw(amount)}
                  disabled={isWithdrawing || amount > account.balance}
                >
                  {!isWithdrawing ? formatNumber(amount) : <SpinningLoader />}
                </Button>
              )
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default QuickWithdraw;
