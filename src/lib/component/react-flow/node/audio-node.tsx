import { BaseNode } from '@/components/base-node';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FlexFile } from '@/lib/component/flex/flex-file';
import { cn } from '@/lib/utils';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { AudioLines, CloudUpload } from 'lucide-react';
import { ReactNode, useState } from 'react';

export const AudioNode = ({ id, data, selected }: NodeProps): ReactNode => {
  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="value-audio-top-out" position={Position.Top} type="source" />
      <Handle id="value-audio-left-out" position={Position.Left} type="source" />
      <Handle id="value-audio-right-out" position={Position.Right} type="source" />
      <Handle id="value-audio-bottom-out" position={Position.Bottom} type="source" />
      <div className="flex flex-col w-64 rounded-xl">
        <div className="flex h-8 w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <AudioLines className="h-4 w-4" />
          <Label className="font-medium">Audio</Label>
        </div>

        <FlexFile />
      </div>
    </BaseNode>
  );
};

export const AudioNodeOverlay = () => (
  <div className="flex flex-col w-64 border rounded-lg overflow-hidden bg-white">
    <div className="flex h-8 w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
      <AudioLines className="h-4 w-4" />
      <Label className="font-medium">Audio</Label>
    </div>

    <div className="h-20 w-full bg-orange-500" />
  </div>
);
