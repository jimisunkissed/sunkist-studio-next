import { LucideIcon } from 'lucide-react';
import { TablerIcon } from '@tabler/icons-react';
import { TailwindColorClass } from '@/schema/lib/util/general/color-util-schema';

export type AppSubmenuConfigItemProps = {
  name: string;
  description: string;
  Icon: LucideIcon | TablerIcon;
  active: boolean;
};

export type AppSubmenuConfigProps = {
  category: string;
  color: TailwindColorClass;
  item: AppSubmenuConfigItemProps[];
};
