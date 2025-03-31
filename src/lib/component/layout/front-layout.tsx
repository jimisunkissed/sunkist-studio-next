import { FrontLayoutProps } from '@/schema/lib/component/layout-schema';
import React, { ReactNode } from 'react';

export function FrontLayout({ children }: FrontLayoutProps): ReactNode {
  return <div className="h-full flex-1">{children}</div>;
}
