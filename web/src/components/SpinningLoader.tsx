import React from 'react';
import { Loader2 } from 'lucide-react';

const SpinningLoader: React.FC = () => {
  return <Loader2 className="animate-spin" />;
};

export default SpinningLoader;
