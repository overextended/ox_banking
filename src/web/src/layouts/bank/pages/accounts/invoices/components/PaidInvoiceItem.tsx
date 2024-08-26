import React from 'react';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import PaidInvoiceDetailsModal from '../modals/PaidInvoiceDetailsModal';

const PaidInvoiceItem: React.FC = () => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-lg bg-green-400/20 p-2 text-green-700 dark:bg-green-500/20 dark:text-green-500">
          <FileCheck size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <p>SomeCompany LLC</p>
          <p className="text-muted-foreground text-xs">Paid at: 12/03/2025</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => modal.open({ title: 'Invoice details', children: <PaidInvoiceDetailsModal /> })}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default PaidInvoiceItem;
