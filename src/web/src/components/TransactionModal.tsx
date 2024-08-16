import React from 'react';
import { LogItemProps } from '@/typings';
import locales from '@/locales';
import { formatNumber } from '../utils/formatNumber';

const TransactionModal: React.FC<LogItemProps> = ({ name, date, amount, newBalance, type, message }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">{locales.name}</p>
        <p className="text-sm">{name}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.transaction_type}</p>
        <p className="text-sm">
          {type === 'outbound' ? locales.transaction_type_outbound : locales.transaction_type_inbound}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.date}</p>
        <p className="text-sm">{date}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.amount}</p>
        <p className="text-sm">{formatNumber(amount)}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.new_balance}</p>
        <p className="text-sm">{formatNumber(newBalance)}</p>
      </div>
      <div>
        <p className="text-muted-foreground line-clamp-5 text-xs">{locales.message}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default TransactionModal;
