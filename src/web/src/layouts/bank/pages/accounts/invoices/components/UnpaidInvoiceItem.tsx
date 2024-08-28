import React from 'react';
import { File, FileText, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import UnpaidInvoiceDetailsModal from '../modals/UnpaidInvoiceDetailsModal';
import PayInvoiceModal from '../modals/PayInvoiceModal';
import { UnpaidInvoice } from '~/src/common/typings';

const UnpaidInvoiceItem: React.FC<{ invoice: UnpaidInvoice }> = ({ invoice }) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="bg-secondary text-secondary-foreground h-9 w-9 rounded-lg p-2">
          <FileText size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <p>{invoice.label}</p>
          <p className="text-muted-foreground text-xs">Due by: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            modal.open({ title: 'Invoice details', children: <UnpaidInvoiceDetailsModal invoice={invoice} /> })
          }
        >
          Details
        </Button>
        <Button
          onClick={() =>
            modal.open({
              title: 'Pay invoice',
              description: 'Confirm your payment',
              children: <PayInvoiceModal invoice={invoice} />,
              size: 'lg',
            })
          }
        >
          Pay invoice
        </Button>
      </div>
    </div>
  );
};

export default React.memo(UnpaidInvoiceItem);
