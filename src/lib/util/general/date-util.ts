import { CalendarDate, CalendarMonth } from '@/schema/lib/util/general/date-util-schema';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isWithinInterval } from 'date-fns';

export const monthList: CalendarMonth[] = [
  { name: 'January', abb: 'Jan', num: '01' },
  { name: 'February', abb: 'Feb', num: '02' },
  { name: 'March', abb: 'Mar', num: '03' },
  { name: 'April', abb: 'Apr', num: '04' },
  { name: 'May', abb: 'May', num: '05' },
  { name: 'June', abb: 'Jun', num: '06' },
  { name: 'July', abb: 'Jul', num: '07' },
  { name: 'August', abb: 'Aug', num: '08' },
  { name: 'September', abb: 'Sep', num: '09' },
  { name: 'October', abb: 'Oct', num: '10' },
  { name: 'November', abb: 'Nov', num: '11' },
  { name: 'December', abb: 'Dec', num: '12' },
];

import { parse, isValid } from 'date-fns';

export function isValidDateString(
  dateString: string,
  formats: string[] = ['yyyy/MM/dd HH:mm:ss', 'yyyy/MM/dd HH:mm', 'yyyy/MM/dd HH', 'yyyy/MM/dd']
): boolean {
  for (const format of formats) {
    const parsedDate = parse(dateString, format, new Date());
    if (isValid(parsedDate)) {
      return true;
    }
  }

  return false;
}

export const getCalendarDates = (month: number, year: number) => {
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  if (year < 1900 || year > 2100) {
    throw new Error('Year must be between 1900 and 2100');
  }

  const firstDayOfMonth: Date = startOfMonth(new Date(year, month - 1));
  const lastDayOfMonth: Date = endOfMonth(firstDayOfMonth);

  const calendarStart: Date = startOfWeek(firstDayOfMonth);
  const calendarEnd: Date = endOfWeek(lastDayOfMonth);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(
    (date): CalendarDate => ({
      date,
      isPadding: !isWithinInterval(date, {
        start: firstDayOfMonth,
        end: lastDayOfMonth,
      }),
    })
  );
};
