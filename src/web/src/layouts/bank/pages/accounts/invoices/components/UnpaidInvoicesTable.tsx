import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/formatNumber';
import React from 'react';
import { Receipt } from 'lucide-react';
import UnpaidInvoiceItem from './UnpaidInvoiceItem';

const UnpaidInvoicesTable: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <UnpaidInvoiceItem />
      <UnpaidInvoiceItem />
      <UnpaidInvoiceItem />
      <UnpaidInvoiceItem />
      <UnpaidInvoiceItem />
      <UnpaidInvoiceItem />
    </div>
  );
};

export default UnpaidInvoicesTable;
