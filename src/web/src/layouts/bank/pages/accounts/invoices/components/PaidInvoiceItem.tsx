import React from 'react';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import PaidInvoiceDetailsModal from '../modals/PaidInvoiceDetailsModal';
import { PaidInvoice } from '~/src/common/typings';
import locales from '@/locales';
import { formatDate } from '@/utils/formatDate';

const PaidInvoiceItem: React.FC<{ invoice: PaidInvoice }> = ({ invoice }) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-lg bg-green-400/20 p-2 text-green-700 dark:bg-green-500/20 dark:text-green-500">
          <FileCheck size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <p>{invoice.label}</p>
          <p className="text-muted-foreground text-xs">{locales.invoice_paid_at.format(formatDate(invoice.paidAt))}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            modal.open({ title: locales.invoice_details, children: <PaidInvoiceDetailsModal invoice={invoice} /> })
          }
        >
          {locales.details}
        </Button>
      </div>
    </div>
  );
};

export default PaidInvoiceItem;
