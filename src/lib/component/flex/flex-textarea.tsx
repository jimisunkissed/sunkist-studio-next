import { Textarea } from '@/components/ui/textarea';
import { FlexTooltip } from '@/lib/component/flex/flex-tooltip';
import { textClass, borderClass } from '@/lib/util/general/color-util';
import { cn } from '@/lib/utils';
import { FlexTextareaProps } from '@/schema/lib/component/flex-schema';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

const sizeConfig = {
  sm: {
    container: 'h-20 rounded-lg',
    label: {
      default: 'text-xs',
      onTop: 'text-[10px] translate-x-1 -translate-y-4',
    },
    textarea: 'text-xs md:text-xs',
    labelPos: 'top-1.5 left-1',
  },
  md: {
    container: 'h-24 rounded-lg',
    label: {
      default: 'text-sm',
      onTop: 'text-xs translate-x-1.5 -translate-y-5',
    },
    textarea: 'text-sm md:text-sm',
    labelPos: 'top-2 left-1.5',
  },
  lg: {
    container: 'h-32 rounded-xl',
    label: {
      default: 'text-md',
      onTop: 'text-sm translate-x-2 -translate-y-6',
    },
    textarea: 'text-md md:text-md',
    labelPos: 'top-2.5 left-2',
  },
};

export function FlexTextarea({ id, state, size = 'md', height, label, message, color = 'amber', valid = true }: FlexTextareaProps): ReactNode {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
    const current = textareaRef.current;
    if (textareaRef.current) {
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
          'relative flex flex-col w-full bg-white border-[1.5px] ring-white items-start cursor-text',
          'transition-all duration-300',
          currentSize.container,
          height ?? '',
          borderClass[isFocus ? color : !valid ? 'red' : 'neutral'][isFocus || isHover ? 400 : 200]
        )}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => textareaRef.current?.focus()}
      >
        <span
          className={cn(
            'absolute top-2 bg-white px-2 rounded-full font-medium',
            'transition-all duration-300 ease-in-out',
            currentSize.labelPos,
            onTop ? currentSize.label.onTop : currentSize.label.default,
            textClass[!onTop && !valid ? 'red' : 'neutral'][onTop ? 800 : 400]
          )}
        >
          {label}
        </span>

        <Textarea
          id={id}
          ref={textareaRef}
          className={cn('flex-1 border-0 shadow-none focus-visible:ring-0 resize-none', currentSize.textarea)}
          value={state?.value ?? ''}
          onChange={(e) => (state?.setValue ? state.setValue(e.target.value) : null)}
        />
      </div>
    </FlexTooltip>
  );
}
