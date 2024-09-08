import { format } from 'date-fns';
import locales from '@/locales';

export function formatDate(date?: number) {
  if (!date) return '';

  const parsedDate = new Date(date * 1000);

  return format(parsedDate, locales.date_format);
}
