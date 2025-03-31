import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { PageHeader } from '@/lib/component/navigation/page-header';
import { getCalendarDates } from '@/lib/util/general/date-util';
import { cn } from '@/lib/utils';
import { CalendarDate } from '@/schema/lib/util/general/date-util-schema';
import { buttonCn, pageCn } from '@/styles/class';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { format } from 'date-fns';
import React, { ReactNode, useMemo, useState } from 'react';

function SchedulePage(): ReactNode {
  const [current, setCurrent] = useState<{ month: number; year: number }>({
    month: 3,
    year: 2025,
  });
  const [events, setEvents] = useState(null);
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days: CalendarDate[] = useMemo(() => getCalendarDates(current.month, current.year), [current.month, current.year]);
  const monthYearStr: string = useMemo(() => format(new Date(current.year, current.month - 1), 'MMM yyyy'), [current.month, current.year]);

  const changeMonth = (isNext: boolean): void => {
    setCurrent((prev) => {
      const newState = { ...prev };
      if (newState.month === 12 && !!isNext) {
        newState.month = 1;
        newState.year = newState.year + 1;
      } else if (newState.month === 1 && !isNext) {
        newState.month = 12;
        newState.year = newState.year - 1;
      } else {
        newState.month = newState.month + (isNext ? 1 : -1);
      }

      return newState;
    });
  };

  return (
    <div className={pageCn}>
      <div className="flex w-full items-center justify-between">
        <PageHeader header="Schedule" />

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className={cn(buttonCn, 'h-6 w-6 rounded-full')} onClick={() => changeMonth(false)}>
            <IconChevronLeft />
          </Button>
          <Label className="w-24 text-center text-md font-semibold">{monthYearStr}</Label>
          <Button size="icon" variant="ghost" className={cn(buttonCn, 'h-6 w-6 rounded-full')} onClick={() => changeMonth(true)}>
            <IconChevronRight />
          </Button>
        </div>
      </div>

      <div className="flex w-full min-w-[800px] overflow-auto">
        <div className="grid grid-cols-7 h-full w-full gap-2">
          {dayNames.map((x, i) => (
            <div key={i} className="flex h-8 w-full rounded-lg items-center justify-center bg-neutral-700 text-white">
              <Label className="font-semibold">{x}</Label>
            </div>
          ))}

          {days.map((x, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col h-24 w-full rounded-lg p-2 bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer',
                x.isPadding ? 'opacity-50 pointer-events-none' : ''
              )}
              onClick={() => setActiveDate(x.date)}
            >
              <Label className="text-xs font-medium">{format(x.date, 'dd MMM')}</Label>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!activeDate} onOpenChange={() => (!!activeDate ? setActiveDate(null) : null)}>
        <SheetContent>
          <div className="flex flex-col h-[calc(100vh-48px)] w-full">
            <SheetHeader>
              <SheetTitle>{!!activeDate ? format(activeDate, 'dd MMM yyyy') : ''}</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col w-full gap-4 flex-grow"></div>

            <SheetFooter>
              <Button className={cn(buttonCn, 'rounded-full')}>View Details</Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SchedulePage;
