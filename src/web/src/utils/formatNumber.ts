import locales from '@/locales';

export const formatNumber = (value: number) => {
  return Intl.NumberFormat(locales.locale_code, {
    style: 'currency',
    currency: locales.currency,
    maximumFractionDigits: 0,
  }).format(value);
};
