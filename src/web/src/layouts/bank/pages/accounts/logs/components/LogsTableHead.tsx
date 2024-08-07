import React from 'react';

const LogsTableHead: React.FC = () => {
  return (
    <div className="text-muted-foreground mb-2 grid grid-cols-[36px,repeat(5,1fr)] gap-2 border-b py-2 text-center text-sm">
      <p></p>
      <p>Name</p>
      <p>Message</p>
      <p>Amount</p>
      <p>New balance</p>
      <p>Timestamp</p>
    </div>
  );
};

export default LogsTableHead;
