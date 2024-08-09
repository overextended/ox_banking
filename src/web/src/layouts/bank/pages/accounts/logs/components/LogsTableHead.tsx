import React from 'react';
import locales from '@/locales';

const LogsTableHead: React.FC = () => {
  return (
    <div className="text-muted-foreground mb-2 grid grid-cols-[36px,repeat(5,1fr)] gap-2 border-b py-2 text-center text-sm">
      <p></p>
      <p>{locales.name}</p>
      <p>{locales.message}</p>
      <p>{locales.amount}</p>
      <p>{locales.new_balance}</p>
      <p>{locales.date}</p>
    </div>
  );
};

export default LogsTableHead;
