import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchNui } from '@/utils/fetchNui';
import { useModal } from '@/components/ModalsProvider';
import SpinningLoader from '@/components/SpinningLoader';
import locales from '@/locales';
import { queryClient } from '@/main';


interface Props {
  targetStateId: string;
  defaultRole: string;
  accountId: number;
}

const formSchema = z.object({
  role: z.string(),
});

const ManageUserModal: React.FC<Props> = ({ targetStateId, defaultRole, accountId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: defaultRole,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const resp = await fetchNui('manageUser', { accountId, targetStateId, values }, { data: true, delay: 1500 });

    await queryClient.invalidateQueries({ queryKey: ['account-access'] });

    setIsLoading(false);
    modal.close();
  }

  return (
    <div className='flex flex-col gap-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='contributor'>Contributor</SelectItem>
                      <SelectItem value='manager'>Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  <p>Contributor - Only deposit allowed</p>
                  <p>Manager - Deposit, withdraw, transfer and logs allowed</p>
                </FormDescription>
              </FormItem>
            )}
            name='role'
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? <SpinningLoader /> : locales.confirm}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ManageUserModal;
