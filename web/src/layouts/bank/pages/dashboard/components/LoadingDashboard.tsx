import React from 'react';
import SpinningLoader from '@/components/SpinningLoader';

const LoadingDashboard: React.FC = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2 p-2'>
      <div className='flex justify-between gap-2'>
        <div className='h-[108px] rounded-lg bg-card p-4 shadow flex-1 flex items-center justify-center'>
          <SpinningLoader variant='primary' />
        </div>
        <div className='h-[108px] rounded-lg bg-card p-4 shadow flex-1 flex items-center justify-center'>
          <SpinningLoader variant='primary' />
        </div>
      </div>
      <div className='h-[312px] rounded-lg bg-card p-4 shadow flex items-center justify-center'>
        <SpinningLoader variant='primary' />
      </div>
      <div className='flex flex-1 gap-2'>
        <div className='flex-1 rounded-lg bg-card p-4 shadow flex items-center justify-center'>
          <SpinningLoader variant='primary' />
        </div>
        <div className='flex-1 rounded-lg bg-card shadow p-4 flex items-center justify-center'>
          <SpinningLoader variant='primary' />
        </div>
      </div>
    </div>
  );
};

export default LoadingDashboard;
