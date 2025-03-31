import { createClient } from '@supabase/supabase-js';
import { Database } from '@/schema/lib/config/supabase-schema';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!;
const supabaseApiKey: string = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseApiKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

export { supabase };
