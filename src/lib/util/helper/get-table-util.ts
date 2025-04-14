import { sunkistAxios } from '@/lib/api/sunkist-api';
import { Database } from '@/schema/lib/config/supabase-schema';

export const getCharacterTable = async (organizationId: string): Promise<Database['public']['Tables']['st_character']['Row'][] | null> => {
  try {
    const res = await sunkistAxios({
      method: 'get',
      url: '/api/v1/service/database/supabase/protected/st_character',
      params: {
        filters: [{ column: 'organization_id', func: 'eq', value: organizationId }],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
