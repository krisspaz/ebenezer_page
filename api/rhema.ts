import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cheerio from 'cheerio';

interface Magazine {
    title: string;
    link: string;
    image: string;
}

const SOURCE_URL = 'https://ebenezer.org.gt/revista-rhema/';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const response = await fetch(SOURCE_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch source: ${response.statusText}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);
        const magazines: Magazine[] = [];

        // Main selector from the page structure
        $('.eape-item-wrap').each((_, el) => {
            const title = $(el).find('.eape-item-title').text().trim() || $(el).find('h3').text().trim();
            const link = $(el).find('a').attr('href');
            const image = $(el).find('img').attr('src');

            if (title && link && image && link.toLowerCase().endsWith('.pdf')) {
                magazines.push({
                    title: title.toUpperCase(),
                    link,
                    image
                });
            }
        });

        // Fallback selector just in case
        if (magazines.length === 0) {
            $('a').each((_, el) => {
                const link = $(el).attr('href');
                if (link && link.toLowerCase().endsWith('.pdf')) {
                    const container = $(el).closest('div');
                    const title = container.text().replace(/Descargar Revista/gi, '').trim();
                    const image = container.find('img').attr('src') || $(el).parent().find('img').attr('src');

                    if (title && image) {
                        magazines.push({
                            title: title.toUpperCase(),
                            link,
                            image
                        });
                    }
                }
            });
        }

        // Remove duplicates and sort if possible (assuming they are already in order on the page)
        const uniqueMagazines = Array.from(new Set(magazines.map(m => m.link)))
            .map(link => magazines.find(m => m.link === link)!);

        res.status(200).json(uniqueMagazines);
    } catch (err) {
        console.error('Error Rhema Scraping:', err);
        res.status(500).json({ error: 'Error obteniendo revistas en tiempo real' });
    }
}
