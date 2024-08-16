import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AvatarFallback } from '@/components/ui/avatar';
import { Avatar } from '@/components/ui/avatar';
import { useModal } from '@/components/ModalsProvider';
import TransactionModal from '@/components/TransactionModal';
import { LogItemProps } from '@/typings';
import locales from '@/locales';

const LogsTableItem: React.FC<LogItemProps> = ({ name, message, amount, newBalance, date, type }) => {
  const modal = useModal();

  return (
    <div
      className="hover:bg-secondary grid grid-cols-[36px,repeat(5,1fr)] place-items-center gap-2 rounded-lg p-2 text-center hover:cursor-pointer"
      onClick={() =>
        modal.open({
          title: locales.transaction_details,
          children: <TransactionModal {...{ name, message, amount, newBalance, date, type }} />,
        })
      }
    >
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {type === 'outbound' ? (
            <ArrowDownRight className="text-destructive" />
          ) : (
            <ArrowUpRight className="text-primary" />
          )}
        </AvatarFallback>
      </Avatar>
      <p>{name}</p>
      <p className="line-clamp-1">{message}</p>
      <p>{formatNumber(amount)}</p>
      <p>{formatNumber(newBalance)}</p>
      <p>{date}</p>
    </div>
  );
};

export default LogsTableItem;
