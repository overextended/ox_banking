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
import { AccessTableData, AccountRole } from '~/src/common/typings';

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

    queryClient.setQueriesData({ queryKey: ['account-access'] }, (data: AccessTableData | undefined) => {
      console.log(0);
      if (!data) return;

      const selectedUserIndex = data.users.findIndex((user) => user.stateId === targetStateId);

      if (selectedUserIndex === -1) return;

      const selectedUser = data.users[selectedUserIndex];

      const updatedUser = { ...selectedUser, role: values.role as AccountRole };

      const newUsers = [...data.users];

      newUsers[selectedUserIndex] = { ...newUsers[selectedUserIndex], ...updatedUser };

      return {
        ...data,
        users: newUsers,
      };
    });

    setIsLoading(false);
    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            {isLoading ? <SpinningLoader /> : locales.confirm}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ManageUserModal;
