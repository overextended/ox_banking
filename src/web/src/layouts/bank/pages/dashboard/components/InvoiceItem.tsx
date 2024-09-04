import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { ArrowDownRight, ArrowUpRight, FileCheck, FileClock, FileText, FileX } from 'lucide-react';
import { Invoice } from '~/src/common/typings';
import locales from '@/locales';
import { cn } from '@/lib/utils';

const InvoiceItem: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          'bg-secondary text-secondary-foreground flex h-9 w-9 items-center justify-center rounded-lg',
          invoice.status === 'paid' && 'bg-green-400/20 text-green-700 dark:bg-green-500/20 dark:text-green-500',
          invoice.status === 'overdue' && 'bg-red-400/20 text-red-700 dark:bg-red-500/20 dark:text-red-500'
        )}
      >
        {invoice.status === 'paid' ? (
          <FileCheck size={20} />
        ) : invoice.status === 'overdue' ? (
          <FileClock size={20} />
        ) : (
          <FileText size={20} />
        )}
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{invoice.label}</p>
        <p className="text-muted-foreground text-xs">
          {invoice.status === 'paid'
            ? locales.invoice_paid_at.format(invoice.paidAt)
            : locales.invoice_due_by.format(invoice.dueDate)}
        </p>
      </div>
      <div className="ml-auto font-medium">{formatNumber(invoice.amount)}</div>
    </div>
  );
};

export default InvoiceItem;
