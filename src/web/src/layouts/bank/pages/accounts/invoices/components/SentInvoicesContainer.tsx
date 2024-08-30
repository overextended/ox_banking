import React from 'react';
import SentInvoiceItem from './SentInvoiceItem';
import { SentInvoice } from '~/src/common/typings';

const SentInvoicesContainer: React.FC<{ invoices: SentInvoice[] }> = ({ invoices }) => {
  return (
    <div className="flex flex-col gap-2">
      {invoices.map((invoice) => (
        <SentInvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default SentInvoicesContainer;
