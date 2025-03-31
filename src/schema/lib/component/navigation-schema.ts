// import { AppSubmenuConfigProps } from '@/schema/lib/util/config/submenu-schema';
import { AppSubmenuConfigProps } from '@/schema/lib/component/submenu-schema';
import { TailwindColorClass } from '@/schema/lib/util/general/color-util-schema';
import { TablerIcon } from '@tabler/icons-react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type MenuItemProps = {
  name: string;
  path: string;
  Icon: LucideIcon | TablerIcon;
  Header?: ReactNode;
  Body?: ReactNode;
};

export type TagColorProps = {
  color: TailwindColorClass;
  message: string;
};

export type AppSubmenuHeadProps = {
  config: TagColorProps[];
};

export type AppSubmenuBodyProps = {
  menu: string;
  config: AppSubmenuConfigProps[];
};

export type PageHeaderProps = {
  header?: string;
};

export type ScrollPositionProps = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};
