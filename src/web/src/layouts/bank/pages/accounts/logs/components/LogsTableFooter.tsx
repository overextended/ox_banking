import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogsFilters } from '@/state/accounts';
import { useSetLogsFiltersDebounce } from '@/state/accounts';

interface Props {
  maxPages: number;
}

const LogsTableFooter: React.FC<Props> = ({ maxPages }) => {
  const filters = useLogsFilters();
  const setFilters = useSetLogsFiltersDebounce();

  return (
    <div className="nd flex items-center gap-4 self-end">
      <Button
        size="icon"
        onClick={() => setFilters((prev) => ({ ...prev, page: --prev.page }))}
        disabled={filters.page === 0}
      >
        <ChevronLeft size={20} />
      </Button>
      <p>
        {filters.page + 1} / {maxPages ? maxPages : '?'}
      </p>
      <Button
        size="icon"
        onClick={() => setFilters((prev) => ({ ...prev, page: ++prev.page }))}
        disabled={filters.page + 1 >= maxPages}
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default LogsTableFooter;
