import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import locales from '@/locales';
import { queryClient } from '@/main';
import { fetchNui } from '@/utils/fetchNui';
import React from 'react';

interface Props {
  targetStateId: string;
  accountId: number;
}

const RemoveUserModal: React.FC<Props> = ({ targetStateId, accountId }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleRemove() {
    setIsLoading(true);

    await fetchNui('removeUser', { accountId, targetStateId }, { data: true, delay: 1500 });

    await queryClient.invalidateQueries({ queryKey: ['account-access'] });

    setIsLoading(false);
    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{locales.remove_user_warning.format(targetStateId)}</p>
      <Button variant="destructive" className="self-end" onClick={handleRemove} disabled={isLoading}>
        {isLoading ? <SpinningLoader /> : locales.remove_account_access}
      </Button>
    </div>
  );
};

export default RemoveUserModal;
