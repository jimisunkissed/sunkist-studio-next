import { BaseNode } from '@/components/base-node';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { IconLink } from '@tabler/icons-react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';

export const LinkNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes } = useReactFlow();

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="value-link-top-out" position={Position.Top} type="source" />
      <Handle id="value-link-left-out" position={Position.Left} type="source" />
      <Handle id="value-link-right-out" position={Position.Right} type="source" />
      <Handle id="value-link-bottom-out" position={Position.Bottom} type="source" />
      <div className="flex flex-col w-64 rounded-xl overflow-hidden bg-white">
        <div className="flex h-8 w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <IconLink className="h-4 w-4" />
          <Label className="font-medium">Link</Label>
        </div>

        <Input
          className="border-0 focus-visible:ring-0 text-xs md:text-xs"
          value={(data?.link as string) ?? ''}
          onChange={(e) => updateNode(setNodes, id, e.target.value ?? '', 'data,link', undefined, true)}
        />
      </div>
    </BaseNode>
  );
};

export const LinkNodeOverlay = (): ReactNode => (
  <div className="flex flex-col w-64 border rounded-lg overflow-hidden bg-white">
    <div className="flex h-8 w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
      <IconLink className="h-4 w-4" />
      <Label className="font-medium">Link</Label>
    </div>

    <Input className="border-0 focus-visible:ring-0" />
  </div>
);
