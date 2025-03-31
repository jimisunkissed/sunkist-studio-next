import { CharacterCategories } from '@/lib/util/config/project-config';

export type CharacterProps = {
  name: string;
  category: (typeof CharacterCategories)[number] | '';
};
