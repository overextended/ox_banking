import React from 'react';
import { File, FileText, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import UnpaidInvoiceDetailsModal from '../modals/UnpaidInvoiceDetailsModal';
import PayInvoiceModal from '../modals/PayInvoiceModal';

const UnpaidInvoiceItem: React.FC = () => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="bg-secondary text-secondary-foreground h-9 w-9 rounded-lg p-2">
          <FileText size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <p>SomeCompany LLC</p>
          <p className="text-muted-foreground text-xs">Due by: 12/03/2025</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => modal.open({ title: 'Invoice details', children: <UnpaidInvoiceDetailsModal /> })}
        >
          Details
        </Button>
        <Button
          onClick={() =>
            modal.open({
              title: 'Pay invoice',
              description: 'Confirm your payment',
              children: <PayInvoiceModal />,
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

export default UnpaidInvoiceItem;
