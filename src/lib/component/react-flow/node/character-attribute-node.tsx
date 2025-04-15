import { BaseNode } from '@/components/base-node';
import { Label } from '@/components/ui/label';
import { FlexSelect } from '@/lib/component/flex/flex-select';
import { CharacterAttributes } from '@/lib/util/config/character-config';
import { convertToSlug } from '@/lib/util/general/string-util';
import { updateNode } from '@/lib/util/helper/react-flow-util';
import { cn } from '@/lib/utils';
import { CharacterAttributeProps } from '@/schema/lib/util/config/character-config-schema';
import { IconPrismLight } from '@tabler/icons-react';
import { Handle, NodeProps, Position, useReactFlow, useViewport } from '@xyflow/react';
import { Blend } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

export const CharacterAttributeNode = ({ id, data, selected }: NodeProps): ReactNode => {
  const { setNodes } = useReactFlow();
  const { zoom } = useViewport();

  const currentType: CharacterAttributeProps | undefined = useMemo(() => CharacterAttributes.find((x) => x.id === data?.type), [data?.type]);

  return (
    <BaseNode
      selected={selected}
      className={cn('rounded-xl p-0 hover:ring-sky-200 transition-all', selected ? 'border-sky-300 ring-1 ring-sky-300 hover:ring-sky-300' : '')}
    >
      <Handle id="portal-character-attribute-out" position={Position.Top} type="source" />
      <div className="flex flex-col w-64 rounded-xl overflow-hidden">
        <div className="flex w-full border-b items-center px-3 py-2 gap-2 bg-neutral-50">
          <IconPrismLight className="h-4 w-4" />
          <Label className="font-medium">Attribute</Label>
        </div>

        <div className="flex flex-col w-full p-3 gap-2 bg-white">
          <FlexSelect
            label="Type"
            size="sm"
            scale={zoom}
            Icon={Blend}
            options={CharacterAttributes}
            state={{
              value: (data?.type ?? '') as string,
              setValue: (v) => updateNode(setNodes, id, v, 'data,type'),
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
              <span className="text-xs">{x.label}</span>
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
