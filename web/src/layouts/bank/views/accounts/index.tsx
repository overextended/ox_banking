import { Stack, Grid } from '@mantine/core';
import { useState } from 'react';
import AccountList from './components/AccountList';
import SelectedAccount from './components/SelectedAccount';
import AccountActions from './components/AccountActions';
import AccountSettings from './components/AccountSettings';
import AccountPermissions from './components/AccountPermissions';

export interface Account {
  id: string;
  label: string;
  type: 'personal' | 'group' | 'shared';
  balance: number;
  hasAccess?: boolean;
}

const mockAccounts: Account[] = [
  { id: '9261979951215', label: 'Personal', balance: 132320, hasAccess: true, type: 'personal' },
  { id: '7599131499775', label: 'Paycheck', balance: 0, hasAccess: true, type: 'personal' },
  { id: '6594979941133', label: 'LSPD', balance: 112000, hasAccess: true, type: 'group' },
  { id: '6594979941133', label: 'SomeCompany LLC', balance: 94560, hasAccess: true, type: 'shared' },
];

const Accounts: React.FC = () => {
  const [account, setAccount] = useState<number | null>(null);

  return (
    <Grid sx={{ height: '100%' }} columns={3}>
      <AccountList mockAccounts={mockAccounts} setAccount={setAccount} />
      <Grid.Col span={2} sx={{ height: '100%' }}>
        {account !== null && (
          <Stack>
            <SelectedAccount account={account} mockAccounts={mockAccounts} />
            <AccountActions />
            <AccountSettings account={account} mockAccounts={mockAccounts} />
            <AccountPermissions mockAccounts={mockAccounts} account={account} />
          </Stack>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Accounts;
