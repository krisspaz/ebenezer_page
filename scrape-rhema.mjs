import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const SOURCE_URL = 'https://ebenezer.org.gt/revista-rhema/';
const OUTPUT_FILE = 'frontend/public/rhema.json';

async function scrape() {
    console.log(`🚀 Starting Rhema Scraper - ${new Date().toISOString()}`);

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
        const magazines = [];

        // The page uses Elfsight PDF Embed widgets. Each widget stores its data
        // as URL-encoded JSON in data-elfsight-pdf-embed-options attributes.
        $('[data-elfsight-pdf-embed-options]').each((_, el) => {
            try {
                const encoded = $(el).attr('data-elfsight-pdf-embed-options');
                const decoded = decodeURIComponent(encoded);
                const data = JSON.parse(decoded);

                if (data.files && Array.isArray(data.files)) {
                    for (const file of data.files) {
                        if (file.link && file.link.toLowerCase().endsWith('.pdf')) {
                            magazines.push({
                                title: (file.name || '').toUpperCase(),
                                link: file.link,
                                image: file.previewImage || ''
                            });
                        }
                    }
                }
            } catch (parseError) {
                console.warn('⚠️ Failed to parse an elfsight widget:', parseError.message);
            }
        });

        // Fallback: also try the old .eape-item-wrap selector (in case structure changes back)
        if (magazines.length === 0) {
            console.log('ℹ️ No elfsight widgets found, trying fallback selectors...');

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

            // Second fallback: any PDF link
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
        }

        // Remove duplicates by link
        const uniqueMagazines = Array.from(new Set(magazines.map(m => m.link)))
            .map(link => magazines.find(m => m.link === link));

        if (uniqueMagazines.length > 0) {
            // Ensure directory exists
            const dir = path.dirname(OUTPUT_FILE);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueMagazines, null, 4));
            console.log(`✅ Success! Found and saved ${uniqueMagazines.length} magazines to ${OUTPUT_FILE}`);
        } else {
            console.warn('⚠️ No magazines found during scrape.');
        }
    } catch (error) {
        console.error('❌ Scraper failed:', error);
        process.exit(1);
    }
}

scrape();
