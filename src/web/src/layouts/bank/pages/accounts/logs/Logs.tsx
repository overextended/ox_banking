import BaseCard from '@/layouts/bank/components/BaseCard';
import locales from '@/locales';
import { useActiveAccount } from '@/state/accounts';
import { History } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogsFilters from './components/LogsFilters';
import LogsSearch from './components/LogsSearch';
import LogsTable from './components/LogsTable';

const Logs: React.FC = () => {
  const account = useActiveAccount();
  const navigate = useNavigate();

  if (!account) {
    navigate('/accounts/');
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <BaseCard title={locales.logs} icon={History} className="h-full gap-4">
        <LogsSearch />
        <LogsFilters />
        <LogsTable accountId={account.id} />
      </BaseCard>
    </div>
  );
};

export default Logs;
