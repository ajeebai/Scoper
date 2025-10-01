import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  tag?: 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  className?: string;
  style?: React.CSSProperties;
  autoFit?: boolean;
  wrapperClassName?: string;
  containerIsFullHeight?: boolean;
  onEditingChange?: (isEditing: boolean) => void;
}

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  tag = 'div',
  className,
  style,
  autoFit = false,
  wrapperClassName,
  containerIsFullHeight = true,
  onEditingChange,
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    onEditingChange?.(isEditing);
  }, [isEditing, onEditingChange]);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const adjustFontSize = () => {
        if (!elementRef.current) return;
        const el = elementRef.current;

        // Reset styles for editing or when autoFit is off
        if (isEditing || !autoFit) {
            el.style.fontSize = '';
            el.style.lineHeight = '';
            el.style.whiteSpace = 'normal';
            el.style.overflowWrap = 'normal';
            if(isEditing) el.style.whiteSpace = 'nowrap';
            return;
        }
        
        // 1. Reset styles for measurement. Prioritize natural wrapping.
        el.style.fontSize = ''; 
        el.style.whiteSpace = 'normal';
        el.style.lineHeight = '1.3'; // A reasonable line-height for wrapped text
        el.style.overflowWrap = 'normal';

        // 2. Iteratively shrink font size until the text fits.
        let currentFontSize = parseFloat(window.getComputedStyle(el).fontSize);
        const minFontSize = 8;
        let iterations = 0; // Safety break for the loop

        // Add a 1px buffer for better visual fit and to prevent rounding errors
        const hasOverflow = () => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;

        while (hasOverflow() && currentFontSize > minFontSize && iterations < 30) {
            currentFontSize -= 0.5;
            el.style.fontSize = `${currentFontSize}px`;
            iterations++;
        }

        // As a last resort for very long words in a narrow container, allow breaking words
        if (hasOverflow()) {
            el.style.overflowWrap = 'break-word';
        }
    };
    
    const observerCallback = () => {
      // Defer to avoid "ResizeObserver loop limit exceeded" error
      window.requestAnimationFrame(adjustFontSize);
    };

    // Initial call
    adjustFontSize();
    
    const resizeObserver = new ResizeObserver(observerCallback);
    
    if(element) {
        resizeObserver.observe(element);
    }
    
    return () => {
        if (element) {
            resizeObserver.unobserve(element);
        }
    };
  }, [value, autoFit, isEditing]);


  useEffect(() => {
    if (elementRef.current && elementRef.current.textContent !== value && !isEditing) {
      elementRef.current.textContent = value;
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elementRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (elementRef.current) {
      const newValue = elementRef.current.textContent || '';
      if (newValue.trim() !== value.trim() && newValue.trim() !== "") {
        onChange(newValue.trim());
      } else {
        elementRef.current.textContent = value;
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === 'Escape') {
      if(elementRef.current) {
        elementRef.current.textContent = value;
      }
      e.currentTarget.blur();
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const Component = tag;
  const isInline = tag === 'span';

  return (
    <div 
      className={`relative group ${isInline ? '' : 'w-full'} ${!isInline && containerIsFullHeight ? 'h-full' : ''} ${wrapperClassName || ''}`}
      style={{ display: isInline ? 'inline-block' : 'block' }} 
      onClick={handleClick}
    >
      <Component
        ref={elementRef as any}
        className={`editable-text ${className || ''}`}
        style={style}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: value }}
      />
      {!isEditing && (
        <div className={`presentation-hide absolute -right-7 top-1/2 -translate-y-1/2 w-6 h-6 bg-subtle-hover/50 rounded-full flex items-center justify-center transition-all pointer-events-auto cursor-pointer hover:bg-subtle-hover opacity-0 group-hover:opacity-100`}>
            <PencilIcon className="w-3 h-3 text-text-primary" />
        </div>
      )}
    </div>
  );
};