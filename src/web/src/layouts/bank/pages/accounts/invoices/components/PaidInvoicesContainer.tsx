import React from 'react';
import PaidInvoiceItem from './PaidInvoiceItem';
import { PaidInvoice } from '~/src/common/typings';

const PaidInvoicesContainer: React.FC<{ invoices: PaidInvoice[] }> = ({ invoices }) => {
  return (
    <div className="flex flex-col gap-2">
      {invoices.map((invoice) => (
        <PaidInvoiceItem key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default PaidInvoicesContainer;
