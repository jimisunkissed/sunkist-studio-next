import React, { ReactNode } from 'react';
import { FlexTooltipProps } from '@/schema/lib/component/flex-schema';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function FlexTooltip({
  children,
  message,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  delayDuration = 0,
}: FlexTooltipProps): ReactNode {
  if (!message) return children;
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side} sideOffset={sideOffset} className="max-w-56 text-center">
          <p className="break-words">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
