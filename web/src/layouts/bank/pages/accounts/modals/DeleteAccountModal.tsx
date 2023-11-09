import React from 'react';
import { Account } from '../../../../../../../typings';
import { Button } from '@/components/ui/button';
import locales from '@/locales';
import { useModal } from '@/components/ModalsProvider';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import { queryClient } from '@/main';
import { useSetActiveAccount } from '@/state/accounts';

interface Props {
  account: Account;
}

const DeleteAccountModal: React.FC<Props> = ({ account }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const setActiveAccount = useSetActiveAccount();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{locales.delete_account_message.format(account.label)}</p>
      <p className="text-sm text-destructive">{locales.delete_account_warning}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => modal.close()}>
          {locales.cancel}
        </Button>
        <Button
          variant="destructive"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await fetchNui('deleteAccount', account.accountId, { data: true, delay: 1500 });
            await queryClient.invalidateQueries({ queryKey: ['accounts'] });
            setActiveAccount(null);
            setIsLoading(false);
            modal.close();
          }}
        >
          {isLoading ? <SpinningLoader /> : locales.delete_account}
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
