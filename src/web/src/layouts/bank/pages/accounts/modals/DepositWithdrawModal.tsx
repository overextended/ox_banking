import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/components/ModalsProvider';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import { formatNumber } from '@/utils/formatNumber';
import { Account } from '@/typings';
import locales from '@/locales';
import { useSetActiveAccount } from '@/state/accounts';
import { queryClient } from '@/main';
import { useCharacterState } from '@/state/character';

const DepositWithdrawModal: React.FC<{ account: Account; isDeposit?: boolean }> = ({ account, isDeposit }) => {
  const [character, setCharacter] = useCharacterState();
  const setActiveAccount = useSetActiveAccount();
  const formSchema = React.useMemo(
    () =>
      z.object({
        amount: z
          .string({
            coerce: true,
            required_error: locales.field_required.format(locales.amount),
          })
          .min(1, locales.amount_greater_than_zero),
      }),
    []
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const schema = z.number().min(0);

    if (!schema.safeParse(+values.amount).success)
      return form.setError('amount', {
        type: 'value',
        message: locales.amount_greater_than_zero,
      });

    const amount = +values.amount;

    if (isDeposit && character.cash < amount)
      return form.setError('amount', {
        type: 'value',
        message: locales.amount_greater_than_cash,
      });

    if (!isDeposit && account.balance < amount)
      return form.setError('amount', {
        type: 'value',
        message: locales.amount_greater_than_balance,
      });

    setIsLoading(true);
    await fetchNui(
      !isDeposit ? 'withdrawMoney' : 'depositMoney',
      { accountId: account.id, amount: values.amount },
      {
        data: true,
        delay: 1500,
      }
    );

    queryClient.setQueryData(['accounts'], (data: { numberOfPages: number; accounts: Account[] } | undefined) => {
      if (!data) return;

      const targetAccountIndex = data.accounts.findIndex((acc) => acc.id === account.id);

      if (targetAccountIndex === -1) return data;

      const targetAccount = data.accounts[targetAccountIndex];
      const amount = +values.amount;
      const newBalance = isDeposit ? targetAccount.balance + amount : targetAccount.balance - amount;

      const accounts = [...data.accounts];
      accounts[targetAccountIndex] = {
        ...targetAccount,
        balance: newBalance,
      };

      setActiveAccount((prev) => {
        if (!prev) return prev;
        if (prev.id !== targetAccount.id) return prev;

        return {
          ...prev,
          balance: newBalance,
        };
      });

      return {
        ...data,
        accounts,
      };
    });

    setIsLoading(false);
    console.log(values);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.amount}</FormLabel>
              <FormDescription>
                {!isDeposit
                  ? locales.available_balance.format(formatNumber(account.balance))
                  : locales.available_cash.format(formatNumber(character.cash))}
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button type="submit" className="self-end" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : isDeposit ? locales.deposit : locales.withdraw}
        </Button>
      </form>
    </Form>
  );
};

export default DepositWithdrawModal;
