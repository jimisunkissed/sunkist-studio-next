import { sunkistAxios } from '@/lib/api/sunkist-api';
import { Database } from '@/schema/lib/config/supabase-schema';

export const getCharactersByOrg = async (organizationId: string): Promise<Database['public']['Tables']['st_character']['Row'][] | null> => {
  try {
    const res = await sunkistAxios({
      method: 'get',
      url: '/v1/cloud/supabase/protected/st_character',
      params: {
        filters: [{ column: 'organization_id', func: 'eq', value: organizationId }],
        sort: { column: 'priority', direction: 'asc' },
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
