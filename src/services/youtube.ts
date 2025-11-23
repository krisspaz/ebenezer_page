const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UCNHgmUxPdMXtOFYChK1ib1w';

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    url: string;
}

// Cache configuration
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CachedData {
    videos: YouTubeVideo[];
    timestamp: number;
}

// Fallback videos in case all API methods fail
const FALLBACK_VIDEOS: YouTubeVideo[] = [
    {
        id: "fallback-1",
        title: "Servicio Dominical - La Fe Inquebrantable",
        date: "Hace 2 días",
        thumbnail: "https://images.unsplash.com/photo-1438232991995b7058bbb3?w=800&q=80",
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

/**
 * Get cached videos if available and not expired
 */
const getCachedVideos = (): YouTubeVideo[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const data: CachedData = JSON.parse(cached);
        const isExpired = Date.now() - data.timestamp > CACHE_DURATION;

        if (isExpired) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return data.videos;
    } catch (error) {
        console.error('Error reading cache:', error);
        return null;
    }
};

/**
 * Cache videos to localStorage
 */
const cacheVideos = (videos: YouTubeVideo[]): void => {
    try {
        const data: CachedData = {
            videos,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error caching videos:', error);
    }
};

/**
 * Format date to Spanish locale
 */
const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Fecha desconocida';
    }
};

/**
 * Fetch videos using YouTube Data API v3
 */
const fetchFromYouTubeAPI = async (maxResults: number): Promise<YouTubeVideo[]> => {
    if (!API_KEY) {
        console.warn('YouTube API Key not configured');
        return [];
    }

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
        throw new Error('No videos found in API response');
    }

    return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        date: formatDate(item.snippet.publishedAt),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
};

/**
 * Fetch videos directly from YouTube RSS feed (no external API needed)
 */
const fetchFromRSSFeed = async (maxResults: number): Promise<YouTubeVideo[]> => {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const response = await fetch(rssUrl);

    if (!response.ok) {
        throw new Error(`RSS feed error: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Parse XML using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check for XML parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
        throw new Error('Failed to parse RSS feed XML');
    }

    // Get all video entries
    const entries = xmlDoc.querySelectorAll('entry');

    if (entries.length === 0) {
        throw new Error('No videos found in RSS feed');
    }

    const videos: YouTubeVideo[] = [];

    // Parse each entry
    for (let i = 0; i < Math.min(entries.length, maxResults); i++) {
        const entry = entries[i];

        // Extract video data from XML
        const videoIdElement = entry.querySelector('videoId');
        const titleElement = entry.querySelector('title');
        const publishedElement = entry.querySelector('published');
        const thumbnailElement = entry.querySelector('media\\:thumbnail, thumbnail');

        const videoId = videoIdElement?.textContent || '';
        const title = titleElement?.textContent || 'Sin título';
        const published = publishedElement?.textContent || '';

        // Get thumbnail URL - YouTube RSS provides it in media:thumbnail
        let thumbnail = thumbnailElement?.getAttribute('url') || '';

        // Fallback to YouTube's standard thumbnail URL if not found
        if (!thumbnail && videoId) {
            thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }

        if (videoId) {
            videos.push({
                id: videoId,
                title: title,
                thumbnail: thumbnail,
                date: formatDate(published),
                url: `https://www.youtube.com/watch?v=${videoId}`
            });
        }
    }

    if (videos.length === 0) {
        throw new Error('No valid videos extracted from RSS feed');
    }

    return videos;
};

/**
 * Fetch latest videos from YouTube channel with retry logic and fallbacks
 */
export const fetchLatestVideos = async (maxResults = 6): Promise<YouTubeVideo[]> => {
    // Check cache first
    const cachedVideos = getCachedVideos();
    if (cachedVideos && cachedVideos.length > 0) {
        console.log('Using cached YouTube videos');
        return cachedVideos.slice(0, maxResults);
    }

    // Try YouTube API first (if key is available)
    if (API_KEY) {
        try {
            console.log('Fetching from YouTube API...');
            const videos = await fetchFromYouTubeAPI(maxResults);
            cacheVideos(videos);
            return videos;
        } catch (error) {
            console.error('YouTube API failed:', error);
        }
    }

    // Fallback to RSS feed
    try {
        console.log('Fetching from RSS feed...');
        const videos = await fetchFromRSSFeed(maxResults);
        cacheVideos(videos);
        return videos;
    } catch (error) {
        console.error('RSS feed failed:', error);
    }

    // Last resort: return fallback videos
    console.warn('All API methods failed, using fallback videos');
    return FALLBACK_VIDEOS.slice(0, maxResults);
};

/**
 * Clear the video cache (useful for manual refresh)
 */
export const clearVideoCache = (): void => {
    try {
        localStorage.removeItem(CACHE_KEY);
        console.log('Video cache cleared');
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};
