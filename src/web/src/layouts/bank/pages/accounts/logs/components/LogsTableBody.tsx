import React from 'react';
import LogsTableItem from './LogsTableItem';
import { LogItem } from '~/src/common/typings';

const LogsTableBody: React.FC<{ logs: LogItem[]; accountId: number }> = ({ logs, accountId }) => {
  return (
    <div className="flex flex-col gap-2">
      {logs.map((transaction) => (
        <LogsTableItem key={transaction.id} accountId={accountId} log={transaction} />
      ))}
    </div>
  );
};

export default LogsTableBody;
