import { CharacterAttributesProps, CharacterCategoriesProps, CharacterRelationsProps } from '@/schema/lib/util/config/character-config-schema';

export const CharacterCategories: CharacterCategoriesProps[] = [
  { priority: 1, label: 'Protagonist' },
  { priority: 2, label: 'Antagonist' },
  { priority: 3, label: 'Deuteragonist' },
  { priority: 4, label: 'Tritagonist' },
  { priority: 5, label: 'Major Support' },
  { priority: 6, label: 'Minor Support' },
  { priority: 7, label: 'Extras' },
];

export const CharacterAttributes: CharacterAttributesProps[] = [
  {
    id: 'visual',
    label: 'Visual',
    elements: [
      { id: 'appearance', label: 'Physical Appearance' },
      { id: 'costume', label: 'Costume Design' },
      { id: 'makeup', label: 'Makeup & Prosthetics' },
      { id: 'hairstyle', label: 'Hairstyle' },
      { id: 'movement', label: 'Movement Style' },
      { id: 'motifs', label: 'Visual Motifs' },
    ],
  },
  {
    id: 'audio',
    label: 'Audio',
    elements: [
      { id: 'voice', label: 'Voice Qualities' },
      { id: 'dialogue', label: 'Dialogue Style' },
      { id: 'sounds', label: 'Non-verbal Sounds' },
      { id: 'themes', label: 'Musical Themes' },
      { id: 'sounddesign', label: 'Sound Design' },
    ],
  },
  {
    id: 'psychological',
    label: 'Psychological',
    elements: [
      { id: 'personality', label: 'Personality Traits' },
      { id: 'motivations', label: 'Motivations' },
      { id: 'conflicts', label: 'Internal Conflicts' },
      { id: 'background', label: 'Background/History' },
      { id: 'worldview', label: 'Worldview' },
    ],
  },
  {
    id: 'sociological',
    label: 'Sociological',
    elements: [
      { id: 'culture', label: 'Cultural Background' },
      { id: 'socioeconomic', label: 'Socioeconomic Status' },
      { id: 'timeperiod', label: 'Time Period Context' },
      { id: 'role', label: 'Social Role' },
      { id: 'power', label: 'Power Dynamics' },
    ],
  },
  {
    id: 'narrative',
    label: 'Narrative',
    elements: [
      { id: 'function', label: 'Function in Story' },
      { id: 'purpose', label: 'Dramatic Purpose' },
      { id: 'symbolism', label: 'Symbolic Significance' },
      { id: 'contrast', label: 'Contrast with Other Characters' },
    ],
  },
];

export const CharacterRelations: CharacterRelationsProps[] = [
  { id: 'history', label: 'Relationship History' },
  { id: 'dynamic', label: 'Relationship Dynamic' },
  { id: 'power', label: 'Power Dynamics' },
  { id: 'communication', label: 'Communication Style' },
  { id: 'conflict', label: 'Sources of Conflict' },
  { id: 'growth', label: 'Growth & Change' },
  { id: 'subtext', label: 'Emotional Subtext' },
  { id: 'symbolism', label: 'Symbolic Meaning' },
];
