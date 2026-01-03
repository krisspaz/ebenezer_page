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
