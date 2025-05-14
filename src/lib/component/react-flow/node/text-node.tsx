import { BaseNode } from '@/components/base-node';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { IndentIncrease } from 'lucide-react';
import { ReactNode } from 'react';

export const TextNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes } = useReactFlow();

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="value-text-top-out" position={Position.Top} type="source" />
      <Handle id="value-text-left-out" position={Position.Left} type="source" />
      <Handle id="value-text-right-out" position={Position.Right} type="source" />
      <Handle id="value-text-bottom-out" position={Position.Bottom} type="source" />
      <div className="flex flex-col w-64 rounded-xl">
        <div className="flex w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <IndentIncrease className="h-4 w-4" />
          <Label className="font-medium">Text</Label>
        </div>

        <Textarea
          className="h-32 resize-none border-0 focus-visible:ring-0 text-xs md:text-xs"
          value={(data?.text as string) ?? ''}
          onChange={(e) => updateNode(setNodes, id, e.target.value ?? '', 'data,text')}
        />
      </div>
    </BaseNode>
  );
};

export const TextNodeOverlay = (): ReactNode => (
  <div className="flex flex-col w-64 border rounded-lg overflow-hidden bg-white">
    <div className="flex w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
      <IndentIncrease className="h-4 w-4" />
      <Label className="font-medium">Text</Label>
    </div>

    <div className="h-32 w-full" />
  </div>
);
