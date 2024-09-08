import React from 'react';
import { formatNumber } from '@/utils/formatNumber';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useModal } from '@/components/ModalsProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import locales from '@/locales';
import LogDetailsModal from './LogDetailsModal';
import { LogItem } from '~/src/common/typings';
import { formatDate } from '@/utils/formatDate';

const LogsTableItem: React.FC<{ log: LogItem; accountId: number }> = ({ log, accountId }) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'bg-secondary text-secondary-foreground h-9 w-9 rounded-lg p-2',
            log.type === 'inbound' && 'bg-green-400/20 text-green-700 dark:bg-green-500/20 dark:text-green-500',
            log.type === 'outbound' && 'bg-red-400/20 text-red-700 dark:bg-red-500/20 dark:text-red-500'
          )}
        >
          {log.type === 'inbound' && <ArrowUpRight size={20} />}
          {log.type === 'outbound' && <ArrowDownRight size={20} />}
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">{log.message}</p>
          <p className="text-muted-foreground text-xs">
            {formatNumber(log.amount)} - {formatDate(log.date)}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() =>
          modal.open({
            title: locales.transaction_details,
            children: <LogDetailsModal accountId={accountId} log={log} />,
          })
        }
      >
        {locales.details}
      </Button>
    </div>
  );
};

export default LogsTableItem;
