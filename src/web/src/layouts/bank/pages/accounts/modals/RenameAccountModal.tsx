import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import locales from '@/locales';
import { updateAccountProperty } from '@/state/accounts';
import { fetchNui } from '@/utils/fetchNui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  initialName: string;
  accountId: number;
}

const RenameAccountModal: React.FC<Props> = ({ initialName, accountId }) => {
  const modal = useModal();
  const formSchema = React.useMemo(
    () =>
      z.object({
        name: z.string().min(1, `${locales.field_required}`).trim(),
      }),
    []
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const resp = await fetchNui('renameAccount', { accountId, name: values.name }, { data: true });

    if (!resp) {
      modal.close();

      return;
    }

    updateAccountProperty(accountId, 'label', values.name);
    modal.close();

    return true;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.new_account_name}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="name"
        />
        <Button type="submit" className="self-end" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <SpinningLoader /> : locales.confirm}
        </Button>
      </form>
    </Form>
  );
};

export default RenameAccountModal;
