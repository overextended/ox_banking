import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import BaseCard from '@/layouts/bank/components/BaseCard';

interface Props {
  label: string;
  amount: number;
  icon: LucideIcon;
}

const AccountCard: React.FC<Props> = (props) => {
  return (
    <BaseCard icon={props.icon} title={props.label} className='flex-1'>
      <p className='text-3xl'>{formatNumber(props.amount)}</p>
    </BaseCard>
  );
};

export default AccountCard;
