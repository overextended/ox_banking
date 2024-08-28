import { formatNumber } from '@/utils/formatNumber';
import React from 'react';
import { UnpaidInvoice } from '~/src/common/typings';

const UnpaidInvoiceDetailsModal: React.FC<{ invoice: UnpaidInvoice }> = ({ invoice }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">Payment to</p>
        <p className="text-sm">{invoice.label}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Due date</p>
        <p>{invoice.dueDate}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Message</p>
        <p className="text-sm">{invoice.message}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Total</p>
        <p className="text-sm">{formatNumber(invoice.amount)}</p>
      </div>
    </div>
  );
};

export default UnpaidInvoiceDetailsModal;
