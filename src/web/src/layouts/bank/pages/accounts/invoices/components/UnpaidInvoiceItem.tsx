import React from 'react';
import { File, FileText, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import UnpaidInvoiceDetailsModal from '../modals/UnpaidInvoiceDetailsModal';
import PayInvoiceModal from '../modals/PayInvoiceModal';
import { UnpaidInvoice } from '~/src/common/typings';
import locales from '@/locales';
import { useActiveAccount } from '@/state/accounts';
import { formatDate } from '@/utils/formatDate';

const UnpaidInvoiceItem: React.FC<{ invoice: UnpaidInvoice }> = ({ invoice }) => {
  const account = useActiveAccount()!;
  const modal = useModal();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="bg-secondary text-secondary-foreground h-9 w-9 rounded-lg p-2">
          <FileText size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <p>{invoice.label}</p>
          <p className="text-muted-foreground text-xs">{locales.invoice_due_by.format(formatDate(invoice.dueDate))}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() =>
            modal.open({ title: locales.invoice_details, children: <UnpaidInvoiceDetailsModal invoice={invoice} /> })
          }
        >
          {locales.details}
        </Button>
        <Button
          disabled={invoice.amount > account.balance}
          onClick={() =>
            modal.open({
              title: locales.pay_invoice,
              description: locales.invoice_confirm_payment,
              children: <PayInvoiceModal invoice={invoice} />,
              size: 'lg',
            })
          }
        >
          {locales.pay_invoice}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(UnpaidInvoiceItem);
