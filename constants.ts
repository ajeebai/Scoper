import type { Project, Category, CategoryStyle } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'STRATEGY', name: 'Strategy' },
  { id: 'DESIGN', name: 'Design' },
  { id: 'DEVELOPMENT', name: 'Develop' },
  { id: 'CONTENT', name: 'Content' },
];

export const DEFAULT_CATEGORY_STYLES: { [key: string]: CategoryStyle } = {
  STRATEGY:    { container: 'bg-[var(--task-strategy-bg)] border border-[var(--task-strategy-border)]',      text: 'font-sans text-xs text-[var(--task-strategy-text)]' },
  DESIGN:      { container: 'bg-[var(--task-design-bg)] border border-[var(--task-design-border)]', text: 'font-sans text-xs text-[var(--task-design-text)]' },
  DEVELOPMENT: { container: 'bg-[var(--task-development-bg)] border border-[var(--task-development-border)]', text: 'font-sans text-xs text-[var(--task-development-text)]' },
  CONTENT:     { container: 'bg-[var(--task-content-bg)] border border-[var(--task-content-border)]',   text: 'font-sans text-xs text-[var(--task-content-text)]' },
  DEFAULT:     { container: 'bg-[var(--task-default-bg)] border border-[var(--task-default-border)]',   text: 'font-sans text-xs text-[var(--task-default-text)]' },
};

export const THEME_COLORS: CategoryStyle[] = [
  { container: 'bg-[var(--task-theme-0-bg)] border border-[var(--task-theme-0-border)]', text: 'font-sans text-xs text-[var(--task-theme-0-text)]' },
  { container: 'bg-[var(--task-theme-1-bg)] border border-[var(--task-theme-1-border)]', text: 'font-sans text-xs text-[var(--task-theme-1-text)]' },
  { container: 'bg-[var(--task-theme-2-bg)] border border-[var(--task-theme-2-border)]', text: 'font-sans text-xs text-[var(--task-theme-2-text)]' },
  { container: 'bg-[var(--task-theme-3-bg)] border border-[var(--task-theme-3-border)]', text: 'font-sans text-xs text-[var(--task-theme-3-text)]' },
  { container: 'bg-[var(--task-theme-4-bg)] border border-[var(--task-theme-4-border)]', text: 'font-sans text-xs text-[var(--task-theme-4-text)]' },
  { container: 'bg-[var(--task-theme-5-bg)] border border-[var(--task-theme-5-border)]', text: 'font-sans text-xs text-[var(--task-theme-5-text)]' },
];

export const PROJECTS: Project[] = [
  {
    id: 'project-initial',
    name: 'New Scope',
    cost: 5000,
    totalWeeks: 4,
    tasks: [],
    categories: DEFAULT_CATEGORIES,
    categoryStyles: DEFAULT_CATEGORY_STYLES,
  },
];

export const PROJECT_TEMPLATES: Omit<Project, 'id'>[] = [
  {
    name: 'Identity',
    cost: 15000,
    totalWeeks: 8,
    categories: [
      { id: 'ID_RESEARCH', name: 'Research' },
      { id: 'ID_CONCEPT', name: 'Concept' },
      { id: 'ID_REFINE', name: 'Refine' },
      { id: 'ID_DELIVER', name: 'Deliver' },
    ],
    categoryStyles: {
      ID_RESEARCH: DEFAULT_CATEGORY_STYLES.STRATEGY,
      ID_CONCEPT: DEFAULT_CATEGORY_STYLES.DESIGN,
      ID_REFINE: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
      ID_DELIVER: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-id-1', name: 'Analysis', categoryId: 'ID_RESEARCH', startWeek: 1, duration: 2 },
      { id: 't-id-2', name: 'Keywords', categoryId: 'ID_RESEARCH', startWeek: 1.5, duration: 1.5 },
      { id: 't-id-3', name: 'Moodboards', categoryId: 'ID_CONCEPT', startWeek: 3, duration: 1, isDeliverable: true },
      { id: 't-id-4', name: 'Logo Concepts', categoryId: 'ID_CONCEPT', startWeek: 3.5, duration: 2.5 },
      { id: 't-id-5', name: 'Colors & Type', categoryId: 'ID_CONCEPT', startWeek: 4, duration: 2 },
      { id: 't-id-6', name: 'Logo Selection', categoryId: 'ID_REFINE', startWeek: 6, duration: 1 },
      { id: 't-id-7', name: 'Revisions', categoryId: 'ID_REFINE', startWeek: 6.5, duration: 1.5 },
      { id: 't-id-8', name: 'Guidelines', categoryId: 'ID_DELIVER', startWeek: 8, duration: 1, isDeliverable: true },
      { id: 't-id-9', name: 'Asset Delivery', categoryId: 'ID_DELIVER', startWeek: 8, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'Brand Strategy',
    cost: 28000,
    totalWeeks: 10,
    categories: [
        { id: 'BS_DISCOVERY', name: 'Discovery' },
        { id: 'BS_STRATEGY', name: 'Strategy' },
        { id: 'BS_IDENTITY', name: 'Identity' },
        { id: 'BS_ROLLOUT', name: 'Rollout' },
    ],
    categoryStyles: {
        BS_DISCOVERY: DEFAULT_CATEGORY_STYLES.STRATEGY,
        BS_STRATEGY: THEME_COLORS[1],
        BS_IDENTITY: DEFAULT_CATEGORY_STYLES.DESIGN,
        BS_ROLLOUT: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-bs-1', name: 'Workshops', categoryId: 'BS_DISCOVERY', startWeek: 1, duration: 1.5 },
      { id: 't-bs-2', name: 'Personas', categoryId: 'BS_DISCOVERY', startWeek: 2, duration: 2 },
      { id: 't-bs-3', name: 'Research', categoryId: 'BS_STRATEGY', startWeek: 2.5, duration: 2.5, isDeliverable: true },
      { id: 't-bs-4', name: 'Positioning', categoryId: 'BS_STRATEGY', startWeek: 5, duration: 1 },
      { id: 't-bs-5', name: 'Messaging', categoryId: 'BS_STRATEGY', startWeek: 5.5, duration: 2, isDeliverable: true },
      { id: 't-bs-6', name: 'Moodboards', categoryId: 'BS_IDENTITY', startWeek: 6, duration: 2 },
      { id: 't-bs-7', name: 'Identity Design', categoryId: 'BS_IDENTITY', startWeek: 7, duration: 3 },
      { id: 't-bs-8', name: 'Guidelines', categoryId: 'BS_IDENTITY', startWeek: 9, duration: 2, isDeliverable: true },
      { id: 't-bs-9', name: 'Mockups', categoryId: 'BS_ROLLOUT', startWeek: 9.5, duration: 1.5, isDeliverable: true },
    ],
  },
  {
    name: 'Landing Page',
    cost: 12000,
    totalWeeks: 6,
    categories: [
        { id: 'LP_PLAN', name: 'Plan' },
        { id: 'LP_DESIGN', name: 'Design' },
        { id: 'LP_DEV', name: 'Develop' },
        { id: 'LP_LAUNCH', name: 'Launch' },
    ],
    categoryStyles: {
        LP_PLAN: DEFAULT_CATEGORY_STYLES.STRATEGY,
        LP_DESIGN: DEFAULT_CATEGORY_STYLES.DESIGN,
        LP_DEV: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
        LP_LAUNCH: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-lp-1', name: 'Goals & Journey', categoryId: 'LP_PLAN', startWeek: 1, duration: 1 },
      { id: 't-lp-2', name: 'Wireframes', categoryId: 'LP_DESIGN', startWeek: 1.5, duration: 1.5, isDeliverable: true },
      { id: 't-lp-3', name: 'Copywriting', categoryId: 'LP_PLAN', startWeek: 2, duration: 2 },
      { id: 't-lp-4', name: 'UI Design', categoryId: 'LP_DESIGN', startWeek: 3, duration: 2, isDeliverable: true },
      { id: 't-lp-5', name: 'Build', categoryId: 'LP_DEV', startWeek: 4, duration: 2.5 },
      { id: 't-lp-6', name: 'Animations', categoryId: 'LP_DEV', startWeek: 5, duration: 1.5 },
      { id: 't-lp-7', name: 'SEO & QA', categoryId: 'LP_LAUNCH', startWeek: 6, duration: 1 },
      { id: 't-lp-8', name: 'Deployment', categoryId: 'LP_LAUNCH', startWeek: 6.5, duration: 0.5, isDeliverable: true },
    ],
  },
  {
    name: 'E-commerce',
    cost: 55000,
    totalWeeks: 14,
    categories: [
        { id: 'EC_SETUP', name: 'Setup' },
        { id: 'EC_UXUI', name: 'UX/UI' },
        { id: 'EC_DEV', name: 'Develop' },
        { id: 'EC_CONTENT', name: 'Launch' },
    ],
    categoryStyles: {
        EC_SETUP: DEFAULT_CATEGORY_STYLES.STRATEGY,
        EC_UXUI: DEFAULT_CATEGORY_STYLES.DESIGN,
        EC_DEV: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
        EC_CONTENT: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-ec-1', name: 'Discovery', categoryId: 'EC_SETUP', startWeek: 1, duration: 2, isDeliverable: true },
      { id: 't-ec-2', name: 'User Flows', categoryId: 'EC_SETUP', startWeek: 2, duration: 2 },
      { id: 't-ec-3', name: 'Wireframes', categoryId: 'EC_UXUI', startWeek: 4, duration: 3, isDeliverable: true },
      { id: 't-ec-4', name: 'UI Design', categoryId: 'EC_UXUI', startWeek: 6, duration: 4, isDeliverable: true },
      { id: 't-ec-5', name: 'Theme Dev', categoryId: 'EC_DEV', startWeek: 7, duration: 6 },
      { id: 't-ec-6', name: 'Integrations', categoryId: 'EC_DEV', startWeek: 10, duration: 4 },
      { id: 't-ec-7', name: 'Photos & Copy', categoryId: 'EC_CONTENT', startWeek: 8, duration: 4 },
      { id: 't-ec-8', name: 'Data Migration', categoryId: 'EC_CONTENT', startWeek: 12, duration: 2 },
      { id: 't-ec-9', name: 'UAT', categoryId: 'EC_DEV', startWeek: 13, duration: 2 },
      { id: 't-ec-10', name: 'Go-live', categoryId: 'EC_CONTENT', startWeek: 14, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'Marketing',
    cost: 20000,
    totalWeeks: 6,
    categories: [
        { id: 'MC_STRATEGY', name: 'Strategy' },
        { id: 'MC_CREATIVE', name: 'Creative' },
        { id: 'MC_EXEC', name: 'Execute' },
    ],
    categoryStyles: {
        MC_STRATEGY: DEFAULT_CATEGORY_STYLES.STRATEGY,
        MC_CREATIVE: DEFAULT_CATEGORY_STYLES.DESIGN,
        MC_EXEC: THEME_COLORS[2],
    },
    tasks: [
      { id: 't-mc-1', name: 'Goals & KPIs', categoryId: 'MC_STRATEGY', startWeek: 1, duration: 1, isDeliverable: true },
      { id: 't-mc-2', name: 'Audience Plan', categoryId: 'MC_STRATEGY', startWeek: 1.5, duration: 1.5 },
      { id: 't-mc-3', name: 'Ad Copy', categoryId: 'MC_STRATEGY', startWeek: 2, duration: 2 },
      { id: 't-mc-4', name: 'Concepts', categoryId: 'MC_CREATIVE', startWeek: 3, duration: 1.5, isDeliverable: true },
      { id: 't-mc-5', name: 'Ad Visuals', categoryId: 'MC_CREATIVE', startWeek: 4, duration: 2, isDeliverable: true },
      { id: 't-mc-6', name: 'LP Build', categoryId: 'MC_EXEC', startWeek: 4.5, duration: 1.5 },
      { id: 't-mc-7', name: 'A/B Testing', categoryId: 'MC_EXEC', startWeek: 5.5, duration: 1.5 },
      { id: 't-mc-8', name: 'Launch', categoryId: 'MC_EXEC', startWeek: 6, duration: 1, isDeliverable: true },
    ],
  },
];