import React from 'react';
import { ChevronLeft, ChevronRight, CreditCard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateAccountModal from '@/layouts/bank/pages/accounts/modals/CreateAccountModal';
import AccountCard from '@/layouts/bank/pages/accounts/components/AccountCard';
import BaseCard from '@/layouts/bank/components/BaseCard';
import { useModal } from '@/components/ModalsProvider';
import { useAccounts, useActiveAccountId } from '@/state/accounts';
import { cn } from '@/lib/utils';
import locales from '@/locales';
import { useSetActiveAccountId } from '@/state/accounts';

const CharacterAccounts: React.FC = () => {
  const modal = useModal();
  const accountsData = useAccounts();
  const activeAccountId = useActiveAccountId();
  const setActiveAccountId = useSetActiveAccountId();
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    if (activeAccountId) return;

    const defaultAccount = accountsData.accounts.find((account) => account.isDefault);

    if (defaultAccount) setActiveAccountId(defaultAccount.id);
  }, [accountsData, activeAccountId]);

  return (
    <BaseCard title={locales.accounts} icon={CreditCard} className="overflow-visible">
      <div className="flex w-full items-center justify-center gap-4">
        <Button size="icon" className="rounded-full" disabled={page === 0} onClick={() => setPage((prev) => --prev)}>
          <ChevronLeft />
        </Button>
        <div className="flex flex-1 justify-start gap-4">
          {page === 0 && (
            <div
              onClick={() =>
                modal.open({
                  title: locales.create_account,
                  children: <CreateAccountModal />,
                })
              }
              className="bg-background hover:bg-secondary flex w-[250px] flex-col items-center justify-center rounded-lg border border-dashed p-4 shadow transition-all hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
            >
              <Plus />
            </div>
          )}
          {accountsData.accounts
            .slice(page === 0 ? 0 : page * 4 - 1, page === 0 ? 3 : page * 4 + 4 - 1)
            .map((account) => (
              <AccountCard
                key={`${account.id}-${account.balance}`}
                account={account}
                active={account.id === activeAccountId}
              />
            ))}
        </div>
        <Button
          size="icon"
          className="rounded-full"
          disabled={page + 1 >= accountsData.numberOfPages}
          onClick={() => setPage((prev) => ++prev)}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        {[...Array(accountsData.numberOfPages)].map((_, index) => (
          <div
            key={index}
            className={cn(
              'bg-muted h-[5px] w-[5px] rounded-full transition-colors duration-500',
              page === index && 'bg-primary'
            )}
          />
        ))}
      </div>
    </BaseCard>
  );
};

export default CharacterAccounts;
