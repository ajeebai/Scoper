
import type { Project, Category, CategoryStyle } from './types';

export const CATEGORIES: Category[] = [
  { id: 'STRATEGY', name: 'Strategy' },
  { id: 'DESIGN', name: 'Design' },
  { id: 'DEVELOPMENT', name: 'Development' },
  { id: 'CONTENT', name: 'Content' },
];

export const CATEGORY_STYLES: { [key: string]: CategoryStyle } = {
  STRATEGY:    { container: 'bg-sky-500/20 border border-sky-400/30',      text: 'font-sans text-xs text-sky-200' },
  DESIGN:      { container: 'bg-fuchsia-500/20 border border-fuchsia-400/30', text: 'font-sans text-xs text-fuchsia-200' },
  DEVELOPMENT: { container: 'bg-emerald-500/20 border border-emerald-400/30', text: 'font-sans text-xs text-emerald-200' },
  CONTENT:     { container: 'bg-amber-500/20 border border-amber-400/30',   text: 'font-sans text-xs text-amber-200' },
  DEFAULT:     { container: 'bg-gray-500/20 border border-gray-400/30',   text: 'font-sans text-xs text-gray-200' },
};

export const THEME_COLORS: CategoryStyle[] = [
  { container: 'bg-rose-500/20 border border-rose-400/30',      text: 'font-sans text-xs text-rose-200' },
  { container: 'bg-teal-500/20 border border-teal-400/30',      text: 'font-sans text-xs text-teal-200' },
  { container: 'bg-orange-500/20 border border-orange-400/30',    text: 'font-sans text-xs text-orange-200' },
  { container: 'bg-indigo-500/20 border border-indigo-400/30',  text: 'font-sans text-xs text-indigo-200' },
  { container: 'bg-lime-500/20 border border-lime-400/30',      text: 'font-sans text-xs text-lime-200' },
  { container: 'bg-violet-500/20 border border-violet-400/30',text: 'font-sans text-xs text-violet-200' },
];

export const PROJECTS: Project[] = [
  {
    id: 'identity-landing-interactive',
    name: 'Identity + Landing',
    cost: 25000,
    totalWeeks: 12,
    tasks: [
      { id: 'il-1', name: 'Workshops & Kick-off', categoryId: 'STRATEGY', startWeek: 1, duration: 1 },
      { id: 'il-2', name: 'Market Research', categoryId: 'STRATEGY', startWeek: 2, duration: 2 },
      { id: 'il-3', name: 'Positioning & Strategy Deck', categoryId: 'STRATEGY', startWeek: 4, duration: 1, isDeliverable: true },
      
      { id: 'il-4', name: 'Moodboarding', categoryId: 'DESIGN', startWeek: 3, duration: 2 },
      { id: 'il-5', name: 'Visual Identity Concepts', categoryId: 'DESIGN', startWeek: 5, duration: 2 },
      { id: 'il-6', name: 'Brand Guidelines', categoryId: 'DESIGN', startWeek: 7, duration: 2, isDeliverable: true },

      { id: 'il-7', name: 'UX Wireframes', categoryId: 'DESIGN', startWeek: 7, duration: 2 },
      { id: 'il-8', name: 'UI Design', categoryId: 'DESIGN', startWeek: 9, duration: 2, isDeliverable: true },
      
      { id: 'il-9', name: 'Webflow Development', categoryId: 'DEVELOPMENT', startWeek: 9, duration: 3 },
      { id: 'il-10', name: 'QA & Launch', categoryId: 'DEVELOPMENT', startWeek: 12, duration: 1, isDeliverable: true },
      
      { id: 'il-11', name: 'Website Copywriting', categoryId: 'CONTENT', startWeek: 8, duration: 3 },
    ],
  },
];

export const PROJECT_TEMPLATES: Omit<Project, 'id'>[] = [
  {
    name: 'Visual Identity',
    cost: 12000,
    totalWeeks: 6,
    tasks: [
      { id: 't-vi-1', name: 'Discovery Call', categoryId: 'STRATEGY', startWeek: 1, duration: 0.5 },
      { id: 't-vi-2', name: 'Moodboards & Direction', categoryId: 'DESIGN', startWeek: 1, duration: 1.5 },
      { id: 't-vi-3', name: 'Logo Concepts', categoryId: 'DESIGN', startWeek: 3, duration: 1 },
      { id: 't-vi-4', name: 'Identity Refinement', categoryId: 'DESIGN', startWeek: 4, duration: 1 },
      { id: 't-vi-5', name: 'Final Styleguide', categoryId: 'DESIGN', startWeek: 5, duration: 2, isDeliverable: true },
      { id: 't-vi-6', name: 'Asset Export', categoryId: 'DESIGN', startWeek: 6, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'Brand Strategy & Identity',
    cost: 20000,
    totalWeeks: 8,
    tasks: [
      { id: 't-bsi-1', name: 'Brand Workshops', categoryId: 'STRATEGY', startWeek: 1, duration: 1 },
      { id: 't-bsi-2', name: 'Market & Audience Research', categoryId: 'STRATEGY', startWeek: 2, duration: 2 },
      { id: 't-bsi-3', name: 'Strategy Deck', categoryId: 'STRATEGY', startWeek: 4, duration: 1, isDeliverable: true },
      { id: 't-bsi-4', name: 'Visual Identity Concepts', categoryId: 'DESIGN', startWeek: 4, duration: 2, isDeliverable: true },
      { id: 't-bsi-5', name: 'Full Brand Guidelines', categoryId: 'DESIGN', startWeek: 6, duration: 3, isDeliverable: true },
    ],
  },
  {
    name: 'Landing Page',
    cost: 15000,
    totalWeeks: 7,
    tasks: [
      { id: 't-lp-1', name: 'Strategy & Discovery', categoryId: 'STRATEGY', startWeek: 1, duration: 1 },
      { id: 't-lp-1b', name: 'UX Wireframes', categoryId: 'DESIGN', startWeek: 2, duration: 1, isDeliverable: true },
      { id: 't-lp-2', name: 'Copywriting', categoryId: 'CONTENT', startWeek: 2, duration: 2 },
      { id: 't-lp-3', name: 'UI Design', categoryId: 'DESIGN', startWeek: 3, duration: 2, isDeliverable: true },
      { id: 't-lp-4', name: 'Framer/Webflow Dev', categoryId: 'DEVELOPMENT', startWeek: 5, duration: 2 },
      { id: 't-lp-5', name: 'SEO Setup & Launch', categoryId: 'DEVELOPMENT', startWeek: 7, duration: 1, isDeliverable: true },
    ],
  },
  {
    name: 'E-commerce Build',
    cost: 40000,
    totalWeeks: 12,
    tasks: [
      { id: 't-ec-1', name: 'Discovery & Strategy', categoryId: 'STRATEGY', startWeek: 1, duration: 2, isDeliverable: true },
      { id: 't-ec-2', name: 'UX Flows & Wireframes', categoryId: 'DESIGN', startWeek: 3, duration: 2, isDeliverable: true },
      { id: 't-ec-3', name: 'UI Design System', categoryId: 'DESIGN', startWeek: 5, duration: 3, isDeliverable: true },
      { id: 't-ec-4', name: 'Shopify Development', categoryId: 'DEVELOPMENT', startWeek: 6, duration: 5 },
      { id: 't-ec-5', name: 'Product Import & CMS Setup', categoryId: 'CONTENT', startWeek: 8, duration: 2 },
      { id: 't-ec-6', name: 'App Integrations', categoryId: 'DEVELOPMENT', startWeek: 10, duration: 1 },
      { id: 't-ec-7', name: 'QA & Launch', categoryId: 'DEVELOPMENT', startWeek: 11, duration: 2, isDeliverable: true },
    ],
  },
];
