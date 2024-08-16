export interface LogItemProps {
  name: string;
  message: string;
  amount: number;
  newBalance: number;
  type: 'outbound' | 'inbound';
  date: string;
}
