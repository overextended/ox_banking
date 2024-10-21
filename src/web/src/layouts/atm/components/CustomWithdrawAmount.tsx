import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import locales from '@/locales';
import { Account } from '@/typings';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BaseCard from '../../bank/components/BaseCard';

interface Props {
  isWithdrawing: boolean;
  handleWithdraw: (amount: number) => void;
  account: Account;
}

const CustomWithdrawAmount: React.FC<Props> = ({ isWithdrawing, handleWithdraw, account }) => {
  const formSchema = React.useMemo(() => z.object({
    amount: z
      .number({ coerce: true, message: locales.amount_required_number })
      .min(1, { message: locales.amount_greater_than_zero })
      .max(account?.balance ?? 0, { message: locales.amount_greater_than_balance }),
  }), [account?.balance]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { amount } = values;
    if (!amount) return;

    handleWithdraw(amount);
  }

  React.useEffect(() => {
    if (form.formState.errors.amount) {
      form.clearErrors('amount');
    }
  }, [account])
  

  return (
    <BaseCard title={locales.custom_amount} icon={Settings2}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locales.amount}</FormLabel>
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

