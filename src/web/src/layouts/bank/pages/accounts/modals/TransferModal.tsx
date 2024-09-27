import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import locales from '@/locales';
import { queryClient } from '@/main';
import { useAccounts } from '@/state/accounts';
import { Account } from '@/typings';
import { fetchNui } from '@/utils/fetchNui';
import { formatNumber } from '@/utils/formatNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const TransferModal: React.FC<{ account: Account }> = ({ account }) => {
  const { accounts } = useAccounts();

  const formSchema = React.useMemo(
    () =>
      z.object({
        transferType: z.string(),
        target: z.string().min(1, locales.field_required.format(locales.target)),
        amount: z.string().min(1, locales.field_required.format(locales.amount)),
      }),
    []
  );
  const [internalTransfer, setInternalTransfer] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transferType: 'person',
      target: '',
      amount: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const schema = z.number().min(0);

    if (values.transferType === 'account' && !schema.safeParse(+values.target).success)
      return form.setError('target', {
        type: 'value',
        message: locales.invalid_account_number,
      });

    if (!schema.safeParse(+values.amount).success)
      return form.setError('amount', {
        type: 'value',
        message: locales.amount_greater_than_zero,
      });

    const amount = +values.amount;

    if (amount > account.balance)
      return form.setError('amount', {
        type: 'value',
        message: locales.amount_greater_than_balance,
      });

    setIsLoading(true);
    const resp = await fetchNui<{ success: boolean; message?: string }>(
      'transferMoney',
      {
        fromAccountId: account.id,
        target: values.target,
        transferType: values.transferType,
        amount: values.amount,
      },
      {
        data: { success: false, message: 'account_id_not_exists' },
        delay: 1500,
      }
    );

    if (!resp.success) {
      setIsLoading(false);

      switch (resp.message) {
        case 'account_id_not_exists':
        case 'state_id_not_exists':
          form.setError('target', { type: 'value', message: locales[resp.message as keyof typeof locales] });
          break;
        default:
          // todo: notification?
          break;
      }

      return;
    }

    // if the user has access to the account, refresh them
    if (accounts.find((acc) => acc.id === +values.target)) {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    }

    setIsLoading(false);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="transferType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.transfer_to}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="person">{locales.person}</SelectItem>
                  <SelectItem value="account">{locales.account}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues('transferType') === 'account' && (
          <div className="flex items-center gap-2">
            <Switch
              id="internal-transfer"
              checked={internalTransfer}
              onCheckedChange={() => setInternalTransfer((prev) => !prev)}
            />
            <label htmlFor="internal-transfer">{locales.internal_transfer}</label>
          </div>
        )}
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {form.getValues('transferType') === 'person'
                  ? locales.state_id
                  : internalTransfer
                    ? locales.account
                    : locales.account_number}
              </FormLabel>
              <FormControl>
                {form.getValues('transferType') === 'account' && internalTransfer ? (
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[150px]">
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="target"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.amount}</FormLabel>
              <FormDescription>{locales.available_balance.format(formatNumber(account.balance))}</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button type="submit" className="self-end" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.transfer}
        </Button>
      </form>
    </Form>
  );
};

export default TransferModal;
