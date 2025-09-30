export interface Theme {
  id: string;
  name: string;
  colors: {
    '--color-background': string;
    '--color-glass-bg': string;
    '--color-glass-border': string;
    '--color-text-primary': string;
    '--color-text-secondary': string;
    '--color-accent': string;
    '--color-accent-text': string;
    '--color-highlight': string;
    '--color-subtle-hover': string;
    '--color-weekend-shade': string;
  };
  previewColors: {
    bg: string;
    accent: string;
    highlight: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'default-dark',
    name: 'Default Dark',
    colors: {
      '--color-background': '#111111',
      '--color-glass-bg': 'rgba(30, 30, 30, 0.5)',
      '--color-glass-border': 'rgba(255, 255, 255, 0.1)',
      '--color-text-primary': '#EAEAEA',
      '--color-text-secondary': '#A0A0A0',
      '--color-accent': '#F0F0F0',
      '--color-accent-text': '#111111',
      '--color-highlight': '#38BDF8', // sky-400
      '--color-subtle-hover': 'rgba(255, 255, 255, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#111111', accent: '#F0F0F0', highlight: '#38BDF8' },
  },
  {
    id: 'studio-light',
    name: 'Studio Light',
    colors: {
      '--color-background': '#F9F9F9',
      '--color-glass-bg': 'rgba(255, 255, 255, 0.5)',
      '--color-glass-border': 'rgba(0, 0, 0, 0.1)',
      '--color-text-primary': '#1F1F1F',
      '--color-text-secondary': '#666666',
      '--color-accent': '#1F1F1F',
      '--color-accent-text': '#F9F9F9',
      '--color-highlight': '#007AFF',
      '--color-subtle-hover': 'rgba(0, 0, 0, 0.05)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.03)',
    },
    previewColors: { bg: '#F9F9F9', accent: '#1F1F1F', highlight: '#007AFF' },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      '--color-background': '#1E2A25',
      '--color-glass-bg': 'rgba(23, 43, 35, 0.5)',
      '--color-glass-border': 'rgba(167, 194, 178, 0.2)',
      '--color-text-primary': '#D8E4DD',
      '--color-text-secondary': '#8A9E92',
      '--color-accent': '#A7C2B2',
      '--color-accent-text': '#1E2A25',
      '--color-highlight': '#F9A826', // A contrasting amber/gold
      '--color-subtle-hover': 'rgba(167, 194, 178, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#1E2A25', accent: '#A7C2B2', highlight: '#F9A826' },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      '--color-background': '#0F1C2E',
      '--color-glass-bg': 'rgba(12, 33, 56, 0.6)',
      '--color-glass-border': 'rgba(68, 142, 204, 0.2)',
      '--color-text-primary': '#C4D8E9',
      '--color-text-secondary': '#6B87A4',
      '--color-accent': '#B3DAFF',
      '--color-accent-text': '#0F1C2E',
      '--color-highlight': '#33FFC2', // A bright seafoam green
      '--color-subtle-hover': 'rgba(179, 218, 255, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#0F1C2E', accent: '#B3DAFF', highlight: '#33FFC2' },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      '--color-background': '#0d0221',
      '--color-glass-bg': 'rgba(13, 2, 33, 0.5)',
      '--color-glass-border': 'rgba(240, 0, 255, 0.2)',
      '--color-text-primary': '#c9c9ff',
      '--color-text-secondary': '#736f94',
      '--color-accent': '#00f0ff',
      '--color-accent-text': '#0d0221',
      '--color-highlight': '#f000ff',
      '--color-subtle-hover': 'rgba(0, 240, 255, 0.1)',
      '--color-weekend-shade': 'rgba(240, 0, 255, 0.05)',
    },
    previewColors: { bg: '#0d0221', accent: '#00f0ff', highlight: '#f000ff' },
  },
];
