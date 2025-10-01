
import React from 'react';

const DesktopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
);

export const MobileBlocker: React.FC = () => {
    return (
        <div className="md:hidden flex flex-col items-center justify-center min-h-screen bg-background text-text-primary p-8 text-center">
            <DesktopIcon className="w-16 h-16 text-text-secondary mb-6" />
            <h1 className="text-3xl font-bold mb-4">Optimized for Larger Screens</h1>
            <p className="text-text-secondary max-w-sm">
                This app is designed for tablets and desktops. Please rotate your device to landscape or use a larger screen for the best experience.
            </p>
        </div>
    );
};
