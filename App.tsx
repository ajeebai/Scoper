
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CostDisplay } from './components/CostDisplay';
import { TimelineGrid } from './components/TimelineGrid';
import { ProjectSummary } from './components/ProjectSummary';
import { PROJECTS, THEME_COLORS, PROJECT_TEMPLATES, DEFAULT_CATEGORIES, DEFAULT_CATEGORY_STYLES } from './constants';
import type { Project, Task, Category, CategoryStyle } from './types';
import { EditableText } from './components/EditableText';
import { ProjectSelector } from './components/ProjectSelector';
import { Toolbar } from './components/Toolbar';
import { ContextMenu } from './components/ContextMenu';
import { themes } from './themes';

const STORAGE_KEY = 'interactiveScoperState';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);

  const project = useMemo(() => projects.find(p => p.id === selectedProjectId) || projects[0], [projects, selectedProjectId]);

  const [appText, setAppText] = useState({
    title: 'Interactive Project Scoper',
    subtitle: "Visually plan your projects, estimate costs, and create beautiful timelines."
  });
  
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR'>('USD');
  const [showPricePerDay, setShowPricePerDay] = useState(false);
  const [isSnapToGridEnabled, setIsSnapToGridEnabled] = useState(true);
  const [themeId, setThemeId] = useState<string>('default-dark');
  
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, task: Task } | null>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const savedStateJSON = localStorage.getItem(STORAGE_KEY);
    if (savedStateJSON) {
        try {
            const savedState = JSON.parse(savedStateJSON);
            if (savedState.projects && savedState.projects.length > 0) setProjects(savedState.projects);
            if (savedState.selectedProjectId) setSelectedProjectId(savedState.selectedProjectId);
            if (savedState.appText) setAppText(savedState.appText);
            if (savedState.currency) setCurrency(savedState.currency);
            if (savedState.themeId) setThemeId(savedState.themeId);
        } catch (e) {
            console.error("Failed to parse saved state, resetting.", e);
            localStorage.removeItem(STORAGE_KEY);
        }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
        projects,
        selectedProjectId,
        appText,
        currency,
        themeId,
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
        console.error("Failed to save state to localStorage", e);
    }
  }, [projects, selectedProjectId, appText, currency, themeId]);

  // Apply theme colors and background
  useEffect(() => {
    const selectedTheme = themes.find(t => t.id === themeId) || themes[0];
    const root = document.documentElement;
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    const backgroundElement = document.getElementById('app-background');
    if (backgroundElement) {
      backgroundElement.style.backgroundImage = selectedTheme.background;
    }
  }, [themeId]);

  const updateProject = useCallback((id: string, updateFn: (p: Project) => Project) => {
    setProjects(prevProjects => prevProjects.map(p => p.id === id ? updateFn(p) : p));
  }, []);

  const handleTaskUpdate = useCallback((taskId: string, updatedProperties: Partial<Task>) => {
    updateProject(selectedProjectId, p => ({
      ...p,
      tasks: p.tasks.map(t => t.id === taskId ? { ...t, ...updatedProperties } : t)
    }));
  }, [selectedProjectId, updateProject]);

  const handleAddTask = useCallback((categoryId: string, start: number) => {
    updateProject(selectedProjectId, p => {
      const isDayView = p.totalWeeks <= 2;
      const newTask: Task = {
        id: `task-${Date.now()}`,
        name: 'New Task',
        categoryId,
        startWeek: start,
        duration: isDayView ? (1/7) : 1, // 1 day for day view, 1 week for week view
        isDeliverable: false,
      };
      return { ...p, tasks: [...p.tasks, newTask] };
    });
  }, [selectedProjectId, updateProject]);
  
  const handleCostChange = (newCost: number) => {
    updateProject(selectedProjectId, p => ({ ...p, cost: newCost }));
  };

  const handleTotalWeeksChange = (newTotalWeeks: number) => {
    if (newTotalWeeks < 1) return;
    updateProject(selectedProjectId, p => ({ ...p, totalWeeks: newTotalWeeks }));
  };
  
  const handleAddProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: 'New Scope',
      tasks: [],
      cost: 5000,
      totalWeeks: 4,
      categories: DEFAULT_CATEGORIES,
      categoryStyles: DEFAULT_CATEGORY_STYLES,
    };
    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
  };

  const handleAddProjectFromTemplate = (templateName: string) => {
    const template = PROJECT_TEMPLATES.find(t => t.name === templateName);
    if (!template) return;

    const newProjectId = `project-${Date.now()}`;
    const newProject: Project = {
      ...template,
      id: newProjectId,
      tasks: template.tasks.map((task, index) => ({
        ...task,
        id: `task-${newProjectId}-${index}`
      }))
    };
    
    setProjects(prev => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
  };

  const handleProjectNameChange = (id: string, newName: string) => {
    updateProject(id, p => ({ ...p, name: newName }));
  };

  const handleDeleteProject = (idToDelete: string) => {
    const projectToDelete = projects.find(p => p.id === idToDelete);
    if (!projectToDelete) {
      return;
    }
  
    const templateNames = PROJECT_TEMPLATES.map(t => t.name);
    const isDefaultName = projectToDelete.name === 'New Scope' || templateNames.includes(projectToDelete.name);
  
    if (projects.length > 1 && !isDefaultName && !window.confirm(`Are you sure you want to delete "${projectToDelete.name}"?`)) {
      return;
    }
    
    setProjects(prevProjects => {
      const remainingProjects = prevProjects.filter(p => p.id !== idToDelete);
      
      if (remainingProjects.length > 0) {
        if (selectedProjectId === idToDelete) {
          setSelectedProjectId(remainingProjects[0].id);
        }
        return remainingProjects;
      } else {
        const newProject: Project = {
          id: `project-${Date.now()}`,
          name: 'New Scope',
          tasks: [],
          cost: 5000,
          totalWeeks: 4,
          categories: DEFAULT_CATEGORIES,
          categoryStyles: DEFAULT_CATEGORY_STYLES,
        };
        setSelectedProjectId(newProject.id);
        return [newProject];
      }
    });
  };

  const handleAddCategory = () => {
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return;
  
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: `New Stage`
    };
    
    const nextColor = THEME_COLORS[project.categories.length % THEME_COLORS.length];
    
    updateProject(selectedProjectId, p => ({
      ...p,
      categories: [...p.categories, newCategory],
      categoryStyles: {
        ...p.categoryStyles,
        [newCategory.id]: nextColor
      }
    }));
  };

  const handleCategoryNameChange = (id: string, newName: string) => {
    updateProject(selectedProjectId, p => ({
      ...p,
      categories: p.categories.map(c => c.id === id ? { ...c, name: newName } : c)
    }));
  };

  const handleTaskContextMenu = (event: React.MouseEvent, task: Task) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, task });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    updateProject(selectedProjectId, p => ({
        ...p,
        tasks: p.tasks.filter(t => t.id !== taskId)
    }));
  };

  if (!project) {
    // This case should ideally not happen if state is managed correctly
    const defaultProject = PROJECTS[0];
    if (projects.length === 0) {
        setProjects([defaultProject]);
    }
    setSelectedProjectId(defaultProject.id);
    return <div className="text-text-primary min-h-screen flex items-center justify-center">Loading or no project selected...</div>;
  }

  return (
    <div id="app-container" className="text-text-primary font-sans min-h-screen w-full flex flex-col px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
      <Toolbar 
        currency={currency}
        onCurrencyChange={setCurrency}
        showPricePerDay={showPricePerDay}
        onShowPricePerDayChange={setShowPricePerDay}
        isSnapToGridEnabled={isSnapToGridEnabled}
        onSnapToGridChange={setIsSnapToGridEnabled}
        currentThemeId={themeId}
        onThemeChange={setThemeId}
      />
      <main className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-screen-2xl text-left">
          <EditableText 
            tag="h1"
            value={appText.title}
            onChange={(newVal) => setAppText(prev => ({...prev, title: newVal}))}
            wrapperClassName="app-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          />
           <EditableText 
            tag="p"
            value={appText.subtitle}
            onChange={(newVal) => setAppText(prev => ({...prev, subtitle: newVal}))}
            wrapperClassName="app-subtitle"
            className="text-text-secondary mt-4 max-w-2xl"
          />
        </div>
        
        <div className="mt-12 sm:mt-16 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-3xl w-full max-w-screen-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {/* --- SCOPE OF WORK --- */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-6">
                 <p className="font-mono text-xs uppercase text-text-secondary">Scope of Work</p>
              </div>
              <ProjectSelector
                projects={projects}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
                onAddProject={handleAddProject}
                onAddProjectFromTemplate={handleAddProjectFromTemplate}
                onProjectNameChange={handleProjectNameChange}
                onDeleteProject={handleDeleteProject}
              />
            </div>

            {/* --- DIVIDER 1 --- */}
            <div className="hidden lg:block w-px bg-glass-border my-8"></div>

            {/* --- PROJECT TIME --- */}
            <div className="border-t lg:border-t-0 border-glass-border p-6 sm:p-8">
              <ProjectSummary duration={project.totalWeeks} onDurationChange={handleTotalWeeksChange} />
            </div>

            {/* --- DIVIDER 2 --- */}
            <div className="hidden lg:block w-px bg-glass-border my-8"></div>
            
            {/* --- PRICE --- */}
            <div className="border-t lg:border-t-0 border-glass-border p-6 sm:p-8">
               <CostDisplay 
                cost={project.cost} 
                onCostChange={handleCostChange}
                currency={currency}
                showPricePerDay={showPricePerDay}
                totalWeeks={project.totalWeeks}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-screen-2xl flex-grow relative">
          <TimelineGrid 
            project={project} 
            onTaskUpdate={handleTaskUpdate}
            onAddTask={handleAddTask}
            categories={project.categories}
            onCategoryNameChange={handleCategoryNameChange}
            onAddCategory={handleAddCategory}
            isSnapToGridEnabled={isSnapToGridEnabled}
            categoryStyles={project.categoryStyles}
            onTaskContextMenu={handleTaskContextMenu}
          />
        </div>
      </main>
      <footer className="w-full max-w-screen-2xl mx-auto mt-auto pt-8 grid grid-cols-3 items-center">
         <div className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors cursor-default">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3H21V21H3V3Z"/>
                <path d="M3 15C9.62742 15 15 9.62742 15 3"/>
            </svg>
            <span className="font-sans text-sm font-bold">Scoper</span>
         </div>
         <div className="text-center">
            <a href="https://buymeacoffee.com/notajeeb" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase text-text-secondary hover:text-text-primary transition-colors underline decoration-text-secondary/30 underline-offset-4">
              Buy me a coffee
            </a>
         </div>
         <div className="text-right">
            <a href="https://bykins.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase text-text-secondary hover:text-text-primary transition-colors underline decoration-text-secondary/30 underline-offset-4">
              Made by Kins
            </a>
         </div>
      </footer>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          items={[
            {
              label: contextMenu.task.isDeliverable ? 'Unmark as Deliverable' : 'Mark as Deliverable',
              action: () => handleTaskUpdate(contextMenu.task.id, { isDeliverable: !contextMenu.task.isDeliverable }),
            },
            {
              label: 'Delete Task',
              action: () => handleDeleteTask(contextMenu.task.id),
              isDestructive: true,
            },
          ]}
        />
      )}
    </div>
  );
};

export default App;