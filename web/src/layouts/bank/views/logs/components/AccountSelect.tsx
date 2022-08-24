import { Paper, Select, Stack, Text } from '@mantine/core';
import { TbCreditCard } from 'react-icons/tb';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logsAccountsAtom, selectedLogsAccountAtom } from '../../../../../atoms/account';
import { useEffect } from 'react';

const AccountSelect: React.FC = () => {
  const accounts = useRecoilValue(logsAccountsAtom);
  const [value, setValue] = useRecoilState(selectedLogsAccountAtom);

  useEffect(() => {
    // const accountLogs = fetchNui('getAccountLogs', value)
    // setAccountLogs(accountLogs) - Promise, suspense for components?
  }, [value]);

  return (
    <Paper p="md">
      <Stack>
        <Text>Select account</Text>
        <Select
          icon={<TbCreditCard size={20} />}
          searchable
          nothingFound="No such account found."
          data={accounts}
          onChange={(e) => setValue(e)}
          value={value}
        />
      </Stack>
    </Paper>
  );
};

export default AccountSelect;
