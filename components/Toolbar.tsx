import React, { useState, useRef, useEffect } from 'react';

type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

interface ToolbarProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  showPricePerDay: boolean;
  onShowPricePerDayChange: (show: boolean) => void;
  isSnapToGridEnabled: boolean;
  onSnapToGridChange: (enabled: boolean) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const CURRENCY_SYMBOLS: { [key in Currency]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
};

// --- ICONS --- //
const EyeOpenIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const EyeClosedIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.9 4.24A9.9 9.9 0 0 1 12 3c7 0 10 7 10 7a13.4 13.4 0 0 1-1.67 2.68"/>
        <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61"/>
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);
const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
    </svg>
);
const LineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>
    </svg>
);
const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);


export const Toolbar: React.FC<ToolbarProps> = ({
    currency, onCurrencyChange,
    showPricePerDay, onShowPricePerDayChange,
    isSnapToGridEnabled, onSnapToGridChange,
    onDownload, isDownloading
}) => {
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const currencyDropdownRef = useRef<HTMLDivElement>(null);

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
    useOutsideAlerter(currencyDropdownRef, () => setIsCurrencyDropdownOpen(false));
    
    return (
        <div id="app-toolbar" className="presentation-hide fixed top-6 right-6 sm:top-8 sm:right-8 z-50">
            <div className="flex items-center gap-2 bg-glass-bg/80 backdrop-blur-md border border-glass-border rounded-full p-1.5">
                <button 
                    onClick={onDownload}
                    disabled={isDownloading}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-white/10 hover:text-text-primary transition-colors disabled:opacity-50 disabled:cursor-wait"
                    aria-label="Download as PNG"
                >
                    {isDownloading ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-text-primary"></span>
                    ) : (
                        <DownloadIcon className="w-5 h-5" />
                    )}
                </button>

                <div className="w-px h-6 bg-glass-border mx-1"></div>

                <div ref={currencyDropdownRef} className="relative">
                    <button 
                        onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:bg-white/10 hover:text-text-primary transition-colors"
                    >
                         <span className="font-mono text-xl">{CURRENCY_SYMBOLS[currency]}</span>
                    </button>
                    {isCurrencyDropdownOpen && (
                        <div className="absolute top-12 right-0 bg-glass-bg border border-glass-border rounded-2xl p-1.5 flex flex-col gap-1.5 w-max shadow-2xl">
                             {(Object.keys(CURRENCY_SYMBOLS) as Array<keyof typeof CURRENCY_SYMBOLS>).map(c => (
                                <button
                                    key={c}
                                    onClick={() => { onCurrencyChange(c); setIsCurrencyDropdownOpen(false); }}
                                    className={`w-full h-10 px-3 flex items-center justify-center rounded-xl font-mono text-xl transition-colors ${currency === c ? 'bg-accent text-accent-text' : 'text-text-secondary hover:bg-white/10'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                <button
                    onClick={() => onShowPricePerDayChange(!showPricePerDay)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${showPricePerDay ? 'bg-accent text-accent-text' : 'text-text-secondary hover:bg-white/10 hover:text-text-primary'}`}
                    aria-label={showPricePerDay ? "Hide price per day" : "Show price per day"}
                    aria-pressed={showPricePerDay}
                >
                    {showPricePerDay ? <EyeClosedIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
                </button>

                <button
                    onClick={() => onSnapToGridChange(!isSnapToGridEnabled)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isSnapToGridEnabled ? 'bg-accent text-accent-text' : 'text-text-secondary hover:bg-white/10 hover:text-text-primary'}`}
                    aria-label={isSnapToGridEnabled ? "Disable snap to grid" : "Enable snap to grid"}
                    aria-pressed={isSnapToGridEnabled}
                >
                    {isSnapToGridEnabled ? <GridIcon className="w-5 h-5"/> : <LineIcon className="w-5 h-5"/>}
                </button>
            </div>
        </div>
    )
}