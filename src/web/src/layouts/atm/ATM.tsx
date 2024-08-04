import React from 'react';
import { useAtmVisibility } from '../../state/visibility';
import BaseCard from '../bank/components/BaseCard';
import {
  BanknoteIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CreditCard,
  Settings2,
  Wrench,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { formatNumber } from '../../utils/formatNumber';
import { useModal } from '../../components/ModalsProvider';
import { useSetModalContainer } from '../../state/modals';
import CharacterAccounts from '../bank/pages/accounts/components/CharacterAccounts';
import { Input } from '../../components/ui/input';
import locales from '../../locales';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { useAccounts } from '../../state/accounts';
import AccountCard from '../bank/pages/accounts/components/AccountCard';
import { cn } from '../../lib/utils';

const Atm: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const visible = useAtmVisibility();
  const { accounts } = useAccounts();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      {visible && (
        <div className="bg-background relative flex min-w-[400px] max-w-lg flex-col gap-2 rounded-lg p-4">
          <BaseCard title={locales.accounts} icon={CreditCard}>
            <div className="flex items-center gap-2">
              <Carousel
                opts={{ duration: 20, watchDrag: false }}
                orientation="vertical"
                className="flex-1"
                setApi={setApi}
              >
                <CarouselContent className="h-[130px]">
                  {accounts.map((account) => (
                    <CarouselItem key={account.id}>
                      <div className="bg-background flex flex-col gap-4 rounded-lg border p-4 shadow-sm">
                        <div>
                          <p className="line-clamp-1">{account.label}</p>
                          <p className="text-muted-foreground">{account.type}</p>
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
            <p className="self-end text-xs">
              {current + 1} / {accounts.length}
            </p>
          </BaseCard>
          <BaseCard title="Quick withdraw" icon={Zap} className="flex justify-between">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <Button>{formatNumber(500)}</Button>
                <Button>{formatNumber(5000)}</Button>
                <Button>{formatNumber(25000)}</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Button>{formatNumber(1000)}</Button>
                <Button>{formatNumber(10000)}</Button>
                <Button>{formatNumber(50000)}</Button>
              </div>
            </div>
          </BaseCard>
          <BaseCard title="Custom amount" icon={Settings2}>
            <Input />
            <Button className="self-end">Withdraw</Button>
          </BaseCard>
        </div>
      )}
    </>
  );
};

export default Atm;
