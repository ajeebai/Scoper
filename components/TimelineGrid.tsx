import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { Project, Task, Category, CategoryStyle } from '../types';
import { EditableText } from './EditableText';
import playSound from '../utils/audio';

interface TimelineGridProps {
  project: Project;
  onTaskUpdate: (taskId: string, updatedProperties: Partial<Task>) => void;
  onAddTask: (categoryId: string, startWeek: number) => void;
  categories: Category[];
  onCategoryNameChange: (id: string, newName: string) => void;
  onAddCategory: () => void;
  isSnapToGridEnabled: boolean;
  categoryStyles: { [key: string]: CategoryStyle };
  onTaskContextMenu: (event: React.MouseEvent, task: Task) => void;
}

interface DraggingInfo {
  type: 'move' | 'resize';
  task: Task;
  startX: number; // Initial mouse X
  startY: number; // Initial mouse Y
  initialStartWeek: number;
  initialDuration: number;
  initialCategoryId: string;
}

// --- ICONS --- //
const StarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);


const CategoryLabel: React.FC<{ 
  category: Category; 
  onNameChange: (newName: string) => void;
}> = ({ category, onNameChange }) => {
    return (
        <div className="h-full flex items-center justify-center border-b border-glass-border px-4 sticky left-0 bg-glass-bg/80 backdrop-blur-sm z-10">
            <EditableText
              tag="h3"
              value={category.name}
              onChange={onNameChange}
              containerIsFullHeight={false}
              className="font-sans text-sm text-text-secondary text-center"
            />
        </div>
    );
};

const TimelineHeader: React.FC<{ totalColumns: number; colWidth: number; isDayView: boolean }> = ({ totalColumns, colWidth, isDayView }) => {
  const columns = Array.from({ length: totalColumns });
  const labelPrefix = isDayView ? 'D' : 'W';

  return (
    <>
      {columns.map((_, i) => {
        return (
          <div key={`col-${i}`} className="text-center font-mono text-xs text-text-secondary p-2 border-b border-glass-border" style={{ minWidth: colWidth, flex: '1 0 0' }}>
            {`${labelPrefix}${i + 1}`}
          </div>
        )
      })}
    </>
  );
}

export const TimelineGrid: React.FC<TimelineGridProps> = ({ 
  project, onTaskUpdate, onAddTask, categories, 
  onCategoryNameChange, onAddCategory, isSnapToGridEnabled, categoryStyles, onTaskContextMenu
}) => {
  const [draggingInfo, setDraggingInfo] = useState<DraggingInfo | null>(null);
  const [transientTask, setTransientTask] = useState<Task | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null);
  const timelineAreaRef = useRef<HTMLDivElement>(null);
  const [colWidth, setColWidth] = useState(0);
  
  const isDayView = useMemo(() => project.totalWeeks <= 2, [project.totalWeeks]);
  const totalColumns = useMemo(() => isDayView ? project.totalWeeks * 7 : project.totalWeeks, [isDayView, project.totalWeeks]);
  const rowHeight = 72; // Increased row height for more vertical space

  useEffect(() => {
    const calculateColWidth = () => {
      if (timelineAreaRef.current) {
        setColWidth(timelineAreaRef.current.clientWidth / totalColumns);
      }
    };
    calculateColWidth();
    window.addEventListener('resize', calculateColWidth);
    return () => window.removeEventListener('resize', calculateColWidth);
  }, [totalColumns]);

  const categoryLayouts = useMemo(() => {
    const layouts: { [taskId: string]: { laneIndex: number; numLanes: number } } = {};
    
    categories.forEach((category) => {
        const categoryTasks = project.tasks
            .filter(t => t.categoryId === category.id)
            .sort((a, b) => a.startWeek - b.startWeek || a.duration - b.duration);

        const lanes: number[] = []; 

        categoryTasks.forEach(task => {
            let placed = false;
            for (let i = 0; i < lanes.length; i++) {
                if (task.startWeek >= lanes[i]) {
                    lanes[i] = task.startWeek + task.duration;
                    layouts[task.id] = { laneIndex: i, numLanes: 0 }; 
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                lanes.push(task.startWeek + task.duration);
                layouts[task.id] = { laneIndex: lanes.length - 1, numLanes: 0 };
            }
        });

        const numLanes = lanes.length || 1;
        categoryTasks.forEach(task => {
            if (layouts[task.id]) {
                layouts[task.id].numLanes = numLanes;
            }
        });
    });
    return layouts;
  }, [project.tasks, categories]);
  
  const handleMouseDown = (e: React.MouseEvent, task: Task, type: 'move' | 'resize') => {
      e.preventDefault();
      e.stopPropagation();
      playSound('drag');

      setDraggingInfo({ 
        type, 
        task, 
        startX: e.clientX,
        startY: e.clientY,
        initialStartWeek: task.startWeek,
        initialDuration: task.duration,
        initialCategoryId: task.categoryId,
      });
      setTransientTask(task);
  };
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!draggingInfo || colWidth <= 0) return;
      
      const { type, task, startX, startY, initialStartWeek, initialDuration, initialCategoryId } = draggingInfo;
      const deltaX = e.clientX - startX;
      
      let newTransientProps: Partial<Task> = {};
      const columnDelta = deltaX / colWidth;

      const getTaskInCols = (start: number, duration: number) => ({
          start: isDayView ? (start - 1) * 7 + 1 : start,
          duration: isDayView ? duration * 7 : duration,
      });
      const colsToTask = (start: number, duration: number) => ({
          startWeek: isDayView ? (start - 1) / 7 + 1 : start,
          duration: isDayView ? duration / 7 : duration,
      });

      if (type === 'move') {
        const initialTaskCols = getTaskInCols(initialStartWeek, initialDuration);
        let newStartCol = initialTaskCols.start + columnDelta;
        if (isSnapToGridEnabled) newStartCol = Math.round(newStartCol);
        
        const currentDurationCols = getTaskInCols(transientTask?.startWeek || initialStartWeek, transientTask?.duration || initialDuration).duration;
        newStartCol = Math.max(1, Math.min(newStartCol, totalColumns - currentDurationCols + 1));
        
        const { startWeek } = colsToTask(newStartCol, currentDurationCols);
        newTransientProps.startWeek = startWeek;

        const deltaY = e.clientY - startY;
        const rowDelta = Math.round(deltaY / rowHeight);
        const initialRowIndex = categories.findIndex(c => c.id === initialCategoryId);
        const newRowIndex = Math.max(0, Math.min(categories.length - 1, initialRowIndex + rowDelta));
        newTransientProps.categoryId = categories[newRowIndex].id;

      } else if (type === 'resize') {
          const initialTaskCols = getTaskInCols(initialStartWeek, initialDuration);
          let newDurationCol = initialTaskCols.duration + columnDelta;
          if (isSnapToGridEnabled) newDurationCol = Math.round(newDurationCol);
          
          const currentStartCols = getTaskInCols(transientTask?.startWeek || initialStartWeek, initialDuration).start;
          const minDuration = isSnapToGridEnabled ? 1 : (isDayView ? 0.2 * 7 : 0.2);
          const maxDuration = totalColumns - currentStartCols + 1;
          newDurationCol = Math.max(minDuration, Math.min(newDurationCol, maxDuration));
          
          const { duration } = colsToTask(currentStartCols, newDurationCol);
          newTransientProps.duration = duration;
      }
      
      setTransientTask(prev => prev ? { ...prev, ...newTransientProps } : null);

  }, [draggingInfo, totalColumns, colWidth, isSnapToGridEnabled, isDayView, rowHeight, transientTask, categories]);

  const handleMouseUp = useCallback(() => {
    if (draggingInfo && transientTask) {
      const { task } = draggingInfo;
      const hasChanged = 
        Math.abs(transientTask.startWeek - task.startWeek) > 0.01 ||
        Math.abs(transientTask.duration - task.duration) > 0.01 ||
        transientTask.categoryId !== task.categoryId;

      if (hasChanged) {
        playSound('drop');
        onTaskUpdate(task.id, {
          startWeek: transientTask.startWeek,
          duration: transientTask.duration,
          categoryId: transientTask.categoryId,
        });
      }
    }
    setDraggingInfo(null);
    setTransientTask(null);
  }, [draggingInfo, onTaskUpdate, transientTask]);

  useEffect(() => {
    if (draggingInfo) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp, { once: true });
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingInfo, handleMouseMove, handleMouseUp]);

  const isCellOccupied = useCallback((categoryId: string, column: number): boolean => {
    return project.tasks.some(task => {
        if (task.categoryId !== categoryId) return false;
        const startCol = isDayView ? (task.startWeek - 1) * 7 + 1 : task.startWeek;
        const durationCol = isDayView ? task.duration * 7 : task.duration;
        const endCol = startCol + durationCol;
        return column >= startCol && column < endCol;
    });
  }, [project.tasks, isDayView]);

  return (
    <div className="w-full bg-glass-bg backdrop-blur-lg border border-glass-border rounded-3xl overflow-hidden">
      <div className="overflow-x-auto relative">
        <div 
          id="timeline-grid-container"
          className="grid relative"
          style={{
            gridTemplateColumns: `150px repeat(${totalColumns}, 1fr)`,
            gridTemplateRows: `40px repeat(${categories.length}, ${rowHeight}px) 40px`
          }}
        >
          {/* Header Corner */}
          <div className="sticky top-0 left-0 bg-glass-bg/80 backdrop-blur-sm z-30 border-b border-glass-border"></div>
          
          {/* Timeline Header */}
          <div 
            id="timeline-header-container"
            className="sticky top-0 z-20 bg-glass-bg/80 backdrop-blur-sm flex col-start-2 col-span-full"
            ref={timelineAreaRef}
          >
            {colWidth > 0 && <TimelineHeader totalColumns={totalColumns} colWidth={colWidth} isDayView={isDayView} />}
          </div>

          {/* Category Labels */}
          {categories.map((cat, rowIndex) => (
             <div key={cat.id} className="row-start-[--row] z-10" style={{'--row': rowIndex + 2} as React.CSSProperties}>
                <CategoryLabel 
                    category={cat}
                    onNameChange={newName => onCategoryNameChange(cat.id, newName)}
                />
            </div>
          ))}

          {/* Grid Lines and Cells */}
          <div className="col-start-2 col-span-full row-start-2 row-span-full relative grid"
             style={{
                gridTemplateColumns: `repeat(${totalColumns}, 1fr)`,
                gridTemplateRows: `repeat(${categories.length}, ${rowHeight}px)`,
             }}
          >
             {/* Vertical Lines */}
             {Array.from({ length: totalColumns }).map((_, i) => (
                <div key={`${i}-vl`} className="col-start-[--col] row-span-full border-r border-glass-border" style={{'--col': i + 1} as React.CSSProperties}></div>
            ))}
            {/* Weekend shading */}
            {isDayView && Array.from({ length: project.totalWeeks }).map((_, weekIndex) => (
              <React.Fragment key={`weekend-${weekIndex}`}>
                <div className="row-span-full bg-weekend-shade" style={{gridColumn: `${weekIndex * 7 + 6} / span 2`}}></div>
              </React.Fragment>
            ))}

            {/* Horizontal Lines & Cells */}
            {categories.map((category, rowIndex) => (
              <React.Fragment key={category.id}>
                  <div className="row-start-[--row] col-span-full border-b border-glass-border pointer-events-none" style={{'--row': rowIndex + 1} as React.CSSProperties}></div>
                  {Array.from({ length: totalColumns }).map((_, colIndex) => {
                    const column = colIndex + 1;
                    const occupied = isCellOccupied(category.id, column);
                    const startPos = isDayView ? (column - 1) / 7 + 1 : column;
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="flex items-center justify-center group"
                        style={{gridRow: rowIndex + 1, gridColumn: colIndex + 1}}
                        onMouseEnter={() => !occupied && setHoveredCell({row: rowIndex, col: colIndex})}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() => { if (!occupied) { playSound('add'); onAddTask(category.id, startPos); }}}
                      >
                        {hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex && !occupied && (
                          <div className="presentation-hide w-6 h-6 rounded-full flex items-center justify-center cursor-pointer text-text-secondary group-hover:bg-subtle-hover group-hover:text-text-primary transition-all">
                            +
                          </div>
                        )}
                      </div>
                    )
                  })}
              </React.Fragment>
            ))}
          </div>

          {/* Task Items */}
          <div className="col-start-2 col-span-full row-start-2 row-span-full relative pointer-events-none">
            {project.tasks.map(task => {
                const currentTask = (transientTask && transientTask.id === task.id) ? transientTask : task;
                const rowIndex = categories.findIndex(c => c.id === currentTask.categoryId);
                const layoutInfo = categoryLayouts[task.id];
                if (rowIndex === -1 || !layoutInfo || colWidth <= 0) return null;
                
                const { laneIndex, numLanes } = layoutInfo;
                const taskLaneHeight = rowHeight / numLanes;
                
                const isDragging = draggingInfo && draggingInfo.task.id === task.id;
                const isDeliverable = currentTask.isDeliverable;
                
                const categoryStyle = categoryStyles[currentTask.categoryId] || categoryStyles['DEFAULT'];
                const categoryContainerClass = isDeliverable ? categoryStyle.container.replace('/20', '/50') : categoryStyle.container;
                const deliverableClasses = isDeliverable ? 'ring-2 ring-highlight/70 shadow-[0_0_15px_rgba(56,189,248,0.4)]' : '';

                const startCol = isDayView ? (currentTask.startWeek - 1) * 7 + 1 : currentTask.startWeek;
                let durationCol = isDayView ? currentTask.duration * 7 : currentTask.duration;

                // Don't render tasks that are completely outside the visible timeline
                if (startCol > totalColumns) {
                    return null;
                }

                // Visually truncate tasks that extend beyond the timeline's right edge
                const endCol = startCol + durationCol;
                if (endCol > totalColumns + 1) {
                    durationCol = totalColumns - startCol + 1;
                }
                
                // Ensure duration isn't negative, which could happen with sub-day tasks when grid snap is off
                if (durationCol < 0) {
                    durationCol = 0;
                }

                const style: React.CSSProperties = {
                  position: 'absolute',
                  top: `${rowIndex * rowHeight + laneIndex * taskLaneHeight}px`,
                  left: `${(startCol - 1) * colWidth + 4}px`,
                  width: `${durationCol * colWidth - 8}px`,
                  height: `${taskLaneHeight - 8}px`, // padding
                  marginTop: '4px',
                  opacity: draggingInfo && !isDragging ? 0.4 : 1,
                  transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                  zIndex: isDragging ? 20 : 10,
                };

                return (
                  <div
                    key={task.id}
                    className={`task-item rounded-2xl flex items-center justify-between p-2 pl-3 group cursor-move transition-all duration-200 ease-out pointer-events-auto backdrop-blur-sm ${categoryContainerClass} ${deliverableClasses} hover:scale-[1.01] hover:shadow-lg`}
                    onMouseDown={(e) => handleMouseDown(e, task, 'move')}
                    onContextMenu={(e) => onTaskContextMenu(e, task)}
                    style={style}
                  >
                    <div className="task-item-inner-wrapper flex items-start gap-2 overflow-hidden h-full w-full">
                        {isDeliverable && <StarIcon className="w-3 h-3 text-highlight/80 flex-shrink-0 mt-1"/>}
                        <EditableText
                            tag="p"
                            value={task.name}
                            onChange={(newName) => onTaskUpdate(task.id, { name: newName })}
                            className={`text-left w-full h-full ${categoryStyle.text}`}
                            autoFit={true}
                        />
                    </div>
                    <div 
                      className="presentation-hide absolute right-0 top-0 bottom-0 w-4 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity"
                      onMouseDown={(e) => handleMouseDown(e, task, 'resize')}
                    />
                  </div>
                );
              })}
          </div>

          {/* Add Row Button */}
          <div className="col-start-1 row-start-auto sticky left-0 bg-glass-bg/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <button 
              onClick={onAddCategory}
              className="presentation-hide h-full w-full border-t border-glass-border text-text-secondary hover:text-text-primary hover:bg-subtle-hover transition-colors text-sm"
            >
              + Add Row
            </button>
          </div>
          <div className="col-start-2 col-span-full row-start-auto border-t border-glass-border"></div>

        </div>
      </div>
    </div>
  );
};