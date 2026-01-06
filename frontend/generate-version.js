import fs from 'fs';

const version = {
    version: Date.now().toString(),
    builtAt: new Date().toISOString()
};

// Ensure public directory exists
if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
}

fs.writeFileSync('./public/version.json', JSON.stringify(version, null, 2));

console.log('✅ Generated public/version.json:', version);

// Copy main component image to og-image-2026.jpg to ensure sync
const mainImagePath = './public/assets/images/2026-deleite.jpg';
const ogImagePath = './public/og-image-2026.jpg';

if (fs.existsSync(mainImagePath)) {
    fs.copyFileSync(mainImagePath, ogImagePath);
    console.log('✅ Copied 2026-deleite.jpg to og-image-2026.jpg');
} else {
    console.warn('⚠️ Main image not found at', mainImagePath);
}

// Update og:image in index.html to force cache refresh
// Update og:image in index.html to force cache refresh
// DISABLED: We are using a static file 'social.jpg' to avoid regex fragility and missing files.
/*
const indexHtmlPath = './index.html';

if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Regex to match og:image and twitter:image content with ABSOLUTE URL
    // Matches https://www.ebenezercoban.org/og-image-2026.jpg possibly followed by ?v=...
    const ogImageRegex = /(content="https:\/\/www\.ebenezercoban\.org\/og-image-2026\.jpg)(\?v=[0-9]+)?\"/g;

    if (ogImageRegex.test(indexHtml)) {
        // Replace with new version
        const newHtml = indexHtml.replace(ogImageRegex, `$1?v=${version.version}"`);
        fs.writeFileSync(indexHtmlPath, newHtml);
        console.log(`✅ Updated og:image version in index.html to ?v=${version.version}`);
    } else {
        console.warn('⚠️ Could not find og:image tag in index.html to update (Check URL match).');
    }
}
*/
