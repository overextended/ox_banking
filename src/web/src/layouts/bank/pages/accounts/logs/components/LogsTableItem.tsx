import React from 'react';
import { formatNumber } from '../../../../../../utils/formatNumber';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { AvatarFallback } from '@/components/ui/avatar';
import { Avatar } from '@/components/ui/avatar';

interface Props {
  name: string;
  message: string;
  amount: number;
  newBalance: number;
  type: 'outbound' | 'inbound';
  date: string;
}

const LogsTableItem: React.FC<Props> = ({ name, message, amount, newBalance, date, type }) => {
  return (
    <div className="hover:bg-secondary grid grid-cols-[36px,repeat(5,1fr)] place-items-center gap-2 rounded-lg p-2 text-center hover:cursor-pointer">
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
