import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { getCalendarDates, monthList } from '@/lib/util/general/date-util';
import { cn } from '@/lib/utils';
import { FlexDatePickerProps, MonthYear } from '@/schema/lib/component/flex-schema';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

export function DatePickerComboBox({ placeholder, state, valid = true }: FlexDatePickerProps): ReactNode {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selected, setSelected] = useState<MonthYear>({
    month: String(currentMonth).padStart(2, '0'),
    year: String(currentYear),
  });
  const [open, setOpen] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const nextMonth = (): void => {
    if (selected?.month === '12') setSelected({ month: '01', year: String(parseInt(selected?.year) + 1) });
    else setSelected({ ...selected, month: (parseInt(selected?.month) + 1).toString().padStart(2, '0') });
  };

  const prevMonth = (): void => {
    if (selected?.month === '01') setSelected({ month: '12', year: String(parseInt(selected?.year) - 1) });
    else setSelected({ ...selected, month: (parseInt(selected?.month) - 1).toString().padStart(2, '0') });
  };

  const selectClass: string = 'w-fit border-none shadow-none focus:ring-0 focus:ring-offset-0 p-0 [&>svg]:hidden';
  const calenderDates = getCalendarDates(parseInt(selected?.month), parseInt(selected?.year));
  const dayList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const yearList = Array.from({ length: 100 + 25 + 1 }, (_, i) => (currentYear + 25 - i).toString());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'flex w-full border-[1.5px] shadow-sm font-normal items-center justify-between px-3 transition-all',
            'bg-white hover:bg-white border-neutral-200 hover:border-neutral-400 ring-neutral-200',
            open && cn('ring-2 border-neutral-400'),
            state?.value ? 'text-black dark:text-white' : 'text-neutral-500',
            !valid &&
              isTouched &&
              cn(
                'ring-2 focus-visible:ring-2 border-red-300 hover:border-red-300 ring-red-200 focus-visible:ring-red-200',
                open && 'border-red-300'
              )
          )}
          onClick={() => setIsTouched(true)}
        >
          {state?.value ? format(state?.value, 'MMM d yyyy') : placeholder}
          <CalendarIcon className="text-neutral-500 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex flex-col w-[220px] gap-2">
          <div className="flex w-full items-center justify-between">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Select value={selected?.year ?? ''} onValueChange={(value) => setSelected({ ...selected, year: value })}>
              <SelectTrigger className={cn(selectClass, 'rounded-none')}>
                <Badge className="h-6">
                  {monthList.find((x) => x.num === selected?.month)?.abb || 'Month'} {selected?.year || 'Year'}
                </Badge>
              </SelectTrigger>
              <SelectContent align="center">
                {yearList.map((x, i) => (
                  <SelectItem key={i} value={x} className="text-xs">
                    {x}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="h-6 w-6" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {dayList.map((x, i) => (
              <div key={i} className="flex aspect-square items-center justify-center cursor-default">
                <span className="text-xs font-light text-neutral-500">{x}</span>
              </div>
            ))}
            {calenderDates?.map((x, i) => (
              <div
                key={i}
                className={cn(
                  'flex aspect-square rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 items-center justify-center cursor-pointer',
                  x?.isPadding ? 'text-neutral-500' : '',
                  JSON.stringify(state?.value) === JSON.stringify(x?.date)
                    ? 'bg-black hover:bg-black text-white dark:bg-white dark:hover:bg-white dark:text-black'
                    : ''
                )}
                onClick={() => state.setValue(x?.date)}
              >
                <span className="text-xs font-medium">{format(x?.date, 'dd')}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
