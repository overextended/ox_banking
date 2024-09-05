import { type RawLogItem, type LogItem, LogsFilters } from '~/src/common/typings';
import { fetchNui } from '../../utils/fetchNui';
import { delay } from '../../utils/misc';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useActiveAccount } from './accounts';
import React from 'react';

const DEBUG_TRANSACTIONS: { numberOfPages: number; logs: LogItem[] } = {
  numberOfPages: 3,
  logs: [
    {
      id: 0,
      name: `Svetozar Miletic`,
      message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus assumenda culpa, deleniti enim excepturi fugit harum, impedit incidunt, inventore ipsum maiores nesciunt nihil provident qui voluptatibus? Accusantium, alias animi aspernatur consequuntur cum delectus dolorem doloribus explicabo labore libero magni molestiae molestias nam nobis quibusdam quis ratione reiciendis sed temporibus veniam.</p>`,
      amount: 3500,
      toId: 1,
      date: `2024-08-07 15:11`,
      type: 'inbound',
      fromId: 2,
      newBalance: 15000,
    },
    {
      id: 1,
      name: `Svetozar Miletic`,
      message: `Withdraw`,
      amount: 3500,
      toId: 2,
      date: `2024-08-07 15:11`,
      fromId: 1,
      type: 'outbound',
      newBalance: 2500,
    },
  ],
};

export const useLogs = () => {
  const [data, setData] = React.useState<{ numberOfPages: number; logs: LogItem[] }>({ numberOfPages: 0, logs: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const filters = useDebouncedLogsFilters();
  const { id: accountId } = useActiveAccount()!;

  React.useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);

      await delay(500);

      const data = await fetchNui<{ numberOfPages: number; logs: LogItem[] }>(
        'getLogs',
        { accountId, filters },
        { data: DEBUG_TRANSACTIONS }
      );

      return {
        numberOfPages: data.numberOfPages,
        logs: data.logs,
      };
    };

    fetchLogs().then((resp) => {
      setData(resp);
      setIsLoading(false);
    });
  }, [accountId, filters, setData, setIsLoading]);

  return { data, isLoading };
};

const logsFiltersDebounceAtom = atomWithDebounce<LogsFilters>(
  {
    search: '',
    page: 0,
  },
  500
);

export const useLogsFilters = () => useAtomValue(logsFiltersDebounceAtom.currentValueAtom);
export const useIsLogsFiltersDebouncing = () => useAtomValue(logsFiltersDebounceAtom.isDebouncingAtom);
export const useSetLogsFiltersDebounce = () => useSetAtom(logsFiltersDebounceAtom.debouncedValueAtom);
export const useDebouncedLogsFilters = () => useAtomValue(logsFiltersDebounceAtom.debouncedValueAtom);
