import { formatNumber } from '@/utils/formatNumber';
import React from 'react';
import SentInvoiceItem from './SentInvoiceItem';

const SentInvoicesTable: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <SentInvoiceItem status="sent" />
      <SentInvoiceItem status="overdue" />
      <SentInvoiceItem status="paid" />
      <SentInvoiceItem status="sent" />
      <SentInvoiceItem status="sent" />
      <SentInvoiceItem status="sent" />
    </div>
  );
};

export default SentInvoicesTable;
