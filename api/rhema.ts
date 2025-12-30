import type { VercelRequest, VercelResponse } from '@vercel/node';

interface Magazine {
    id: number;
    title: string;
    link: string;
    image: string;
}

const BASE_URL = 'https://www.ebenezer.org.gt/wp-json/wp/v2/posts';
const PER_PAGE = 100;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        let page = 1;
        let totalPages = 1;
        const allMagazines: Magazine[] = [];

        do {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(
                `${BASE_URL}?per_page=${PER_PAGE}&page=${page}&_embed`,
                { signal: controller.signal }
            );

            clearTimeout(timeout);

            if (!response.ok) {
                console.warn(`Página ${page} falló`);
                page++;
                continue;
            }

            totalPages = Number(response.headers.get('X-WP-TotalPages') || 1);

            const posts = await response.json();

            for (const post of posts) {
                const pdf =
                    post.content?.rendered?.match(/href="([^"]+\.pdf)"/i)?.[1];

                if (!pdf) continue;

                allMagazines.push({
                    id: post.id,
                    title: post.title.rendered.replace(/<[^>]*>/g, '').trim(),
                    link: pdf,
                    image:
                        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
                });
            }

            page++;
        } while (page <= totalPages);

        res.status(200).json({
            total: allMagazines.length,
            magazines: allMagazines
        });
    } catch (err) {
        console.error('Error Rhema:', err);
        res.status(500).json({ error: 'Error obteniendo revistas' });
    }
}
