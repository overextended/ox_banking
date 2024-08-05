import React from 'react';
import { useAccounts } from '@/state/accounts';
import locales from '../../../locales';
import { ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';
import { Button } from '@/components/ui/button';
import BaseCard from '../../bank/components/BaseCard';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Account } from '@/typings';

interface Props {
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account>>;
}

const AccountSelector: React.FC<Props> = ({ setSelectedAccount }) => {
  const { accounts } = useAccounts();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    setSelectedAccount(accounts[api.selectedScrollSnap()]);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      setSelectedAccount(accounts[api.selectedScrollSnap()]);
    });
  }, [api]);

  return (
    <BaseCard title={locales.accounts} icon={CreditCard}>
      <div className="flex items-center gap-2">
        <Carousel opts={{ duration: 20, watchDrag: false }} orientation="vertical" className="flex-1" setApi={setApi}>
          <CarouselContent className="h-[130px]">
            {accounts.map((account) => (
              <CarouselItem key={account.id}>
                <div className="bg-background flex flex-col gap-4 rounded-lg border p-4 shadow-sm">
                  <div>
                    <p className="line-clamp-1">{account.label}</p>
                    <p className="text-muted-foreground">
                      {account.type === 'personal'
                        ? locales.personal_account
                        : account.type === 'shared'
                          ? locales.shared_account
                          : locales.group_account}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs">
                    <p>{formatNumber(account.balance)}</p>
                    <p className="text-muted-foreground">{account.id}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => api?.scrollPrev()}
            size="icon"
            className="flex-[1_0_auto] rounded-full"
            disabled={!api?.canScrollPrev()}
          >
            <ChevronUp size={20} />
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            size="icon"
            className="flex-[1_0_auto] rounded-full"
            disabled={!api?.canScrollNext()}
          >
            <ChevronDown size={20} />
          </Button>
        </div>
      </div>
      <p className="text-center text-xs">
        {current + 1} / {accounts.length}
      </p>
    </BaseCard>
  );
};

export default AccountSelector;
