export interface Theme {
  id: string;
  name: string;
  colors: {
    '--color-background': string;
    '--color-glass-bg': string;
    '--color-glass-border': string;
    '--color-glass-glow': string;
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
    id: 'obsidian',
    name: 'Obsidian',
    colors: {
      '--color-background': '#0A0A0A',
      '--color-glass-bg': 'rgba(28, 28, 32, 0.5)',
      '--color-glass-border': 'rgba(255, 255, 255, 0.1)',
      '--color-glass-glow': 'rgba(255, 255, 255, 0.02)',
      '--color-text-primary': '#EAEAEA',
      '--color-text-secondary': '#A0A0A0',
      '--color-accent': '#F0F0F0',
      '--color-accent-text': '#111111',
      '--color-highlight': '#38BDF8', // sky-400
      '--color-subtle-hover': 'rgba(255, 255, 255, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#0A0A0A', accent: '#F0F0F0', highlight: '#38BDF8' },
  },
  {
    id: 'studio-light',
    name: 'Studio Light',
    colors: {
      '--color-background': '#F9F9F9',
      '--color-glass-bg': 'rgba(255, 255, 255, 0.6)',
      '--color-glass-border': 'rgba(0, 0, 0, 0.08)',
      '--color-glass-glow': 'rgba(0, 0, 0, 0.01)',
      '--color-text-primary': '#1A1A1A',
      '--color-text-secondary': '#666666',
      '--color-accent': '#1A1A1A',
      '--color-accent-text': '#F9F9F9',
      '--color-highlight': '#007AFF',
      '--color-subtle-hover': 'rgba(0, 0, 0, 0.05)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.03)',
    },
    previewColors: { bg: '#F9F9F9', accent: '#1A1A1A', highlight: '#007AFF' },
  },
  {
    id: 'evergreen',
    name: 'Evergreen',
    colors: {
      '--color-background': '#1A2421',
      '--color-glass-bg': 'rgba(23, 43, 35, 0.5)',
      '--color-glass-border': 'rgba(167, 194, 178, 0.2)',
      '--color-glass-glow': 'rgba(167, 194, 178, 0.05)',
      '--color-text-primary': '#D8E4DD',
      '--color-text-secondary': '#8A9E92',
      '--color-accent': '#A7C2B2',
      '--color-accent-text': '#1E2A25',
      '--color-highlight': '#F9A826',
      '--color-subtle-hover': 'rgba(167, 194, 178, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#1A2421', accent: '#A7C2B2', highlight: '#F9A826' },
  },
  {
    id: 'nautical',
    name: 'Nautical',
    colors: {
      '--color-background': '#0E1D2B',
      '--color-glass-bg': 'rgba(12, 33, 56, 0.6)',
      '--color-glass-border': 'rgba(189, 203, 215, 0.2)',
      '--color-glass-glow': 'rgba(189, 203, 215, 0.05)',
      '--color-text-primary': '#BDCBD7',
      '--color-text-secondary': '#72889A',
      '--color-accent': '#E5DACE', // Sandy beige
      '--color-accent-text': '#0E1D2B',
      '--color-highlight': '#FF6B6B', // Coral red
      '--color-subtle-hover': 'rgba(229, 218, 206, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#0E1D2B', accent: '#E5DACE', highlight: '#FF6B6B' },
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: {
      '--color-background': '#0d0221',
      '--color-glass-bg': 'rgba(13, 2, 33, 0.5)',
      '--color-glass-border': 'rgba(240, 0, 255, 0.2)',
      '--color-glass-glow': 'rgba(240, 0, 255, 0.1)',
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
  {
    id: 'solarized',
    name: 'Solarized',
    colors: {
      '--color-background': '#002b36', // base03
      '--color-glass-bg': 'rgba(7, 54, 66, 0.6)', // base02
      '--color-glass-border': 'rgba(147, 161, 161, 0.2)', // base1
      '--color-glass-glow': 'rgba(147, 161, 161, 0.05)',
      '--color-text-primary': '#93a1a1', // base1
      '--color-text-secondary': '#586e75', // base01
      '--color-accent': '#eee8d5', // base2
      '--color-accent-text': '#002b36', // base03
      '--color-highlight': '#2aa198', // cyan
      '--color-subtle-hover': 'rgba(238, 232, 213, 0.1)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.1)',
    },
    previewColors: { bg: '#002b36', accent: '#eee8d5', highlight: '#2aa198' },
  },
];