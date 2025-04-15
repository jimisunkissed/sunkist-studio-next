import '@xyflow/react/dist/style.css';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { addEdge, Background, Connection, Controls, Edge, Node, ReactFlow, useEdgesState, useNodesState, useViewport } from '@xyflow/react';
import { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { v4 } from 'uuid';
import { deselectAllElements, isValidConnection } from '@/lib/util/helper/react-flow-util';
import { EdgeAttributes, EdgeConfig } from '@/lib/util/config/react-flow-config';
import { Database } from '@/schema/lib/config/supabase-schema';
import { errorMessage } from '@/lib/util/general/string-util';
import { useAppStore } from '@/hooks/app-store';
import { sunkistAxios } from '@/lib/api/sunkist-api';
import { ReactFlowBoardProps } from '@/schema/lib/component/react-flow-schema';
import { Label } from '@/components/ui/label';
import { edgeTypes, initEdges, initNodes, nodeTypes } from '@/lib/util/config/react-flow-config';

const ReactFlowBoard = forwardRef(({ sheet }: ReactFlowBoardProps, ref) => {
  const { characters, organizationId } = useAppStore();
  const viewport = useViewport();

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [loaded, setLoaded] = useState<boolean>(false);

  const getElements = async () => {
    try {
      const [nodeRes, edgeRes] = await Promise.all([
        sunkistAxios({
          method: 'get',
          url: '/api/v1/service/database/supabase/protected/st_flow_node',
          params: {
            filters: [
              { column: 'organization_id', func: 'eq', value: organizationId },
              { column: 'flow_sheet_id', func: 'eq', value: sheet?.id },
            ],
          },
        }),
        sunkistAxios({
          method: 'get',
          url: '/api/v1/service/database/supabase/protected/st_flow_edge',
          params: {
            filters: [
              { column: 'organization_id', func: 'eq', value: organizationId },
              { column: 'flow_sheet_id', func: 'eq', value: sheet?.id },
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

  const addNode = (event: DragEndEvent) => {
    if (event?.over?.id !== 'drop-container') return;

    let data: Record<string, unknown> = {};
    const type: UniqueIdentifier | undefined = event?.active?.id;
    if (type === 'characterNode' && !!sheet && sheet.content_type === 'character') data.character_id = sheet.content_id;

    setNodes((prev) => [
      ...prev,
      {
        id: v4(),
        type: type.toString(),
        position: {
          x: event.delta.x / viewport.zoom - (viewport.x * 1.1) / viewport.zoom - 20,
          y: event.delta.y / viewport.zoom - (viewport.y * 1.1) / viewport.zoom,
        },
        data,
      },
    ]);
  };

  const onConnect = useCallback((connection: Connection) => {
    if (!isValidConnection(connection)) return;

    const edgeType = EdgeConfig.find((config) => config.checker(connection));

    const edge: Edge = {
      ...connection,
      ...EdgeAttributes,
      id: v4(),
      type: edgeType?.type,
      data: edgeType?.data,
    };

    setEdges((prev) => addEdge(edge, prev));
  }, []);

  useEffect(() => {
    if (!!organizationId && !!characters && !!sheet?.id) getElements();
  }, [organizationId, !!characters, sheet?.id]);

  useImperativeHandle(ref, () => ({
    addNode,
  }));

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodeDragStart={(_, node) => (nodes.find((x) => x?.selected)?.id !== node.id ? deselectAllElements(setNodes, setEdges) : null)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="react-flow-wrapper"
      >
        <Background />
        <Controls />
      </ReactFlow>

      {!loaded && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center opacity-50">
          <Label className="text-lg">Loading...</Label>
        </div>
      )}
    </div>
  );
});

export default ReactFlowBoard;
