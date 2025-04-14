import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ClerkUserButton } from '@/lib/component/clerk/clerk-user-button';
import { CharacterSubmenuBody } from '@/lib/component/navigation/submenu/character-submenu';
import { ProjectSubmenuBody, ProjectSubmenuHeader } from '@/lib/component/navigation/submenu/project-submenu';
import { ScriptSubmenuBody } from '@/lib/component/navigation/submenu/script-submenu';
import { cn } from '@/lib/utils';
import { MenuItemProps, ScrollPositionProps } from '@/schema/lib/component/navigation-schema';
import {
  IconArrowRightToArc,
  IconBook2,
  IconBriefcase,
  IconCalendarClock,
  IconChairDirector,
  IconMasksTheater,
  IconMoneybag,
  IconPhotoScan,
  IconSettings,
  IconSwipe,
  IconUsersGroup,
  IconVideo,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

export function AppSidebar(): ReactNode {
  const { asPath, push } = useRouter();

  const [activeMenu, setActiveMenu] = useState<MenuItemProps | null>(null);
  const [scrollPosition, setScrollPosition] = useState<ScrollPositionProps>({});
  const [open, setOpen] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const menuItem: MenuItemProps[][] = [
    [
      {
        name: 'Project',
        path: '',
        Icon: IconBriefcase,
        Header: <ProjectSubmenuHeader />,
        Body: <ProjectSubmenuBody />,
      },
    ],
    [
      {
        name: 'Script',
        path: '/script',
        Icon: IconBook2,
        Header: <></>,
        Body: <ScriptSubmenuBody />,
      },
      {
        name: 'Character',
        path: '/character',
        Icon: IconMasksTheater,
        Header: <></>,
        Body: <CharacterSubmenuBody />,
      },
      {
        name: 'Story Card',
        path: '/story-card',
        Icon: IconSwipe,
        Header: <></>,
        Body: <></>,
      },
      {
        name: 'Timeline',
        path: '/timeline',
        Icon: IconArrowRightToArc,
      },
      {
        name: 'Previsualization',
        path: '/previsualization',
        Icon: IconPhotoScan,
        Header: <></>,
        Body: <></>,
      },
    ],
    [
      {
        name: 'Crew',
        path: '/crew',
        Icon: IconUsersGroup,
      },
      {
        name: 'Equipment',
        path: '/equipment',
        Icon: IconVideo,
      },
      {
        name: 'Schedule',
        path: '/schedule',
        Icon: IconCalendarClock,
        Header: <></>,
        Body: <></>,
      },
      {
        name: 'Budget',
        path: '/budget',
        Icon: IconMoneybag,
      },
    ],
    [{ name: 'Settings', path: '/settings', Icon: IconSettings }],
  ];
  const currentMenu = menuItem.flat().find((x) => asPath.startsWith(`/app${x.path}`) && x.path)?.name ?? 'Sticky';

  const onScroll = (): void => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setScrollPosition({ top: Math.floor(scrollTop), bottom: Math.floor(scrollHeight - scrollTop - clientHeight) });
    }
  };

  useEffect(() => {
    const scroll = scrollRef.current;

    if (scroll) {
      scroll.addEventListener('scroll', onScroll, { passive: true });

      onScroll();

      return () => {
        scroll.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <div
      className={cn('relative h-full rounded-2xl bg-white overflow-hidden', open ? 'w-80' : 'w-16', 'transition-all duration-300')}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="absolute z-10 top-0 left-0 flex flex-col h-full w-16 p-4 bg-white ring-1 ring-neutral-100 items-center">
        <IconChairDirector strokeWidth={2} className="size-6 mt-2 text-amber-500 cursor-pointer" onClick={() => push('/')} />

        <div className="flex flex-col mt-8">
          {menuItem.map((x, i) => (
            <div key={i} className="flex flex-col">
              {x.map((y, j) => (
                <Button
                  key={j}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'my-1 transition-colors duration-300',
                    y.name === activeMenu?.name && 'bg-neutral-100',
                    y.name === currentMenu
                      ? 'text-amber-500 hover:text-amber-500'
                      : y.name === activeMenu?.name
                      ? 'text-black'
                      : 'text-neutral-500'
                  )}
                  onMouseEnter={() => {
                    setActiveMenu(y);
                    setOpen(true);
                  }}
                  onClick={() => push(`/app${y.path}`)}
                >
                  <y.Icon className="min-h-5 min-w-5" />
                </Button>
              ))}
              {i < menuItem.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <ClerkUserButton />
        </div>
      </div>

      <div className="absolute top-0 right-0 flex flex-col h-full w-64 p-4 gap-3">
        <div className="flex items-center justify-between">
          <Label className="text-lg">{activeMenu?.name}</Label>
          {activeMenu?.Header}
        </div>

        <Separator />
        <div className="relative flex-1 w-full overflow-hidden">
          <div ref={scrollRef} className="h-full overflow-scroll" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {activeMenu?.Body}
          </div>

          <div
            className={cn(
              'absolute z-10 top-0 h-[100px] w-full bg-gradient-to-b from-white to-transparent transition-opacity pointer-events-none',
              scrollPosition?.top === 0 ? 'opacity-0' : 'opacity-100'
            )}
          />
          <div
            className={cn(
              'absolute z-10 bottom-0 h-[100px] w-full bg-gradient-to-t from-white to-transparent pointer-events-none',
              scrollPosition?.bottom === 0 ? 'opacity-0' : 'opacity-100'
            )}
          />
        </div>
      </div>
    </div>
  );
}
