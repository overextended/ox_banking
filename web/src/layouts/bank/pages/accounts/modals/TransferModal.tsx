import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { formatNumber } from '@/utils/formatNumber';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SpinningLoader from '@/components/SpinningLoader';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchNui } from '@/utils/fetchNui';
import { useModal } from '@/components/ModalsProvider';
import locales from '@/locales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Account } from '@/typings';

const TransferModal: React.FC<{ account: Account }> = ({ account }) => {
  const formSchema = React.useMemo(
    () =>
      z.object({
        transferType: z.string(),
        target: z.string().min(1, locales.field_required.format(locales.target)),
        amount: z.string().min(1, locales.field_required.format(locales.amount)),
      }),
    []
  );
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

    setIsLoading(true);
    const resp = await fetchNui<
      | true
      | {
          field: 'transferType' | 'target' | 'amount';
          error: string;
        }
    >(
      'transferMoney',
      {
        fromAccountId: account.accountId,
        target: values.target,
        transferType: values.transferType,
        amount: values.amount,
      },
      {
        data: true,
        delay: 1500,
      }
    );

    if (typeof resp === 'object' && resp.error) {
      setIsLoading(false);
      return form.setError(resp.field, {
        type: 'value',
        message: resp.error,
      });
    }

    setIsLoading(false);
    console.log(values);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{form.getValues('transferType') === 'person' ? 'State ID' : 'Account number'}</FormLabel>
              <FormDescription></FormDescription>
              <FormControl>
                <Input {...field} />
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
              <FormDescription></FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.confirm}
        </Button>
      </form>
    </Form>
  );
};

export default TransferModal;
