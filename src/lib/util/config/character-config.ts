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
    elements: ['Physical Appearance', 'Costume Design', 'Makeup & Prosthetics', 'Hairstyle', 'Movement Style', 'Visual Motifs'],
  },
  {
    id: 'character-audio',
    label: 'Audio',
    elements: ['Voice Qualities', 'Dialogue Style', 'Non-verbal Sounds', 'Musical Themes', 'Sound Design'],
  },
  {
    id: 'character-psychological',
    label: 'Psychological',
    elements: ['Personality Traits', 'Motivations', 'Internal Conflicts', 'Background/History', 'Worldview'],
  },
  {
    id: 'character-sociological',
    label: 'Sociological',
    elements: ['Cultural Background', 'Socioeconomic Status', 'Time Period Context', 'Social Role', 'Power Dynamics'],
  },
  {
    id: 'character-narrative',
    label: 'Narrative',
    elements: ['Function in Story', 'Dramatic Purpose', 'Symbolic Significance', 'Contrast with Other Characters'],
  },
];
