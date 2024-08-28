import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { SentInvoice } from '~/src/common/typings';
import locales from '@/locales';

const SentInvoiceDetailsModal: React.FC<{ invoice: SentInvoice }> = ({ invoice }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_sent_to}</p>
        <p className="text-sm">{invoice.label}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_sent_by}</p>
        <p className="text-sm">{invoice.sentBy}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_sent_at}</p>
        <p className="text-sm">{invoice.sentAt}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_due_by}</p>
        <p className="text-sm">{invoice.dueDate}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.message}</p>
        <p className="text-sm">{invoice.message}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">locales.total</p>
        <p className="text-sm">{formatNumber(invoice.amount)}</p>
      </div>
    </div>
  );
};

export default SentInvoiceDetailsModal;
