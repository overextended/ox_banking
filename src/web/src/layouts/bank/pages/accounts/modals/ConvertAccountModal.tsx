import { Button } from '@/components/ui/button';
import React from 'react';
import { fetchNui } from '@/utils/fetchNui';
import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { updateAccountProperty } from '@/state/accounts';
import locales from '@/locales';

interface Props {
  accountId: number;
}

const ConvertAccountModal: React.FC<Props> = ({ accountId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  async function handleConvertClick() {
    setIsLoading(true);

    const resp = await fetchNui('convertAccountToShared', { accountId }, { data: true });

    if (!resp) {
      modal.close();

      return;
    }

    updateAccountProperty(accountId, 'type', 'shared');
    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">{locales.convert_account_warning}</p>
      <p className="text-destructive text-sm">{locales.action_irreversible}</p>
      <Button disabled={isLoading} className="self-end" variant="destructive" onClick={handleConvertClick}>
        {isLoading ? <SpinningLoader /> : 'Convert'}
      </Button>
    </div>
  );
};

export default ConvertAccountModal;
