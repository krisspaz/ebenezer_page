import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

import ErrorBoundary from './components/ErrorBoundary';



import { HelmetProvider } from 'react-helmet-async';

// Force unregister any existing service workers to fix cache issues
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
            console.log('Unregistering stale service worker to fix cache:', registration);
            registration.unregister();
        }
    });
}

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
        <HelmetProvider>
            <Suspense fallback={
                <div className="h-screen w-full bg-zinc-950 flex items-center justify-center text-white">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-medium tracking-widest text-sm">CARGANDO...</p>
                    </div>
                </div>
            }>
                <App />
            </Suspense>
        </HelmetProvider>
    </ErrorBoundary>,
);
