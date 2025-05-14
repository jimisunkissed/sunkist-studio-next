export type CharacterCategoriesProps = {
  priority: number;
  label: string;
};

export type CharacterAtributesElementProps = {
  id: string;
  label: string;
};

export type CharacterAttributesProps = {
  id: string;
  label: string;
  elements: CharacterAtributesElementProps[];
};

export type CharacterRelationsProps = {
  id: string;
  label: string;
};
