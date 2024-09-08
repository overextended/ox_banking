import locales from '@/locales';
import React from 'react';
import { LogItem } from '~/src/common/typings';
import { formatNumber } from '@/utils/formatNumber';
import { formatDate } from '@/utils/formatDate';

const LogDetailsModal: React.FC<{ log: LogItem; accountId: number }> = ({ log, accountId }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Transaction is a transfer */}
      {log.fromId && log.toId ? (
        <>
          {log.toId === accountId && (
            <div>
              <p className="text-muted-foreground text-xs">{locales.transfer_from}</p>
              <p className="text-sm">{log.fromAccountLabel}</p>
            </div>
          )}

          {log.fromId === accountId && (
            <>
              <div>
                <p className="text-muted-foreground text-xs">{locales.name}</p>
                <p className="text-sm">{log.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">{locales.transfer_to}</p>
                <p className="text-sm">{log.toAccountLabel}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <p className="text-muted-foreground text-xs">{locales.name}</p>
          <p className="text-sm">{log.name}</p>
        </div>
      )}
      <div>
        <p className="text-muted-foreground text-xs">{locales.amount}</p>
        <p className="text-sm">{formatNumber(log.amount)}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.new_balance}</p>
        <p className="text-sm">{formatNumber(log.newBalance)}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.date}</p>
        <p className="text-sm">{formatDate(log.date)}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{locales.message}</p>
        <p className="text-sm">{log.message}</p>
      </div>
    </div>
  );
};

export default LogDetailsModal;
