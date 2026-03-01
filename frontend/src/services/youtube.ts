const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCNHgmUxPdMXtOFYChK1ib1w';

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    url: string;
}

// Cache
const CACHE_KEY = "youtube_cache";
const CACHE_DURATION = 30 * 60 * 1000;

interface CachedData {
    videos: YouTubeVideo[];
    timestamp: number;
}

// Fallback (solo si todo falla)
const FALLBACK_VIDEOS: YouTubeVideo[] = [
    {
        id: "fallback-1",
        title: "Servicio Dominical - La Fe Inquebrantable",
        date: "Hace 2 días",
        thumbnail: "https://images.unsplash.com/photo-1438232991995-b7058bbb3?w=800&q=80",
        url: "https://www.youtube.com/@iglesiaebenezercoban"
    },
    {
        id: "fallback-2",
        title: "Estudio Bíblico - El Poder de la Oración",
        date: "Hace 5 días",
        thumbnail: "https://images.unsplash.com/photo-1507692049790-de58293a4697?w=800&q=80",
        url: "https://www.youtube.com/@iglesiaebenezercoban"
    },
    {
        id: "fallback-3",
        title: "Noche de Adoración - Rendidos a Tus Pies",
        date: "Hace 1 semana",
        thumbnail: "https://images.unsplash.com/photo-1445445290350-16a63cfaf7a7?w=800&q=80",
        url: "https://www.youtube.com/@iglesiaebenezercoban"
    },
];


// -------------------------------
// Cache helpers
// -------------------------------
const getCachedVideos = (): YouTubeVideo[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const parsed: CachedData = JSON.parse(cached);
        const expired = Date.now() - parsed.timestamp > CACHE_DURATION;

        if (expired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return parsed.videos;
    } catch {
        return null;
    }
};

const cacheVideos = (videos: YouTubeVideo[]) => {
    localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ videos, timestamp: Date.now() })
    );
};


// -------------------------------
// Fecha en español
// -------------------------------
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;

    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};


// -------------------------------
// RSS via Proxy (sin CORS, sin API KEY)
// -------------------------------
const fetchFromRSS = async (maxResults: number): Promise<YouTubeVideo[]> => {
    const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    // Using corsproxy.io as it proved more reliable in other components
    const proxy = `https://corsproxy.io/?${encodeURIComponent(rss)}`;

    const res = await fetch(proxy);
    if (!res.ok) throw new Error("Error al cargar RSS");

    const xmlText = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, "text/xml");

    const entries = doc.querySelectorAll("entry");
    if (!entries.length) throw new Error("RSS vacío");

    const videos: YouTubeVideo[] = [];

    entries.forEach((entry, i) => {
        if (i >= maxResults) return;

        const id = entry.querySelector("yt\\:videoId, videoId")?.textContent ?? "";
        const title = entry.querySelector("title")?.textContent ?? "Sin título";
        const published = entry.querySelector("published")?.textContent ?? "";
        const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

        videos.push({
            id,
            title,
            thumbnail: thumb,
            date: formatDate(published),
            url: `https://www.youtube.com/watch?v=${id}`,
        });
    });

    return videos;
};


// -------------------------------
// Main export
// -------------------------------
export const fetchLatestVideos = async (maxResults = 6): Promise<YouTubeVideo[]> => {
    const cache = getCachedVideos();
    if (cache) return cache.slice(0, maxResults);

    try {
        const videos = await fetchFromRSS(maxResults);
        cacheVideos(videos);
        return videos;
    } catch (error) {
        console.error("RSS failed:", error);
        return FALLBACK_VIDEOS.slice(0, maxResults);
    }
};

export const clearVideoCache = () => localStorage.removeItem(CACHE_KEY);
