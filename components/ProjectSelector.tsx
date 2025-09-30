import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { Project } from '../types';
import { EditableText } from './EditableText';
import { PROJECT_TEMPLATES } from '../constants';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onAddProject: () => void;
  onAddProjectFromTemplate: (templateName: string) => void;
  onProjectNameChange: (id: string, newName: string) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, selectedProjectId, onSelectProject, onAddProject, onAddProjectFromTemplate, onProjectNameChange, onDeleteProject }) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = () => {
    if (!isAddMenuOpen && addButtonRef.current) {
        const rect = addButtonRef.current.getBoundingClientRect();
        setMenuPosition({
            top: rect.bottom + 8, // 8px margin
            left: rect.left,
        });
    }
    setIsAddMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isAddMenuOpen &&
        addMenuRef.current && 
        !addMenuRef.current.contains(event.target as Node) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target as Node)
      ) {
        setIsAddMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAddMenuOpen]);

  const menuContent = (
    <div 
        ref={addMenuRef}
        style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
        className="fixed w-48 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-xl p-1.5 shadow-2xl z-[9999] animate-fade-in"
    >
        <ul className="flex flex-col gap-1">
            <li>
                <button
                onClick={() => { onAddProject(); setIsAddMenuOpen(false); }}
                className="w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors text-text-primary hover:bg-subtle-hover"
                >
                New Blank Scope
                </button>
            </li>
            <li><div className="h-px bg-glass-border my-1"></div></li>
            {PROJECT_TEMPLATES.map(template => (
                <li key={template.name}>
                <button
                    onClick={() => { onAddProjectFromTemplate(template.name); setIsAddMenuOpen(false); }}
                    className="w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors text-text-primary hover:bg-subtle-hover"
                >
                    {template.name}
                </button>
                </li>
            ))}
        </ul>
    </div>
  );

  return (
      <div className="flex flex-wrap gap-2 items-center">
        {projects.map(project => (
          <div key={project.id} className="relative group">
            <button
              onClick={() => onSelectProject(project.id)}
              className={`project-selector-button h-10 px-4 py-2 text-sm font-sans rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-highlight
                ${selectedProjectId === project.id 
                  ? 'bg-accent text-accent-text' 
                  : 'text-text-secondary hover:bg-subtle-hover hover:text-text-primary'
                }`}
            >
              <EditableText 
                value={project.name}
                onChange={(newName) => onProjectNameChange(project.id, newName)}
                tag="span"
                className="outline-none"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
              className="presentation-hide absolute -top-1 -right-1 w-5 h-5 bg-glass-bg text-text-primary rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 z-10 hover:bg-red-500 hover:text-white"
              aria-label={`Delete ${project.name}`}
            >
              &times;
            </button>
          </div>
        ))}
        <div className="relative">
          <button 
            ref={addButtonRef}
            onClick={toggleMenu}
            className="presentation-hide w-10 h-10 flex items-center justify-center text-xl font-sans border border-glass-border rounded-full text-text-secondary hover:bg-subtle-hover hover:border-white/20 transition-colors"
            aria-label="Add new project scope"
            aria-haspopup="true"
            aria-expanded={isAddMenuOpen}
          >
            +
          </button>
           {isAddMenuOpen && ReactDOM.createPortal(menuContent, document.body)}
        </div>
      </div>
  );
};