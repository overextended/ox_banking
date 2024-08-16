import React from 'react';
import LogsTableItem from './LogsTableItem';
import { LogItem } from '~/src/common/typings';

const LogsTableBody: React.FC<{ logs: LogItem[] }> = ({ logs }) => {
  return (
    <>
      {logs.map((transaction) => (
        <LogsTableItem key={transaction.id} {...transaction} />
      ))}
    </>
  );
};

export default LogsTableBody;
