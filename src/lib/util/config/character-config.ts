import { CharacterAttributeProps } from '@/schema/lib/util/config/character-config-schema';

export const CharacterCategories: string[] = [
  'Protagonist',
  'Antagonist',
  'Deuteragonist',
  'Tritagonist',
  'Major Support',
  'Minor Support',
  'Extras',
];

export const CharacterAttributes: CharacterAttributeProps[] = [
  {
    id: 'character-visual',
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
    id: 'character-audio',
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
    id: 'character-psychological',
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
    id: 'character-sociological',
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
    id: 'character-narrative',
    label: 'Narrative',
    elements: [
      { id: 'function', label: 'Function in Story' },
      { id: 'purpose', label: 'Dramatic Purpose' },
      { id: 'symbolism', label: 'Symbolic Significance' },
      { id: 'contrast', label: 'Contrast with Other Characters' },
    ],
  },
];
