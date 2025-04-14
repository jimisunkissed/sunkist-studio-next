import { CharacterCategories } from '@/lib/util/config/character-config';
import { Database } from '@/schema/lib/config/supabase-schema';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type CharacterProps = {
  name: string;
  category: (typeof CharacterCategories)[number] | '';
};

export type CharacterTabProps = {
  id: string;
  label: string;
  Content: ReactNode;
};

export type CharacterDesignProps = {
  character?: Database['public']['Tables']['st_character']['Row'] | null;
  setCharacter: Dispatch<SetStateAction<Database['public']['Tables']['st_character']['Row'] | null | undefined>>;
};
