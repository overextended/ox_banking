import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { TbSearch } from 'react-icons/tb';
import { useSetRecoilState } from 'recoil';
import { accountSearchAtom } from '../../../../../atoms/account';
import { useEffect, useState } from 'react';

const AccountSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const setAccountsSearch = useSetRecoilState(accountSearchAtom);
  const [debouncedSearch] = useDebouncedValue(search, 500);

  useEffect(() => {
    setAccountsSearch(debouncedSearch);
  }, [debouncedSearch, setAccountsSearch]);

  return (
    <TextInput
      placeholder="Search"
      icon={<TbSearch size={20} />}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default AccountSearch;
