import React from 'react';
import { Account } from '~/src/common/typings';
import { Button } from '@/components/ui/button';
import locales from '@/locales';
import { useModal } from '@/components/ModalsProvider';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import { queryClient } from '@/main';
import { useSetActiveAccountId } from '@/state/accounts';

interface Props {
  account: Account;
}

const DeleteAccountModal: React.FC<Props> = ({ account }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const setActiveAccountId = useSetActiveAccountId();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{locales.delete_account_message.format(account.label)}</p>
      <p className="text-destructive text-sm">{locales.action_irreversible}</p>
      {account.balance > 0 && <p className="text-destructive text-sm">{locales.delete_account_required_balance}</p>}
      <Button
        variant="destructive"
        className="self-end"
        disabled={isLoading || account.balance > 0}
        onClick={async () => {
          setIsLoading(true);
          await fetchNui('deleteAccount', account.id, { data: true, delay: 1500 });
          await queryClient.invalidateQueries({ queryKey: ['accounts'] });
          setActiveAccountId(null);
          setIsLoading(false);
          modal.close();
        }}
      >
        {isLoading ? <SpinningLoader /> : locales.delete_account}
      </Button>
    </div>
  );
};

export default DeleteAccountModal;
