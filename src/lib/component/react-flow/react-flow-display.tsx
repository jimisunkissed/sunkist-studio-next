import '@xyflow/react/dist/style.css';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/app-store';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import { EdgeAttributes, edgeTypes, initEdges, initNodes, nodeTypes } from '@/lib/util/config/react-flow-config';
import { errorMessage } from '@/lib/util/general/string-util';
import { Database } from '@/schema/lib/config/supabase-schema';
import { Background, Controls, Edge, Node, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useViewport } from '@xyflow/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { getCharactersByOrg } from '@/lib/util/helper/get-table-util';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buttonCn } from '@/styles/class';

export function ReactFlowDisplay(): ReactNode {
  const { isReady, asPath, push } = useRouter();
  const { organizationId, characters, setCharacters } = useAppStore();

  const [nodes, setNodes] = useNodesState(initNodes);
  const [edges, setEdges] = useEdgesState(initEdges);
  const [loaded, setLoaded] = useState<boolean>(false);

  const getElements = async () => {
    try {
      const [, , type, id] = asPath.split('/');
      const sheets = (await sunkistAxios({
        method: 'get',
        url: '/v1/cloud/supabase/protected/st_flow_sheet',
        params: {
          filters: [
            { column: 'organization_id', func: 'eq', value: organizationId },
            { column: 'content_type', func: 'eq', value: type },
            { column: 'content_id', func: 'eq', value: id },
          ],
          page: 1,
          length: 1,
        },
      })) as Database['public']['Tables']['st_flow_sheet']['Row'][];

      let sheet: Database['public']['Tables']['st_flow_sheet']['Row'] | null = null;
      if (!sheets.length) {
        const newSheet = await sunkistAxios({
          method: 'post',
          url: '/v1/cloud/supabase/protected/st_flow_sheet',
          body: {
            row: {
              organization_id: organizationId,
              content_type: 'character',
              content_id: id,
            },
          },
        });
        sheet = newSheet;
        return;
      }
      sheet = sheets[0];

      const [nodeRes, edgeRes] = await Promise.all([
        sunkistAxios({
          method: 'get',
          url: '/v1/cloud/supabase/protected/st_flow_node',
          params: {
            filters: [
              { column: 'organization_id', func: 'eq', value: organizationId },
              { column: 'flow_sheet_id', func: 'eq', value: sheet.id },
            ],
          },
        }),
        sunkistAxios({
          method: 'get',
          url: '/v1/cloud/supabase/protected/st_flow_edge',
          params: {
            filters: [
              { column: 'organization_id', func: 'eq', value: organizationId },
              { column: 'flow_sheet_id', func: 'eq', value: sheet.id },
            ],
          },
        }),
      ]);

      const nodes: Node[] = nodeRes.map((node: Database['public']['Tables']['st_flow_node']['Row']) => ({
        id: node.id,
        type: node.type,
        position: { x: node.position_x, y: node.position_y },
        data: node.data,
      }));
      const edges: Edge[] = edgeRes.map((edge: Database['public']['Tables']['st_flow_edge']['Row']) => ({
        ...EdgeAttributes,
        id: edge.id,
        type: edge?.type,
        source: edge.source,
        sourceHandle: edge.source_handle,
        target: edge.target,
        targetHandle: edge.target_handle,
        data: edge.data,
      }));

      setNodes((prev) => [...prev, ...nodes]);
      setEdges((prev) => [...prev, ...edges]);
    } catch (error) {
      console.error(errorMessage(error));
    } finally {
      setTimeout(() => {
        setLoaded(true);
      }, 50);
    }
  };

  const getCharacters = async (): Promise<void> => {
    try {
      const res = await getCharactersByOrg(organizationId as string);
      setCharacters(res as Database['public']['Tables']['st_character']['Row'][]);
    } catch (error) {
      console.error(errorMessage(error));
    }
  };

  useEffect(() => {
    if (isReady && !!asPath && !!organizationId) getElements();
  }, [isReady, asPath, organizationId]);

  useEffect(() => {
    if (!!useAppStore && !characters && !!organizationId) getCharacters();
  }, [!!useAppStore, organizationId]);

  return (
    <div className="relative rounded-xl border overflow-hidden" style={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow nodeTypes={nodeTypes} edgeTypes={edgeTypes} nodes={nodes} edges={edges} fitView className="react-flow-wrapper">
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>

      {!loaded && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-50">
          <Label className="text-lg">Loading...</Label>
        </div>
      )}

      <Button className={cn(buttonCn, 'absolute top-2 right-2 h-7 rounded-full')} onClick={() => push(`${asPath}/flow`)}>
        Edit
      </Button>
    </div>
  );
}
