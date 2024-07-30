import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import locales from '@/locales';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import SpinningLoader from '@/components/SpinningLoader';
import { fetchNui } from '@/utils/fetchNui';
import { useModal } from '@/components/ModalsProvider';
import { useSetActiveAccount } from '@/state/accounts';
import { queryClient } from '@/main';
import { Account } from '~/typings';
import { updateAccountProperty } from '@/state/accounts';

const TransferAccountModal: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const setActiveAccount = useSetActiveAccount();
  const modal = useModal();

  const formSchema = React.useMemo(
    () =>
      z.object({
        stateId: z.string().min(1, locales.field_required.format(locales.state_id)),
      }),
    []
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stateId: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const resp = await fetchNui<true | 'state_id_not_exists'>(
      'transferOwnership',
      {
        accountId,
        targetStateId: values.stateId,
      },
      { data: true, delay: 1500 }
    );

    console.log(resp);

    if (typeof resp === 'string') {
      setIsLoading(false);
      form.setError('stateId', { type: 'value', message: locales[resp] });

      return;
    }

    // todo: probably fetch the updated account instead of updating it as the name would need to be updated as well
    updateAccountProperty(accountId, 'role', 'manager');
    setActiveAccount(null);

    setIsLoading(false);
    modal.close();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer to</FormLabel>
              <FormControl>
                <Input {...field} placeholder={locales.state_id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="stateId"
        />
        <p className="text-destructive text-sm">This action is irreversible.</p>
        <Button type="submit" className="w-full" variant="destructive" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.confirm}
        </Button>
      </form>
    </Form>
  );
};

export default TransferAccountModal;
