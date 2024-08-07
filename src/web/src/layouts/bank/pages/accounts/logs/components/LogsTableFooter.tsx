import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogs } from '@/state/accounts';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPages: number;
}

const LogsTableFooter: React.FC<Props> = ({ page, setPage, maxPages }) => {
  return (
    <div className="nd flex items-center gap-4 self-end">
      <Button size="icon" onClick={() => setPage((prev) => --prev)} disabled={page === 0}>
        <ChevronLeft size={20} />
      </Button>
      <p>
        {page + 1} / {maxPages ? maxPages : '?'}
      </p>
      <Button size="icon" onClick={() => setPage((prev) => ++prev)} disabled={page + 1 >= maxPages}>
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default LogsTableFooter;
