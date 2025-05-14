import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { buttonCn } from '@/styles/class';
import { Node, useReactFlow } from '@xyflow/react';
import { Palette } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const ColorMenu = ({ node }: { node: Node }): ReactNode => {
  const { setNodes } = useReactFlow();
  const [temp, setTemp] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const setColor = (): void => {
    if (!temp) {
      setOpen(false);
      return;
    }
    updateNode(setNodes, node.id, temp, 'data,color');
    setOpen(false);
  };

  useEffect(() => {
    if (open) setTemp(typeof node?.data?.color === 'string' ? node.data.color : undefined);
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="group flex flex-col aspect-square w-full rounded-lg items-center justify-center pt-0.5 gap-0 cursor-pointer hover:border-2 hover:border-amber-300 hover:bg-white transition-all">
          <Palette className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
          <span className="text-[9px] text-neutral-500 group-hover:text-black transition-all">Color</span>
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-fit">
        <div className="grid gap-2">
          <Label>Color</Label>
          <HexColorPicker color={typeof temp === 'string' ? temp : undefined} onChange={setTemp} />
          <Button size="sm" className={cn(buttonCn, 'h-7 w-fit ml-auto rounded-full')} onClick={setColor}>
            Select
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
