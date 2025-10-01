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
    
    // Task Colors
    '--task-strategy-bg': string;
    '--task-strategy-text': string;
    '--task-strategy-border': string;
    '--task-design-bg': string;
    '--task-design-text': string;
    '--task-design-border': string;
    '--task-development-bg': string;
    '--task-development-text': string;
    '--task-development-border': string;
    '--task-content-bg': string;
    '--task-content-text': string;
    '--task-content-border': string;
    '--task-default-bg': string;
    '--task-default-text': string;
    '--task-default-border': string;
    '--task-theme-0-bg': string;
    '--task-theme-0-text': string;
    '--task-theme-0-border': string;
    '--task-theme-1-bg': string;
    '--task-theme-1-text': string;
    '--task-theme-1-border': string;
    '--task-theme-2-bg': string;
    '--task-theme-2-text': string;
    '--task-theme-2-border': string;
    '--task-theme-3-bg': string;
    '--task-theme-3-text': string;
    '--task-theme-3-border': string;
    '--task-theme-4-bg': string;
    '--task-theme-4-text': string;
    '--task-theme-4-border': string;
    '--task-theme-5-bg': string;
    '--task-theme-5-text': string;
    '--task-theme-5-border': string;
  };
}

export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
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
      // Tasks
      '--task-strategy-bg': 'rgba(14, 165, 233, 0.2)',
      '--task-strategy-text': '#e0f2fe',
      '--task-strategy-border': 'rgba(56, 189, 248, 0.3)',
      '--task-design-bg': 'rgba(217, 70, 239, 0.2)',
      '--task-design-text': '#fae8ff',
      '--task-design-border': 'rgba(232, 121, 249, 0.3)',
      '--task-development-bg': 'rgba(16, 185, 129, 0.2)',
      '--task-development-text': '#d1fae5',
      '--task-development-border': 'rgba(52, 211, 153, 0.3)',
      '--task-content-bg': 'rgba(245, 158, 11, 0.2)',
      '--task-content-text': '#fef3c7',
      '--task-content-border': 'rgba(251, 191, 36, 0.3)',
      '--task-default-bg': 'rgba(156, 163, 175, 0.2)',
      '--task-default-text': '#e5e7eb',
      '--task-default-border': 'rgba(156, 163, 175, 0.3)',
      '--task-theme-0-bg': 'rgba(244, 63, 94, 0.2)',
      '--task-theme-0-text': '#ffe4e6',
      '--task-theme-0-border': 'rgba(251, 113, 133, 0.3)',
      '--task-theme-1-bg': 'rgba(20, 184, 166, 0.2)',
      '--task-theme-1-text': '#ccfbf1',
      '--task-theme-1-border': 'rgba(45, 212, 191, 0.3)',
      '--task-theme-2-bg': 'rgba(249, 115, 22, 0.2)',
      '--task-theme-2-text': '#ffedd5',
      '--task-theme-2-border': 'rgba(251, 146, 60, 0.3)',
      '--task-theme-3-bg': 'rgba(99, 102, 241, 0.2)',
      '--task-theme-3-text': '#e0e7ff',
      '--task-theme-3-border': 'rgba(129, 140, 248, 0.3)',
      '--task-theme-4-bg': 'rgba(132, 204, 22, 0.2)',
      '--task-theme-4-text': '#ecfccb',
      '--task-theme-4-border': 'rgba(163, 230, 53, 0.3)',
      '--task-theme-5-bg': 'rgba(139, 92, 246, 0.2)',
      '--task-theme-5-text': '#ede9fe',
      '--task-theme-5-border': 'rgba(167, 139, 250, 0.3)',
    },
  },
  {
    id: 'light',
    name: 'Light',
    colors: {
      '--color-background': '#F3F4F6',
      '--color-glass-bg': 'rgba(255, 255, 255, 0.6)',
      '--color-glass-border': 'rgba(0, 0, 0, 0.08)',
      '--color-text-primary': '#111827',
      '--color-text-secondary': '#4B5563',
      '--color-accent': '#111827',
      '--color-accent-text': '#FFFFFF',
      '--color-highlight': '#3B82F6',
      '--color-subtle-hover': 'rgba(0, 0, 0, 0.05)',
      '--color-weekend-shade': 'rgba(0, 0, 0, 0.04)',
      // Tasks
      '--task-strategy-bg': '#e0f2fe',
      '--task-strategy-text': '#0c4a6e',
      '--task-strategy-border': '#bae6fd',
      '--task-design-bg': '#fae8ff',
      '--task-design-text': '#701a75',
      '--task-design-border': '#f5d0fe',
      '--task-development-bg': '#d1fae5',
      '--task-development-text': '#065f46',
      '--task-development-border': '#a7f3d0',
      '--task-content-bg': '#fef3c7',
      '--task-content-text': '#92400e',
      '--task-content-border': '#fde68a',
      '--task-default-bg': '#e5e7eb',
      '--task-default-text': '#374151',
      '--task-default-border': '#d1d5db',
      '--task-theme-0-bg': '#ffe4e6',
      '--task-theme-0-text': '#9f1239',
      '--task-theme-0-border': '#fecdd3',
      '--task-theme-1-bg': '#ccfbf1',
      '--task-theme-1-text': '#134e4a',
      '--task-theme-1-border': '#99f6e4',
      '--task-theme-2-bg': '#ffedd5',
      '--task-theme-2-text': '#9a3412',
      '--task-theme-2-border': '#fed7aa',
      '--task-theme-3-bg': '#e0e7ff',
      '--task-theme-3-text': '#3730a3',
      '--task-theme-3-border': '#c7d2fe',
      '--task-theme-4-bg': '#ecfccb',
      '--task-theme-4-text': '#4d7c0f',
      '--task-theme-4-border': '#d9f99d',
      '--task-theme-5-bg': '#ede9fe',
      '--task-theme-5-text': '#5b21b6',
      '--task-theme-5-border': '#ddd6fe',
    },
  },
];