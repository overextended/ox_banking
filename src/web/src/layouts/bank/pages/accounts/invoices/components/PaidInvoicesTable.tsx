import { formatNumber } from '@/utils/formatNumber';
import React from 'react';
import PaidInvoiceItem from './PaidInvoiceItem';

const PaidInvoicesTable: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <PaidInvoiceItem />
      <PaidInvoiceItem />
      <PaidInvoiceItem />
      <PaidInvoiceItem />
      <PaidInvoiceItem />
      <PaidInvoiceItem />
    </div>
  );
};

export default PaidInvoicesTable;
