import React, { createContext, useContext, useState, ReactNode } from 'react';

type StreamConfig = {
    url: string;
    type: 'youtube' | 'facebook' | 'hls';
    title: string;
    description?: string;
    isExternal?: boolean; // If true, opens in new tab instead of playing
    externalLink?: string;
};

interface PlayerContextType {
    isPlaying: boolean;
    isFloating: boolean;
    config: StreamConfig | null;
    playStream: (config: StreamConfig) => void;
    closePlayer: () => void;
    setFloating: (floating: boolean) => void;
    togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFloating, setIsFloating] = useState(true); // Default to floating unless page overrides
    const [config, setConfig] = useState<StreamConfig | null>(null);

    const playStream = (newConfig: StreamConfig) => {
        setConfig(newConfig);
        setIsPlaying(true);
        setIsFloating(false); // Default to full view when starting
    };

    const closePlayer = () => {
        setIsPlaying(false);
        setConfig(null);
    };

    const setFloating = (floating: boolean) => {
        setIsFloating(floating);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                isFloating,
                config,
                playStream,
                closePlayer,
                setFloating,
                togglePlay,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};
