import React from 'react';
import { FileCheck, FileClock, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import SentInvoiceDetailsModal from '../modals/SentInvoiceDetailsModal';
import { cn } from '@/lib/utils';
import { SentInvoice } from '~/src/common/typings';
import locales from '@/locales';

const SentInvoiceItem: React.FC<{ invoice: SentInvoice }> = ({ invoice }) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'h-9 w-9 rounded-lg p-2',
            invoice.status === 'sent' && 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-500',
            invoice.status === 'paid' && 'bg-green-400/20 text-green-700 dark:bg-green-500/20 dark:text-green-500',
            invoice.status === 'overdue' && 'bg-red-400/20 text-red-700 dark:bg-red-500/20 dark:text-red-500'
          )}
        >
          {invoice.status === 'sent' ? (
            <FileUp size={20} />
          ) : invoice.status === 'paid' ? (
            <FileCheck size={20} />
          ) : (
            <FileClock size={20} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p>{invoice.label}</p>
          <p className="text-muted-foreground text-xs">
            {locales.invoice_status.format(
              invoice.status === 'sent'
                ? locales.invoice_status_sent
                : invoice.status === 'paid'
                  ? locales.invoice_status_paid
                  : locales.invoice_status_overdue
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            modal.open({ title: locales.invoice_details, children: <SentInvoiceDetailsModal invoice={invoice} /> })
          }
        >
          {locales.details}
        </Button>
      </div>
    </div>
  );
};

export default SentInvoiceItem;
