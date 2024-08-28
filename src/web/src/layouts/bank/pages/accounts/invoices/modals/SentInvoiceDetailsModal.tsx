import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { SentInvoice } from '~/src/common/typings';

const SentInvoiceDetailsModal: React.FC<{ invoice: SentInvoice }> = ({ invoice }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">Sent to</p>
        <p className="text-sm">{invoice.label}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Sent by</p>
        <p className="text-sm">{invoice.sentBy}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Sent at</p>
        <p className="text-sm">{invoice.sentAt}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Due date</p>
        <p className="text-sm">{invoice.dueDate}</p>
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

export default SentInvoiceDetailsModal;
