import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import locales from '@/locales';
import { queryClient } from '@/main';
import permissions from '@/permissions';
import { AccountRole } from '@/typings';
import { fetchNui } from '@/utils/fetchNui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import RolePermissions from '../components/RolePermissions';

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

  const role = form.watch('role') as AccountRole;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const resp = await fetchNui<{ success: boolean; message?: string }>(
      'addUserToAccount',
      { accountId, ...values },
      {
        data: { success: true },
        delay: 1500,
      }
    );

    if (!resp.success) {
      setIsLoading(false);
      form.setError('stateId', { type: 'value', message: locales[resp.message as keyof typeof locales] });

      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['account-access'] });

    setIsLoading(false);
    modal.close();
  }

  const roles = React.useMemo(
    () => Object.keys(permissions).filter((role): role is keyof typeof locales => role !== 'owner'),
    [permissions]
  );

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
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {locales[role as keyof typeof locales]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription className="flex flex-col gap-2">
                <RolePermissions role={role} />
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
