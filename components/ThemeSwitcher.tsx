import React, { useState, useRef, useEffect } from 'react';
import type { Theme } from '../themes';

interface ThemeSwitcherProps {
  themes: Theme[];
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
}

// Palette Icon
const PaletteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
);

const ThemePreview: React.FC<{ theme: Theme }> = ({ theme }) => (
    <div 
        className="w-10 h-6 rounded-md flex items-center justify-center overflow-hidden border border-white/10"
        style={{ backgroundColor: theme.previewColors.bg }}
    >
        <div className="flex items-center gap-0.5">
            <div className="w-2 h-4 rounded-sm" style={{ backgroundColor: theme.previewColors.highlight }}></div>
            <div className="w-3 h-4 rounded-sm" style={{ backgroundColor: theme.previewColors.accent }}></div>
        </div>
    </div>
);


export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themes, currentThemeId, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement>, close: () => void) => {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    close();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [ref, close]);
    }
    useOutsideAlerter(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-accent text-accent-text' : 'text-text-secondary hover:bg-subtle-hover hover:text-text-primary'}`}
                aria-label="Change theme"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <PaletteIcon className="w-5 h-5" />
            </button>
            {isOpen && (
                <div className="absolute top-12 right-0 bg-glass-bg border border-glass-border rounded-2xl p-2 flex flex-col gap-1.5 w-48 shadow-2xl animate-fade-in">
                    {themes.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => { onThemeChange(theme.id); setIsOpen(false); }}
                            className={`w-full h-10 px-3 flex items-center justify-between rounded-xl text-sm transition-colors ${currentThemeId === theme.id ? 'bg-accent text-accent-text' : 'text-text-primary hover:bg-subtle-hover'}`}
                        >
                            <span>{theme.name}</span>
                            <ThemePreview theme={theme} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}