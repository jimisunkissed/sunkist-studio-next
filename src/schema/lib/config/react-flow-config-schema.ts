import { Connection, Node } from '@xyflow/react';

export type EdgeConfigProps = {
  checker: (c: Connection) => boolean;
  type: string | undefined;
  data: Record<string, unknown>;
};
