import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { PaidInvoice } from '~/src/common/typings';

const PaidInvoiceDetailsModal: React.FC<{ invoice: PaidInvoice }> = ({ invoice }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">Payment to</p>
        <p className="text-sm">{invoice.label}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Due date</p>
        <p className="text-sm">{invoice.dueDate}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Paid at</p>
        <p className="text-sm">{invoice.paidAt}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Paid by</p>
        <p className="text-sm">{invoice.paidBy}</p>
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

export default PaidInvoiceDetailsModal;
