import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
    url: string;
    width?: string | number;
    height?: string | number;
    autoPlay?: boolean;
    controls?: boolean;
    className?: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({
    url,
    width = '100%',
    height = '100%',
    autoPlay = true,
    controls = true,
    className = ''
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset error state on new URL
        setError(null);

        let hls: Hls | null = null;

        const initPlayer = () => {
            // Check if HLS.js is supported
            if (Hls.isSupported()) {
                console.log('HLSPlayer: Initializing HLS.js');
                hls = new Hls({
                    debug: false,
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90,
                    // Optimization settings
                    startLevel: 0, // Force lowest quality start for faster load
                    maxBufferLength: 30,
                    liveSyncDurationCount: 2, // Closer to live edge
                    liveMaxLatencyDurationCount: 10,
                    maxMaxBufferLength: 60,
                    enableSoftwareAES: true,
                    manifestLoadingTimeOut: 10000,
                    manifestLoadingMaxRetry: 3,
                    levelLoadingTimeOut: 10000,
                    fragLoadingTimeOut: 20000,
                });

                hls.loadSource(url);
                hls.attachMedia(video);

                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    console.log('HLSPlayer: Media attached');
                    if (autoPlay) {
                        video.play().catch((e: unknown) => console.error('HLSPlayer: Autoplay failed', e));
                    }
                });

                hls.on(Hls.Events.ERROR, (_event, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.error('HLSPlayer: Fatal network error', data);
                                hls?.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.error('HLSPlayer: Fatal media error', data);
                                hls?.recoverMediaError();
                                break;
                            default:
                                console.error('HLSPlayer: Fatal error', data);
                                hls?.destroy();
                                break;
                        }
                        setError(`Error: ${data.details}`);
                    }
                });
            }
            // Check for native HLS support (Safari)
            else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                console.log('HLSPlayer: Using native HLS (Safari)');
                video.src = url;
                video.addEventListener('loadedmetadata', () => {
                    if (autoPlay) {
                        video.play().catch((e: unknown) => console.error('HLSPlayer: AutoPlay Native failed', e));
                    }
                });
                video.addEventListener('error', (e) => {
                    console.error('HLSPlayer: Native video error', e);
                    setError('Error loading native stream');
                });
            } else {
                console.error('HLSPlayer: HLS not supported');
                setError('Su navegador no soporta reproducción HLS.');
            }
        };

        initPlayer();

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [url, autoPlay]);

    return (
        <div className={`relative bg-black ${className}`} style={{ width, height }}>
            {/* Video Element */}
            <video
                ref={videoRef}
                controls={controls}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                playsInline
                poster="/assets/images/placeholder_tv.jpg"
            />

            {/* Error Overlay */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 text-white p-4 text-center">
                    <div>
                        <p className="text-red-400 font-bold mb-2">Error de Reproducción</p>
                        <p className="text-sm opacity-80">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HLSPlayer;
