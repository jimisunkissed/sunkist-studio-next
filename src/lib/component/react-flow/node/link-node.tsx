import { BaseNode } from '@/components/base-node';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { IconLink } from '@tabler/icons-react';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';

export const LinkNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes } = useReactFlow();

  return (
    <BaseNode selected={selected} className="rounded-lg p-0">
      <Handle id="top" position={Position.Top} type="source" />
      <Handle id="left" position={Position.Left} type="source" />
      <Handle id="right" position={Position.Right} type="source" />
      <Handle id="bottom" position={Position.Bottom} type="source" />
      <div className="flex flex-col w-64 rounded-lg overflow-hidden bg-white">
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
