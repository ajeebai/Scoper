let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
            return null;
        }
    }
    return audioContext;
};

const playSound = (type: 'drag' | 'drop' | 'add' | 'deliverable' | 'hover') => {
    const ctx = getAudioContext();
    if (!ctx) {
        return;
    }
    if (ctx.state === 'suspended') {
        ctx.resume();
    }
    
    try {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        
        oscillator.start(now);

        switch (type) {
            case 'drag':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(300, now);
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
                oscillator.stop(now + 0.1);
                break;
            case 'drop':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, now);
                oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.2);
                gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.2);
                oscillator.stop(now + 0.2);
                break;
            case 'add':
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(523.25, now);
                gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.15);
                oscillator.stop(now + 0.15);
                break;
            case 'deliverable':
                oscillator.type = 'sawtooth';
                gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
                oscillator.frequency.setValueAtTime(600, now);
                oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
                oscillator.stop(now + 0.1);
                break;
            case 'hover':
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(250, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 0.1);
                oscillator.stop(now + 0.1);
                break;
        }
    } catch (e) {
        console.error("Could not play sound", e);
    }
};

export default playSound;