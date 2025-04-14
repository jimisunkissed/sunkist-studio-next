import { Input } from '@/components/ui/input';
import { FlexTooltip } from '@/lib/component/flex/flex-tooltip';
import { textClass, borderClass } from '@/lib/util/general/color-util';
import { cn } from '@/lib/utils';
import { FlexInputProps } from '@/schema/lib/component/flex-schema';
import { Lock, LockOpen } from 'lucide-react';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

const sizeConfig = {
  sm: {
    container: 'h-8 rounded-lg',
    icon: 'left-2.5 h-3.5 w-3.5',
    label: {
      default: 'text-xs',
      onTop: 'text-[10px] -translate-x-4 -translate-y-4',
    },
    input: 'pl-8 text-xs md:text-xs',
    labelLeft: 'left-6',
  },
  md: {
    container: 'h-9 rounded-lg',
    icon: 'left-3 h-4 w-4',
    label: {
      default: 'text-sm',
      onTop: 'text-xs -translate-x-5 -translate-y-5',
    },
    input: 'pl-10 text-sm md:text-sm',
    labelLeft: 'left-8',
  },
  lg: {
    container: 'h-11 rounded-xl',
    icon: 'left-3.5 h-5 w-5',
    label: {
      default: 'text-md',
      onTop: 'text-sm -translate-x-6 -translate-y-6',
    },
    input: 'pl-12 text-md md:text-md',
    labelLeft: 'left-10',
  },
};

export function FlexInput({
  id,
  type = 'text',
  state,
  size = 'md',
  Icon,
  label,
  message,
  color = 'amber',
  valid = true,
}: FlexInputProps): ReactNode {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  Icon = useMemo(() => (type !== 'password' ? Icon : !isShow ? Lock : LockOpen), [type, Icon, isShow]);
  const onTop: boolean = useMemo(() => isFocus || !!state?.value, [isFocus, state?.value]);
  const currentSize = useMemo(() => sizeConfig[size] || sizeConfig.md, [size]);

  useEffect(() => {
    const blur = (event: any): void => {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setIsFocus(false);
      } else {
        setIsFocus(true);
      }
    };

    document.addEventListener('mousedown', blur);
    return () => {
      document.removeEventListener('mousedown', blur);
    };
  }, []);

  useEffect(() => {
    const current = inputRef.current;
    if (inputRef.current) {
      current?.addEventListener('focus', () => setIsFocus(true));
      current?.addEventListener('blur', () => setIsFocus(false));
    }

    return () => {
      if (current) {
        current.removeEventListener('focus', () => setIsFocus(true));
        current.removeEventListener('blur', () => setIsFocus(false));
      }
    };
  }, []);

  return (
    <FlexTooltip message={message}>
      <div
        ref={clickRef}
        className={cn(
          'relative flex w-full bg-white border-[1.5px] ring-white items-center cursor-text',
          'transition-all duration-300',
          currentSize.container,
          borderClass[isFocus ? color : !valid ? 'red' : 'neutral'][isFocus || isHover ? 400 : 200]
        )}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => inputRef.current?.focus()}
      >
        {Icon && (
          <Icon
            className={cn(
              'absolute z-10 transition duration-300 ease-in-out',
              currentSize.icon,
              textClass[isFocus ? color : !valid ? 'red' : 'neutral'][400],
              type === 'password' && 'cursor-pointer'
            )}
            onClick={() => type === 'password' && setIsShow(!isShow)}
          />
        )}

        {label && (
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
        )}

        <Input
          id={id}
          ref={inputRef}
          type={isShow ? 'text' : type}
          className={cn('flex-1 p-0 border-0 shadow-none focus-visible:ring-0', currentSize.input)}
          value={state?.value ?? ''}
          onChange={(e) => (state?.setValue ? state.setValue(e.target.value) : null)}
        />
      </div>
    </FlexTooltip>
  );
}
