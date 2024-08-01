import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/components/ModalsProvider';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchNui } from '@/utils/fetchNui';
import SpinningLoader from '@/components/SpinningLoader';
import locales from '@/locales';
import { queryClient } from '@/main';

const formSchema = z.object({
  name: z.string().min(1, 'Name must have at least 1 character'),
  shared: z.boolean().optional(),
});

const CreateAccountModal: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      shared: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const accountId = await fetchNui<number | false>('createAccount', values, { data: 313221, delay: 1500 });
    // todo: probably setQueriesData rather than invalidate
    await queryClient.invalidateQueries({ queryKey: ['accounts'] });
    setIsLoading(false);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>{locales.account_name}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="name"
        />
        <FormField
          name="shared"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="flex flex-col gap-1 leading-none">
                <FormLabel>{locales.shared_account}</FormLabel>
                <FormDescription>{locales.shared_account_description}</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end" disabled={isLoading}>
          {isLoading ? <SpinningLoader /> : locales.create_account}
        </Button>
      </form>
    </Form>
  );
};

export default CreateAccountModal;
