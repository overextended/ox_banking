import React from 'react';
import { Check, Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import locales from '@/locales';

const CopyAccountNumber: React.FC<{ accountNumber: number }> = ({ accountNumber }) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setCopied(false);
  }, [accountNumber]);

  function handleCopyNumber() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const clipElem = document.createElement('input');
    clipElem.value = accountNumber.toString();
    document.body.appendChild(clipElem);
    clipElem.select();
    document.execCommand('copy');
    document.body.removeChild(clipElem);
  }

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <button onClick={handleCopyNumber} className="flex items-center">
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </TooltipTrigger>
      <TooltipContent>{locales.copy}</TooltipContent>
    </Tooltip>
  );
};

export default CopyAccountNumber;
