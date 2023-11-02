import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/components/ModalsProvider';

const formSchema = z.object({
  amount: z
    .string({
      coerce: true,
      invalid_type_error: 'Amount must be a number',
      required_error: 'Amount is required',
    })
    .min(1, 'Amount should be a number greater than 0'),
});

const WithdrawModal: React.FC = () => {
  const modal = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const schema = z.number().min(0);

    if (!schema.safeParse(+values.amount).success)
      return form.setError('amount', {
        type: 'value',
        message: 'Amount should be a number greater than 0',
      });

    console.log(values);
    modal.close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormDescription>Available cash: $1,300</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button type="submit" className="w-full">
          Confirm
        </Button>
      </form>
    </Form>
  );
};

export default WithdrawModal;
