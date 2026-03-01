import { useEffect } from 'react';

const CHECK_INTERVAL = 60 * 1000; // Check every minute

const VersionCheck = () => {
    useEffect(() => {
        const checkVersion = async () => {
            try {
                // Fetch with no-cache to get the real file from server
                const response = await fetch('/version.json', { cache: 'no-store' });
                if (!response.ok) return;

                const data = await response.json();
                const latestVersion = data.version;
                const currentVersion = localStorage.getItem('app_version');

                console.log('Version Check:', { latest: latestVersion, current: currentVersion });

                if (currentVersion && latestVersion !== currentVersion) {
                    console.log('New version found! Reloading...');
                    localStorage.setItem('app_version', latestVersion);

                    // Clear cache storage just in case
                    if ('caches' in window) {
                        const names = await caches.keys();
                        await Promise.all(names.map(name => caches.delete(name)));
                    }

                    window.location.reload();
                } else if (!currentVersion) {
                    // First time load, just save the version
                    localStorage.setItem('app_version', latestVersion);
                }
            } catch (error) {
                console.error('Version check failed:', error);
            }
        };

        // Check immediately
        checkVersion();

        // Then interval
        const interval = setInterval(checkVersion, CHECK_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return null; // Renderless component
};

export default VersionCheck;
