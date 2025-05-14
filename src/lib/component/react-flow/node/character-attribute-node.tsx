import { BaseNode } from '@/components/base-node';
import { Label } from '@/components/ui/label';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { CharacterAttributes } from '@/lib/util/config/character-config';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { CharacterAttributesProps } from '@/schema/lib/util/config/character-config-schema';
import { IconPrismLight } from '@tabler/icons-react';
import { Handle, NodeProps, Position, useReactFlow, useViewport } from '@xyflow/react';
import { Blend, Component } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

export const CharacterAttributeNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes, setEdges } = useReactFlow();
  const { zoom } = useViewport();

  const currentType: CharacterAttributesProps | undefined = useMemo(() => CharacterAttributes.find((x) => x.id === data?.type), [data?.type]);

  const changeType = (type: string) => {
    updateNode(setNodes, id, type, 'data,type');
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="portal-character-attribute-out" position={Position.Top} type="source" />
      <div className="flex flex-col w-64 rounded-xl">
        <div className="flex w-full rounded-t-xl border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <IconPrismLight className="h-4 w-4" />
          <Label className="font-medium">Attribute</Label>
        </div>

        <div className="flex flex-col w-full p-3 gap-2">
          <FlexSelect
            label="Type"
            size="sm"
            scale={zoom}
            Icon={Component}
            options={CharacterAttributes}
            state={{
              value: (data?.type ?? '') as string,
              setValue: (v) => changeType(v),
            }}
            itemValue={(x) => x.id}
            Item={({ prop }) => <span>{prop?.label}</span>}
          />
        </div>
      </div>

      {currentType && (
        <>
          {currentType.elements.map((x, i) => (
            <div key={i} className="relative flex h-8 w-full border-t items-center justify-center">
              <Handle id={`portal-${x.id}-left-in`} position={Position.Left} type="target" />
              <span className="text-[10px]">{x.label}</span>
              <Handle id={`portal-${x.id}-right-in`} position={Position.Right} type="target" />
            </div>
          ))}
        </>
      )}
    </BaseNode>
  );
};

export const CharacterAttributeNodeOverlay = (): ReactNode => (
  <div className="flex flex-col w-64 rounded-xl border overflow-hidden bg-white">
    <div className="flex flex-col w-full">
      <div className="flex w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
        <IconPrismLight className="h-4 w-4" />
        <Label className="font-medium">Attribute</Label>
      </div>

      <div className="flex flex-col w-full p-3 gap-2">
        <FlexSelect label="Name" size="sm" Icon={Blend} />
      </div>
    </div>
  </div>
);
