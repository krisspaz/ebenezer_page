import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
            manifest: {
                name: "Ebenezer Cobán",
                short_name: "Ebenezer",
                description: "Iglesia de Cristo Ebenezer Cobán",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "unsplash-images",
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                            },
                        },
                    },
                    {
                        urlPattern: ({ url }) => url.pathname.startsWith("/rhema.json"),
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "api-data",
                            expiration: {
                                maxEntries: 5,
                                maxAgeSeconds: 60 * 60 * 24, // 1 day
                            }
                        }
                    }
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "use-sync-external-store/shim": path.resolve(__dirname, "./src/shim.js"),
        },
    },
    server: {
        host: true,
        port: 3000,
        allowedHosts: ["all"],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000,
    },
});
