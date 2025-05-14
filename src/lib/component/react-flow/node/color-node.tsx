import { BaseNode } from '@/components/base-node';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { Paintbrush } from 'lucide-react';
import { ReactNode } from 'react';
import { HexColorPicker } from 'react-colorful';

export const ColorNode = ({ data, selected }: NodeProps): ReactNode => {
  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="value-color-top-out" position={Position.Top} type="source" />
      <Handle id="value-color-left-out" position={Position.Left} type="source" />
      <Handle id="value-color-right-out" position={Position.Right} type="source" />
      <Handle id="value-color-bottom-out" position={Position.Bottom} type="source" />
      <div className="flex flex-col w-32 rounded-xl">
        <div className="flex h-8 w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <Paintbrush className="h-4 w-4" />
          <Label className="font-medium">Color</Label>
        </div>

        <div
          className="flex h-20 w-full rounded-b-xl items-end justify-start"
          style={{ backgroundColor: typeof data?.color === 'string' ? data.color : '#ffffff' }}
        >
          <Label className="h-fit w-fit mb-2 ml-2 px-1 rounded text-xs font-medium bg-white">
            {typeof data?.color === 'string' ? data.color : '-'}
          </Label>
        </div>
      </div>
    </BaseNode>
  );
};

export const ColorNodeOverlay = () => (
  <div className="flex flex-col w-32 border rounded-lg overflow-hidden bg-white">
    <div className="flex h-8 w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
      <Paintbrush className="h-4 w-4" />
      <Label className="font-medium">Color</Label>
    </div>

    <div className="flex h-20 w-full rounded-b-xl items-end justify-start bg-white">
      <Label className="h-fit w-fit mb-2 ml-2 px-1 rounded text-xs font-medium bg-white">#ffffff</Label>
    </div>
  </div>
);
