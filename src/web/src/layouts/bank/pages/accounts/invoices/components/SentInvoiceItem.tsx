import React from 'react';
import { FileCheck, FileClock, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import SentInvoiceDetailsModal from '../modals/SentInvoiceDetailsModal';
import { cn } from '@/lib/utils';

interface Props {
  status: 'sent' | 'paid' | 'overdue';
}

const SentInvoiceItem: React.FC<Props> = ({ status }) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'h-9 w-9 rounded-lg p-2',
            status === 'sent' && 'bg-yellow-400/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-500',
            status === 'paid' && 'bg-green-400/20 text-green-700 dark:bg-green-500/20 dark:text-green-500',
            status === 'overdue' && 'bg-red-400/20 text-red-700 dark:bg-red-500/20 dark:text-red-500'
          )}
        >
          {status === 'sent' ? (
            <FileUp size={20} />
          ) : status === 'paid' ? (
            <FileCheck size={20} />
          ) : (
            <FileClock size={20} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p>SomeCompany LLC</p>
          <p className="text-muted-foreground text-xs">
            Status: {status === 'sent' ? 'SENT' : status === 'paid' ? 'PAID' : 'OVERDUE'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => modal.open({ title: 'Invoice details', children: <SentInvoiceDetailsModal /> })}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default SentInvoiceItem;
