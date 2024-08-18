import { Button } from '@/components/ui/button';
import React from 'react';

interface Props {
  tab: 'paid' | 'unpaid' | 'sent';
  setTab: (tab: 'paid' | 'unpaid' | 'sent') => void;
}

const InvoiceTypeButtons: React.FC<Props> = ({ tab, setTab }) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <Button
        onClick={() => setTab('unpaid')}
        className="h-[34px] rounded-br-none rounded-tr-none"
        variant={tab === 'unpaid' ? 'default' : 'ghost'}
      >
        Unpaid invoices
      </Button>
      <Button
        onClick={() => setTab('paid')}
        className="h-[34px] rounded-none"
        variant={tab === 'paid' ? 'default' : 'ghost'}
      >
        Paid invoices
      </Button>
      <Button
        onClick={() => setTab('sent')}
        className="h-[34px] rounded-bl-none rounded-tl-none"
        variant={tab === 'sent' ? 'default' : 'ghost'}
      >
        Sent invoices
      </Button>
    </div>
  );
};

export default InvoiceTypeButtons;
