import React from 'react';
import { formatNumber } from '@/utils/formatNumber';

const SentInvoiceDetailsModal: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-xs">Sent to</p>
        <p className="text-sm">SomeCompany LLC</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Sent by</p>
        <p className="text-sm">Some Name</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Sent at</p>
        <p className="text-sm">20/03/2025 13:40</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Due date</p>
        <p className="text-sm">20/03/2025 13:40</p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Message</p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam blanditiis consequatur cum cupiditate ea
          error expedita facere ipsa ipsam laudantium magni maxime modi molestias odio odit pariatur perspiciatis
          quisquam, rem.
        </p>
      </div>
      <div>
        <p className="text-muted-foreground text-xs">Total</p>
        <p className="text-sm">{formatNumber(15700)}</p>
      </div>
    </div>
  );
};

export default SentInvoiceDetailsModal;
