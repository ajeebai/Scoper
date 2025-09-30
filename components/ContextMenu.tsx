import React, { useEffect, useRef } from 'react';

export interface ContextMenuItem {
  label: string;
  action: () => void;
  isDestructive?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const menuStyle: React.CSSProperties = {
    top: `${y}px`,
    left: `${x}px`,
  };

  return (
    <div
      ref={menuRef}
      style={menuStyle}
      className="fixed z-50 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-xl p-1.5 shadow-2xl animate-fade-in"
    >
      <ul className="flex flex-col gap-1 w-48">
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                item.action();
                onClose();
              }}
              className={`w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${
                item.isDestructive
                  ? 'text-red-400 hover:bg-red-500/20'
                  : 'text-text-primary hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};