import { Grid } from '@mantine/core';
import AccountList from './components/AccountList';
import AccountPapers from './components/AccountPapers';

export interface Account {
  id: string;
  label: string;
  type: 'personal' | 'group' | 'shared';
  balance: number;
  hasAccess?: boolean;
}

const Accounts: React.FC = () => {
  return (
    <Grid sx={{ height: '100%' }} columns={3}>
      <AccountList />
      <AccountPapers />
    </Grid>
  );
};

export default Accounts;
