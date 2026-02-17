import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.resolve(__dirname, 'public', 'teletraan.svg');
const iconPath = path.resolve(__dirname, 'build', 'icon.png');

console.log('Generating high-res icon from:', svgPath);

sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(iconPath)
    .then((info) => {
        console.log(`Successfully generated build/icon.png (512x512) Size: ${info.size}`);
    })
    .catch((err) => {
        console.error('Error generating icon:', err);
        process.exit(1);
    });
