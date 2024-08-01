import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import locales from '@/locales';
import { formatNumber } from '@/utils/formatNumber';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SpinningLoader from '@/components/SpinningLoader';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useModal } from '@/components/ModalsProvider';
import { fetchNui } from '@/utils/fetchNui';
import { queryClient } from '@/main';

const NewAccountUserModal: React.FC<{ accountId: number }> = ({ accountId }) => {
  const modal = useModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = React.useMemo(
    () =>
      z.object({
        stateId: z.string().min(1),
        role: z.string(),
      }),
    []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stateId: '',
      role: 'contributor',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const resp = await fetchNui<true | string>(
      'addUserToAccount',
      { accountId, ...values },
      {
        data: true,
        delay: 1500,
      }
    );

    if (typeof resp === 'string') {
      setIsLoading(false);
      form.setError('stateId', { type: 'value', message: resp });

      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['account-access'] });

    setIsLoading(false);
    modal.close();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.state_id}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="stateId"
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.role}</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">{locales.manager}</SelectItem>
                    <SelectItem value="contributor">{locales.contributor}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                <p>{locales.contributor_description}</p>
                <p>{locales.manager_description}</p>
              </FormDescription>
            </FormItem>
          )}
          name="role"
        />
        <Button type="submit" className="self-end" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.add_user}
        </Button>
      </form>
    </Form>
  );
};

export default NewAccountUserModal;
