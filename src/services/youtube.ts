const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    date: string;
    url: string;
}

export const fetchLatestVideos = async (maxResults = 6): Promise<YouTubeVideo[]> => {
    if (!CHANNEL_ID) {
        console.warn("YouTube Channel ID is missing");
        return [];
    }

    // Method 1: Google API (Preferred if Key exists)
    if (API_KEY) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
            );

            if (response.ok) {
                const data = await response.json();
                return data.items.map((item: any) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                    date: new Date(item.snippet.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
                }));
            }
        } catch (error) {
            console.error("Error fetching from YouTube API:", error);
        }
    }

    // Method 2: RSS Feed via rss2json (Fallback)
    try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);

        if (!response.ok) {
            throw new Error("Failed to fetch RSS feed");
        }

        const data = await response.json();

        if (data.status === 'ok' && data.items) {
            return data.items.slice(0, maxResults).map((item: any) => ({
                id: item.guid.split(':')[2] || item.guid, // guid is usually "yt:video:VIDEO_ID"
                title: item.title,
                thumbnail: item.thumbnail, // rss2json extracts the thumbnail
                date: new Date(item.pubDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                url: item.link
            }));
        }
    } catch (error) {
        console.error("Error fetching from RSS feed:", error);
    }

    return [];
};
