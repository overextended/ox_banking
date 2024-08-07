import { type RawLogItem, type LogItem } from '~/src/common/typings';
import { queryClient } from '../../main';
import { fetchNui } from '../../utils/fetchNui';
import { useSuspenseQuery } from '@tanstack/react-query';

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

export const useLogs = (accountId: number) =>
  useSuspenseQuery<{ numberOfPages: number; logs: LogItem[] }>(
    {
      queryKey: ['logs', accountId],
      queryFn: async () => {
        const data = await fetchNui<{ numberOfPages: number; logs: RawLogItem[] }>(
          'getLogs',
          { accountId },
          { data: DEBUG_TRANSACTIONS, delay: 3000 }
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
      },
    },
    queryClient
  );
