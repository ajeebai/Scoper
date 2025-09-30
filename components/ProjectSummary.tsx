import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ProjectSummaryProps {
  duration: number;
  onDurationChange: (newDuration: number) => void;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ duration, onDurationChange }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevDurationRef = React.useRef(duration);
  const dragStartRef = useRef<{ initialX: number, initialDuration: number } | null>(null);

  useEffect(() => {
    if (prevDurationRef.current !== duration) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      prevDurationRef.current = duration;
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragStartRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.initialX;
    const weekChange = Math.round(deltaX / 20); // 20 pixels per week change
    const newDuration = dragStartRef.current.initialDuration + weekChange;
    
    // Clamp the value to between 1 and 16
    const clampedDuration = Math.min(16, Math.max(1, newDuration));

    if (clampedDuration !== duration) {
        onDurationChange(clampedDuration);
    }
  }, [duration, onDurationChange]);

  const handleMouseUp = useCallback(() => {
    dragStartRef.current = null;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    dragStartRef.current = {
      initialX: e.clientX,
      initialDuration: duration,
    };
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, { once: true });
  };
  
  return (
    <div className="text-left w-full">
        <div className="flex items-center mb-6">
            <p className="font-mono text-xs uppercase text-text-secondary">Project Time</p>
        </div>
      <div className="summary-value-container flex items-baseline gap-2 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter" aria-live="polite">
        <span
          onMouseDown={handleMouseDown}
          className={`summary-duration-value transition-all duration-300 inline-block outline-none cursor-ew-resize select-none ${isAnimating ? 'scale-110 text-highlight' : 'scale-100'}`}
          style={{ transitionProperty: 'transform, color' }}
          title="Drag horizontally to change duration"
        >
          {duration}
        </span>
        <span className="text-3xl sm:text-4xl lg:text-5xl text-text-secondary">
          {duration === 1 ? 'week' : 'weeks'}
        </span>
      </div>
    </div>
  );
};