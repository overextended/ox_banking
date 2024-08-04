import React from 'react';
import BaseCard from '../../bank/components/BaseCard';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatNumber';
import config from '~/config.json';

const QuickWithdraw: React.FC = () => {
  return (
    <BaseCard title="Quick withdraw" icon={Zap} className="flex justify-between">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          {config.withdraw_amounts.map((amount, index) => index % 2 === 0 && <Button>{formatNumber(amount)}</Button>)}
        </div>
        <div className="flex flex-col gap-2">
          {config.withdraw_amounts.map((amount, index) => index % 2 === 1 && <Button>{formatNumber(amount)}</Button>)}
        </div>
      </div>
    </BaseCard>
  );
};

export default QuickWithdraw;
