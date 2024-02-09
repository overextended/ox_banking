import React from 'react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/ModalsProvider';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import locales from '@/locales';
import { queryClient } from '@/main';

interface Props {
  targetStateId: string;
  accountId: number;
}

const RemoveUserModal: React.FC<Props> = ({ targetStateId, accountId }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);


  async function handleRemove() {
    setIsLoading(true);

    const resp = await fetchNui('removeUser', { accountId, targetStateId }, { data: true, delay: 1500 });

    await queryClient.invalidateQueries({ queryKey: ['account-access'] });

    setIsLoading(false);
    modal.close();
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm'>Are you sure you want to remove account access from the user with state
        id <b>{targetStateId}</b>?</p>
      <Button variant='destructive' onClick={handleRemove} disabled={isLoading}>
        {isLoading ? <SpinningLoader /> : 'Remove account access'}
      </Button>
    </div>
  );
};

export default RemoveUserModal;
