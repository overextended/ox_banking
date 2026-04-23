import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  maxPages: number;
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ maxPages, page, setPage }) => {
  if (!maxPages) {
    return null;
  }

  return (
    <div className="flex items-center self-end gap-4 nd">
      <Button size="icon" onClick={() => setPage(--page)} disabled={page === 0}>
        <ChevronLeft size={20} />
      </Button>
      <p>
        {page + 1} / {maxPages !== undefined ? maxPages : '?'}
      </p>
      <Button size="icon" onClick={() => setPage(++page)} disabled={page + 1 >= maxPages}>
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
