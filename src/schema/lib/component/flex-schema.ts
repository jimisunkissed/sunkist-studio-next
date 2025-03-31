import { TailwindColorClass } from '@/schema/lib/util/general/color-util-schema';
import { TablerIcon } from '@tabler/icons-react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type FlexInputType = 'text' | 'number' | 'password';

export type MonthYear = {
  month: string;
  year: string;
};

export type FlexInputProps = {
  id: string;
  type?: 'text' | 'number' | 'password';
  state: {
    value?: string | number;
    setValue: (value: string | number) => void;
  };
  size?: 'sm' | 'md' | 'lg';
  Icon?: LucideIcon | TablerIcon;
  label: string;
  message?: string;
  color?: TailwindColorClass;
  valid?: boolean;
};

export type FlexSelectProps<T = any> = {
  state: {
    value?: string;
    setValue: (value: string) => void;
  };
  size?: 'sm' | 'md' | 'lg';
  Icon?: LucideIcon | TablerIcon;
  label: string;
  message?: string;
  color?: TailwindColorClass;
  valid?: boolean;
  options?: T[];
  itemValue?: (value: T) => string;
  Item?: ({ prop }: { prop: any }) => ReactNode;
};

export type FlexDatePickerProps = {
  placeholder?: string;
  state: {
    value?: Date;
    setValue: (value: Date | undefined) => void;
  };
  valid?: boolean;
};

export type FlexTooltipProps = {
  children: ReactNode;
  message?: string;
  align?: 'center' | 'start' | 'end';
  side?: 'bottom' | 'top' | 'right' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  hasArrow?: boolean;
};
