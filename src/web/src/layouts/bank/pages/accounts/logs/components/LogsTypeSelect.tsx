import React from 'react';
import { useLogsFilters, useSetLogsFiltersDebounce } from '@/state/accounts';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import locales from '@/locales';

const LogsTypeSelect: React.FC = () => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <Select
      value={filters.type}
      onValueChange={(value) =>
        setFilters((prev) => ({
          ...prev,
          page: 0,
          type: value as 'inbound' | 'outbound',
        }))
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={locales.transaction_type} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{locales.transaction_type}</SelectLabel>
          <SelectItem value="combined">{locales.transaction_type_combined}</SelectItem>
          <SelectItem value="inbound">{locales.transaction_type_inbound}</SelectItem>
          <SelectItem value="outbound">{locales.transaction_type_outbound}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LogsTypeSelect;
