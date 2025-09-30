import type { Project, Category, CategoryStyle } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'STRATEGY', name: 'Strategy' },
  { id: 'DESIGN', name: 'Design' },
  { id: 'DEVELOPMENT', name: 'Development' },
  { id: 'CONTENT', name: 'Content' },
];

export const DEFAULT_CATEGORY_STYLES: { [key: string]: CategoryStyle } = {
  STRATEGY:    { container: 'bg-sky-500/20 border border-sky-400/30',      text: 'font-sans text-xs text-[var(--color-text-strategy)]' },
  DESIGN:      { container: 'bg-fuchsia-500/20 border border-fuchsia-400/30', text: 'font-sans text-xs text-[var(--color-text-design)]' },
  DEVELOPMENT: { container: 'bg-emerald-500/20 border border-emerald-400/30', text: 'font-sans text-xs text-[var(--color-text-development)]' },
  CONTENT:     { container: 'bg-amber-500/20 border border-amber-400/30',   text: 'font-sans text-xs text-[var(--color-text-content)]' },
  DEFAULT:     { container: 'bg-gray-500/20 border border-gray-400/30',   text: 'font-sans text-xs text-[var(--color-text-default)]' },
};

export const THEME_COLORS: CategoryStyle[] = [
  { container: 'bg-rose-500/20 border border-rose-400/30',      text: 'font-sans text-xs text-[var(--color-text-rose)]' },
  { container: 'bg-teal-500/20 border border-teal-400/30',      text: 'font-sans text-xs text-[var(--color-text-teal)]' },
  { container: 'bg-orange-500/20 border border-orange-400/30',    text: 'font-sans text-xs text-[var(--color-text-orange)]' },
  { container: 'bg-indigo-500/20 border border-indigo-400/30',  text: 'font-sans text-xs text-[var(--color-text-indigo)]' },
  { container: 'bg-lime-500/20 border border-lime-400/30',      text: 'font-sans text-xs text-[var(--color-text-lime)]' },
  { container: 'bg-violet-500/20 border border-violet-400/30',text: 'font-sans text-xs text-[var(--color-text-violet)]' },
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
      { id: 'ID_CONCEPT', name: 'Concepting' },
      { id: 'ID_REFINE', name: 'Refinement' },
      { id: 'ID_DELIVER', name: 'Delivery' },
    ],
    categoryStyles: {
      ID_RESEARCH: DEFAULT_CATEGORY_STYLES.STRATEGY,
      ID_CONCEPT: DEFAULT_CATEGORY_STYLES.DESIGN,
      ID_REFINE: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
      ID_DELIVER: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-id-1', name: 'Competitive Analysis', categoryId: 'ID_RESEARCH', startWeek: 1, duration: 2 },
      { id: 't-id-2', name: 'Brand Keywords & Voice', categoryId: 'ID_RESEARCH', startWeek: 1.5, duration: 1.5 },
      { id: 't-id-3', name: 'Moodboards (3 styles)', categoryId: 'ID_CONCEPT', startWeek: 3, duration: 1, isDeliverable: true },
      { id: 't-id-4', name: 'Logo Concepts (3 rounds)', categoryId: 'ID_CONCEPT', startWeek: 3.5, duration: 2.5 },
      { id: 't-id-5', name: 'Color Palette & Typography', categoryId: 'ID_CONCEPT', startWeek: 4, duration: 2 },
      { id: 't-id-6', name: 'Final Logo Selection', categoryId: 'ID_REFINE', startWeek: 6, duration: 1 },
      { id: 't-id-7', name: 'Feedback & Revisions', categoryId: 'ID_REFINE', startWeek: 6.5, duration: 1.5 },
      { id: 't-id-8', name: 'Brand Guidelines Document', categoryId: 'ID_DELIVER', startWeek: 8, duration: 1, isDeliverable: true },
      { id: 't-id-9', name: 'Final Asset Export & Delivery', categoryId: 'ID_DELIVER', startWeek: 8, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'Branding + Strategy',
    cost: 28000,
    totalWeeks: 10,
    categories: [
        { id: 'BS_DISCOVERY', name: 'Discovery' },
        { id: 'BS_STRATEGY', name: 'Strategy' },
        { id: 'BS_IDENTITY', name: 'Visual Identity' },
        { id: 'BS_ROLLOUT', name: 'Rollout' },
    ],
    categoryStyles: {
        BS_DISCOVERY: DEFAULT_CATEGORY_STYLES.STRATEGY,
        BS_STRATEGY: THEME_COLORS[1],
        BS_IDENTITY: DEFAULT_CATEGORY_STYLES.DESIGN,
        BS_ROLLOUT: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-bs-1', name: 'Stakeholder Workshops', categoryId: 'BS_DISCOVERY', startWeek: 1, duration: 1.5 },
      { id: 't-bs-2', name: 'Audience Personas', categoryId: 'BS_DISCOVERY', startWeek: 2, duration: 2 },
      { id: 't-bs-3', name: 'Market Research Report', categoryId: 'BS_STRATEGY', startWeek: 2.5, duration: 2.5, isDeliverable: true },
      { id: 't-bs-4', name: 'Brand Positioning', categoryId: 'BS_STRATEGY', startWeek: 5, duration: 1 },
      { id: 't-bs-5', name: 'Messaging Framework', categoryId: 'BS_STRATEGY', startWeek: 5.5, duration: 2, isDeliverable: true },
      { id: 't-bs-6', name: 'Visual Moodboarding', categoryId: 'BS_IDENTITY', startWeek: 6, duration: 2 },
      { id: 't-bs-7', name: 'Logo & Identity System Design', categoryId: 'BS_IDENTITY', startWeek: 7, duration: 3 },
      { id: 't-bs-8', name: 'Comprehensive Brand Guidelines', categoryId: 'BS_IDENTITY', startWeek: 9, duration: 2, isDeliverable: true },
      { id: 't-bs-9', name: 'Key Visual Mockups (Website, Social)', categoryId: 'BS_ROLLOUT', startWeek: 9.5, duration: 1.5, isDeliverable: true },
    ],
  },
  {
    name: 'Landing Page',
    cost: 12000,
    totalWeeks: 6,
    categories: [
        { id: 'LP_PLAN', name: 'Planning' },
        { id: 'LP_DESIGN', name: 'Design' },
        { id: 'LP_DEV', name: 'Development' },
        { id: 'LP_LAUNCH', name: 'Launch' },
    ],
    categoryStyles: {
        LP_PLAN: DEFAULT_CATEGORY_STYLES.STRATEGY,
        LP_DESIGN: DEFAULT_CATEGORY_STYLES.DESIGN,
        LP_DEV: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
        LP_LAUNCH: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-lp-1', name: 'Goal Definition & User Journey', categoryId: 'LP_PLAN', startWeek: 1, duration: 1 },
      { id: 't-lp-2', name: 'Wireframing & Prototyping', categoryId: 'LP_DESIGN', startWeek: 1.5, duration: 1.5, isDeliverable: true },
      { id: 't-lp-3', name: 'Copywriting & Content Strategy', categoryId: 'LP_PLAN', startWeek: 2, duration: 2 },
      { id: 't-lp-4', name: 'UI & Visual Design System', categoryId: 'LP_DESIGN', startWeek: 3, duration: 2, isDeliverable: true },
      { id: 't-lp-5', name: 'Webflow/Framer Build', categoryId: 'LP_DEV', startWeek: 4, duration: 2.5 },
      { id: 't-lp-6', name: 'Animations & Interactions', categoryId: 'LP_DEV', startWeek: 5, duration: 1.5 },
      { id: 't-lp-7', name: 'SEO Setup & QA Testing', categoryId: 'LP_LAUNCH', startWeek: 6, duration: 1 },
      { id: 't-lp-8', name: 'Go-live & Deployment', categoryId: 'LP_LAUNCH', startWeek: 6.5, duration: 0.5, isDeliverable: true },
    ],
  },
  {
    name: 'Ecommerce Website',
    cost: 55000,
    totalWeeks: 14,
    categories: [
        { id: 'EC_FOUNDATION', name: 'Foundation' },
        { id: 'EC_UXUI', name: 'UX/UI Design' },
        { id: 'EC_DEV', name: 'Development' },
        { id: 'EC_CONTENT', name: 'Content & Launch' },
    ],
    categoryStyles: {
        EC_FOUNDATION: DEFAULT_CATEGORY_STYLES.STRATEGY,
        EC_UXUI: DEFAULT_CATEGORY_STYLES.DESIGN,
        EC_DEV: DEFAULT_CATEGORY_STYLES.DEVELOPMENT,
        EC_CONTENT: DEFAULT_CATEGORY_STYLES.CONTENT,
    },
    tasks: [
      { id: 't-ec-1', name: 'Discovery & Tech Stack Plan', categoryId: 'EC_FOUNDATION', startWeek: 1, duration: 2, isDeliverable: true },
      { id: 't-ec-2', name: 'Product Architecture & User Flows', categoryId: 'EC_FOUNDATION', startWeek: 2, duration: 2 },
      { id: 't-ec-3', name: 'Wireframes (PLP, PDP, Cart, Checkout)', categoryId: 'EC_UXUI', startWeek: 4, duration: 3, isDeliverable: true },
      { id: 't-ec-4', name: 'UI Kit & Page Designs', categoryId: 'EC_UXUI', startWeek: 6, duration: 4, isDeliverable: true },
      { id: 't-ec-5', name: 'Shopify Theme Development', categoryId: 'EC_DEV', startWeek: 7, duration: 6 },
      { id: 't-ec-6', name: 'Custom Section & App Integrations', categoryId: 'EC_DEV', startWeek: 10, duration: 4 },
      { id: 't-ec-7', name: 'Product Photography & Copy', categoryId: 'EC_CONTENT', startWeek: 8, duration: 4 },
      { id: 't-ec-8', name: 'Data Migration & Setup', categoryId: 'EC_CONTENT', startWeek: 12, duration: 2 },
      { id: 't-ec-9', name: 'User Acceptance Testing (UAT)', categoryId: 'EC_DEV', startWeek: 13, duration: 2 },
      { id: 't-ec-10', name: 'Final QA & Go-live Support', categoryId: 'EC_CONTENT', startWeek: 14, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'Marketing Campaign',
    cost: 20000,
    totalWeeks: 6,
    categories: [
        { id: 'MC_STRATEGY', name: 'Strategy' },
        { id: 'MC_CREATIVE', name: 'Creative Production' },
        { id: 'MC_EXEC', name: 'Execution' },
    ],
    categoryStyles: {
        MC_STRATEGY: DEFAULT_CATEGORY_STYLES.STRATEGY,
        MC_CREATIVE: DEFAULT_CATEGORY_STYLES.DESIGN,
        MC_EXEC: THEME_COLORS[2],
    },
    tasks: [
      { id: 't-mc-1', name: 'Campaign Goals & KPIs', categoryId: 'MC_STRATEGY', startWeek: 1, duration: 1, isDeliverable: true },
      { id: 't-mc-2', name: 'Target Audience & Channel Plan', categoryId: 'MC_STRATEGY', startWeek: 1.5, duration: 1.5 },
      { id: 't-mc-3', name: 'Core Messaging & Ad Copy', categoryId: 'MC_STRATEGY', startWeek: 2, duration: 2 },
      { id: 't-mc-4', name: 'Creative Concepts & Storyboards', categoryId: 'MC_CREATIVE', startWeek: 3, duration: 1.5, isDeliverable: true },
      { id: 't-mc-5', name: 'Ad Visuals (Static & Video)', categoryId: 'MC_CREATIVE', startWeek: 4, duration: 2, isDeliverable: true },
      { id: 't-mc-6', name: 'Landing Page Build (if needed)', categoryId: 'MC_EXEC', startWeek: 4.5, duration: 1.5 },
      { id: 't-mc-7', name: 'Campaign Setup & A/B Testing', categoryId: 'MC_EXEC', startWeek: 5.5, duration: 1.5 },
      { id: 't-mc-8', name: 'Launch, Monitoring & Reporting', categoryId: 'MC_EXEC', startWeek: 6, duration: 1, isDeliverable: true },
    ],
  },
];