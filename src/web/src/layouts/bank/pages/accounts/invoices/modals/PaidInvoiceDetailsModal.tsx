import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { PaidInvoice } from '~/src/common/typings';
import locales from '@/locales';

const PaidInvoiceDetailsModal: React.FC<{ invoice: PaidInvoice }> = ({ invoice }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_payment_to}</p>
        <p className="text-sm">{invoice.label}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_due_by}</p>
        <p className="text-sm">{invoice.dueDate}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_paid_at}</p>
        <p className="text-sm">{invoice.paidAt}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_details_paid_by}</p>
        <p className="text-sm">{invoice.paidBy}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.message}</p>
        <p className="text-sm">{invoice.message}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.invoice_total}</p>
        <p className="text-sm">{formatNumber(invoice.amount)}</p>
      </div>
    </div>
  );
};

export default PaidInvoiceDetailsModal;
