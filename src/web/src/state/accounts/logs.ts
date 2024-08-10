import { type RawLogItem, type LogItem, LogsFilters } from '~/src/common/typings';
import { fetchNui } from '../../utils/fetchNui';
import { delay } from '../../utils/misc';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { useActiveAccount } from './accounts';
import React from 'react';

const DEBUG_TRANSACTIONS: { numberOfPages: number; logs: RawLogItem[] } = {
  numberOfPages: 3,
  logs: [
    {
      id: 0,
      name: `Svetozar Miletic`,
      message: `Super very very long message haha xd`,
      amount: 3500,
      fromBalance: 174200,
      toId: 1,
      date: `2024-08-07 15:11`,
    },
    {
      id: 1,
      name: `Svetozar Miletic`,
      message: `Super very very long message haha xd`,
      amount: 3500,
      toBalance: 174200,
      toId: 2,
      date: `2024-08-07 15:11`,
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

      console.log(JSON.stringify(filters, null, 2));
      const data = await fetchNui<{ numberOfPages: number; logs: RawLogItem[] }>(
        'getLogs',
        { accountId, filters },
        { data: DEBUG_TRANSACTIONS }
      );

      return {
        numberOfPages: data.numberOfPages,
        logs: data.logs.map((log) => {
          const newBalance = log.fromBalance ?? (log.toBalance as number);

          return {
            id: log.id,
            toId: log.toId,
            name: log.name,
            message: log.message,
            amount: log.amount,
            newBalance: newBalance,
            date: log.date,
            type: log.toId === accountId ? 'inbound' : 'outbound',
          } as LogItem;
        }),
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
