import React from 'react';
import BaseCard from '../../bank/components/BaseCard';
import { Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SpinningLoader from '@/components/SpinningLoader';
import locales from '@/locales';
import { z } from 'zod';
import { Account } from '@/typings';
import { FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  isWithdrawing: boolean;
  handleWithdraw: (amount: number) => void;
  account: Account;
}

const formSchema = z.object({
  amount: z.number({ coerce: true, message: locales.amount_required_number }).min(1),
});

const CustomWithdrawAmount: React.FC<Props> = ({ isWithdrawing, handleWithdraw, account }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { amount } = values;

    if (amount > (account?.balance ?? 0)) {
      form.setError('amount', { message: locales.amount_greater_than_balance });
      return;
    }

    handleWithdraw(amount);
  }

  return (
    <BaseCard title={locales.custom_amount} icon={Settings2}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isWithdrawing} className="self-end" type="submit">
            {!isWithdrawing ? locales.withdraw : <SpinningLoader />}
          </Button>
        </form>
      </Form>
    </BaseCard>
  );
};

export default CustomWithdrawAmount;
