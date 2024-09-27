import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import locales from '@/locales';
import { updateAccountProperty, useSetActiveAccountId } from '@/state/accounts';
import { fetchNui } from '@/utils/fetchNui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const TransferAccountModal: React.FC<{ accountId: number }> = ({ accountId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const setActiveAccountId = useSetActiveAccountId();
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

    const resp = await fetchNui<{ success: boolean; message?: string }>(
      'transferOwnership',
      {
        accountId,
        targetStateId: values.stateId,
      },
      {
        data: {
          success: true,
        },
        delay: 1500,
      }
    );

    if (!resp.success) {
      setIsLoading(false);

      form.setError('stateId', { type: 'value', message: locales[resp.message as keyof typeof locales] });

      return;
    }

    // todo: probably fetch the updated account instead of updating it as the name would need to be updated as well
    updateAccountProperty(accountId, 'role', 'manager');
    setActiveAccountId(null);

    setIsLoading(false);
    modal.close();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.transfer_to}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={locales.state_id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="stateId"
        />
        <p className="text-destructive text-sm">{locales.action_irreversible}</p>
        <Button type="submit" className="self-end" variant="destructive" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.transfer_ownership}
        </Button>
      </form>
    </Form>
  );
};

export default TransferAccountModal;
