import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlexTooltip } from '@/lib/component/flex/flex-tooltip';
import { textClass, borderClass } from '@/lib/util/general/color-util';
import { cn } from '@/lib/utils';
import { FlexSelectProps } from '@/schema/lib/component/flex-schema';
import { SquareCheck } from 'lucide-react';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

const sizeConfig = {
  sm: {
    container: 'h-8 rounded-lg',
    icon: 'left-2.5 h-3.5 w-3.5',
    label: {
      default: 'text-xs',
      onTop: 'text-[10px] -translate-x-4 -translate-y-4',
    },
    text: 'text-xs md:text-xs',
    labelLeft: 'left-6',
    trigger: 'pl-8',
    content: 'text-[10px]',
  },
  md: {
    container: 'h-9 rounded-lg',
    icon: 'left-3 h-4 w-4',
    label: {
      default: 'text-sm',
      onTop: 'text-xs -translate-x-5 -translate-y-5',
    },
    text: 'text-sm md:text-sm',
    labelLeft: 'left-8',
    trigger: 'pl-10',
    content: 'text-xs',
  },
  lg: {
    container: 'h-11 rounded-xl',
    icon: 'left-3.5 h-5 w-5',
    label: {
      default: 'text-md',
      onTop: 'text-sm -translate-x-6 -translate-y-6',
    },
    text: 'text-md md:text-md',
    labelLeft: 'left-10',
    trigger: 'pl-12',
    content: 'text-sm',
  },
};

export function FlexSelect({
  state,
  size = 'md',
  scale = 1,
  Icon,
  label,
  message,
  color = 'amber',
  valid = true,
  options = [],
  itemValue = (value: any) => (['string', 'number'].includes(typeof value) ? value : JSON.stringify(value)),
  Item = ({ prop }: { prop: any }) => <span>{['string', 'number'].includes(typeof prop) ? prop : JSON.stringify(prop)}</span>,
}: FlexSelectProps): ReactNode {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  Icon = useMemo(() => Icon ?? SquareCheck, [Icon]);
  const onTop: boolean = useMemo(() => isOpen || !!state?.value, [isOpen, state?.value]);
  const currentSize = useMemo(() => sizeConfig[size] || sizeConfig.md, [size]);

  useEffect(() => {
    const handleClickOutside = (event: any): void => {
      if (clickRef.current && !clickRef.current.contains(event.target) && !selectRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FlexTooltip message={message}>
      <div
        ref={clickRef}
        className={cn(
          'relative flex w-full bg-white border-[1.5px] ring-white items-center',
          'transition-all duration-300',
          currentSize.container,
          borderClass[isOpen ? color : !valid ? 'red' : 'neutral'][isOpen || isHover ? 400 : 200]
        )}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Icon
          className={cn(
            'absolute z-10 left-3 pointer-events-none transition duration-300 ease-in-out',
            currentSize.icon,
            textClass[isOpen ? color : !valid ? 'red' : 'neutral'][400]
          )}
        />

        <span
          className={cn(
            'absolute bg-white px-2 rounded-full font-medium',
            'transition-all duration-300 ease-in-out',
            currentSize.labelLeft,
            onTop ? currentSize.label.onTop : currentSize.label.default,
            textClass[!onTop && !valid ? 'red' : 'neutral'][onTop ? 800 : 400]
          )}
        >
          {label}
        </span>

        <Select
          value={state?.value ?? ''}
          onValueChange={(v) => (state?.setValue ? state.setValue(v) : null)}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <SelectTrigger className={cn('h-full border-0 shadow-none focus:ring-0 focus-visible:ring-0', currentSize.trigger, currentSize.text)}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            ref={selectRef}
            style={{
              minWidth: 'auto',
              width: `${100 / (scale as number)}%`,
              transform: `scale(${scale}) translateY(4px)`,
              transformOrigin: 'top left',
            }}
          >
            {options.map((option, i) => (
              <SelectItem
                key={i}
                value={itemValue(option)}
                className={cn('hover:bg-neutral-100 transition-colors', currentSize.content)}
                style={{ maxWidth: ((clickRef.current?.getBoundingClientRect().width ?? 0) as number) / (scale as number) - 12 }}
              >
                <Item prop={option} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FlexTooltip>
  );
}
