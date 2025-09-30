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
    '--color-text-strategy': string;
    '--color-text-design': string;
    '--color-text-development': string;
    '--color-text-content': string;
    '--color-text-default': string;
    '--color-text-rose': string;
    '--color-text-teal': string;
    '--color-text-orange': string;
    '--color-text-indigo': string;
    '--color-text-lime': string;
    '--color-text-violet': string;
  };
  previewColors: {
    bg: string;
    accent: string;
    highlight: string;
  };
  background: string;
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
      '--color-text-strategy': '#e0f2fe', // sky-200
      '--color-text-design': '#f5d0fe', // fuchsia-200
      '--color-text-development': '#d1fae5', // emerald-200
      '--color-text-content': '#fef3c7', // amber-200
      '--color-text-default': '#e5e7eb', // gray-200
      '--color-text-rose': '#fecdd3', // rose-200
      '--color-text-teal': '#ccfbf1', // teal-200
      '--color-text-orange': '#fed7aa', // orange-200
      '--color-text-indigo': '#e0e7ff', // indigo-200
      '--color-text-lime': '#d9f99d', // lime-200
      '--color-text-violet': '#e9d5ff', // violet-200
    },
    previewColors: { bg: '#111111', accent: '#F0F0F0', highlight: '#38BDF8' },
    background: `radial-gradient(at 20% 80%, hsla(217,33%,15%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(289,25%,15%,1) 0px, transparent 50%), radial-gradient(at 70% 80%, hsla(240,25%,10%,1) 0px, transparent 50%)`,
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
      '--color-text-strategy': '#075985', // sky-800
      '--color-text-design': '#86198f', // fuchsia-800
      '--color-text-development': '#065f46', // emerald-800
      '--color-text-content': '#92400e', // amber-800
      '--color-text-default': '#1f2937', // gray-800
      '--color-text-rose': '#9f1239', // rose-800
      '--color-text-teal': '#115e59', // teal-800
      '--color-text-orange': '#9a3412', // orange-800
      '--color-text-indigo': '#3730a3', // indigo-800
      '--color-text-lime': '#4d7c0f', // lime-800
      '--color-text-violet': '#5b21b6', // violet-800
    },
    previewColors: { bg: '#F9F9F9', accent: '#1F1F1F', highlight: '#007AFF' },
    background: `radial-gradient(at 20% 80%, hsla(210,20%,98%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(200,20%,95%,1) 0px, transparent 50%), radial-gradient(at 70% 80%, hsla(0,0%,100%,1) 0px, transparent 50%)`,
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
      '--color-text-strategy': '#e0f2fe',
      '--color-text-design': '#f5d0fe',
      '--color-text-development': '#d1fae5',
      '--color-text-content': '#fef3c7',
      '--color-text-default': '#e5e7eb',
      '--color-text-rose': '#fecdd3',
      '--color-text-teal': '#ccfbf1',
      '--color-text-orange': '#fed7aa',
      '--color-text-indigo': '#e0e7ff',
      '--color-text-lime': '#d9f99d',
      '--color-text-violet': '#e9d5ff',
    },
    previewColors: { bg: '#1E2A25', accent: '#A7C2B2', highlight: '#F9A826' },
    background: `radial-gradient(at 20% 80%, hsla(148,25%,20%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(100,15%,20%,1) 0px, transparent 50%), radial-gradient(at 70% 80%, hsla(40,15%,20%,1) 0px, transparent 50%)`,
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
      '--color-text-strategy': '#e0f2fe',
      '--color-text-design': '#f5d0fe',
      '--color-text-development': '#d1fae5',
      '--color-text-content': '#fef3c7',
      '--color-text-default': '#e5e7eb',
      '--color-text-rose': '#fecdd3',
      '--color-text-teal': '#ccfbf1',
      '--color-text-orange': '#fed7aa',
      '--color-text-indigo': '#e0e7ff',
      '--color-text-lime': '#d9f99d',
      '--color-text-violet': '#e9d5ff',
    },
    previewColors: { bg: '#0F1C2E', accent: '#B3DAFF', highlight: '#33FFC2' },
    background: `radial-gradient(at 20% 80%, hsla(210,60%,15%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(190,50%,20%,1) 0px, transparent 50%), radial-gradient(at 70% 80%, hsla(220,50%,10%,1) 0px, transparent 50%)`,
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
      '--color-text-strategy': '#e0f2fe',
      '--color-text-design': '#f5d0fe',
      '--color-text-development': '#d1fae5',
      '--color-text-content': '#fef3c7',
      '--color-text-default': '#e5e7eb',
      '--color-text-rose': '#fecdd3',
      '--color-text-teal': '#ccfbf1',
      '--color-text-orange': '#fed7aa',
      '--color-text-indigo': '#e0e7ff',
      '--color-text-lime': '#d9f99d',
      '--color-text-violet': '#e9d5ff',
    },
    previewColors: { bg: '#0d0221', accent: '#00f0ff', highlight: '#f000ff' },
    background: `radial-gradient(at 20% 80%, hsla(300, 80%, 20%, 0.7) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(260, 80%, 30%, 0.7) 0px, transparent 50%), radial-gradient(at 70% 80%, hsla(180, 90%, 25%, 0.7) 0px, transparent 50%)`,
  },
];