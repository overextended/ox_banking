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
import { Account } from '@/typings/accounts';
import locales from '@/locales';

const DepositWithdrawModal: React.FC<{ account: Account; isDeposit?: boolean }> = ({ account, isDeposit }) => {
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

  const originalBalance: number = isDeposit ? 0 : account.balance;
  const [balanceLeft, setBalanceLeft] = React.useState<number>(originalBalance);
  const [balanceInput, setBalanceInput] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const handleEnterValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalanceInput(Number(event.target.value.replace(/[^0-9]/g, '')));
  };

  React.useEffect(() => {
    const recalculateBalanceLeft = () => {
      setBalanceLeft(originalBalance - balanceInput);
    }

    const debounceTimeout = setTimeout(recalculateBalanceLeft, 100);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [balanceInput, setBalanceInput]);

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

    setIsLoading(true);
    await fetchNui(
      !isDeposit ? 'withdrawMoney' : 'depositMoney',
      { accountId: account.id, amount: values.amount },
      {
        data: true,
        delay: 1500,
      }
    );
    setIsLoading(false);
    console.log(values);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.amount}</FormLabel>
              <FormDescription>
                {!isDeposit
                  ? locales.available_balance.format(formatNumber(balanceLeft))
                  : locales.available_cash.format(formatNumber(balanceLeft))}
              </FormDescription>
              <FormControl onChange={handleEnterValue}>
              <Input className={`${balanceLeft < 0 && 'focus-visible:border-destructive'}`} {...field} />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button type="submit" disabled={isDeposit ? balanceLeft <= 0 : balanceLeft < 0 || isLoading} className="w-full">
          {isLoading ? <SpinningLoader /> : locales.confirm}
        </Button>
      </form>
    </Form>
  );
};

export default DepositWithdrawModal;
