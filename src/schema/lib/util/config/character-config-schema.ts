export type CharacterAtributeElementProps = {
  id: string;
  label: string;
};

export type CharacterAttributeProps = {
  id: string;
  label: string;
  elements: CharacterAtributeElementProps[];
};
