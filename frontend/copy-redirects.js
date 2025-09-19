import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy _redirects file from public to dist
const sourceFile = path.join(__dirname, 'public', '_redirects');
const destFile = path.join(__dirname, 'dist', '_redirects');

try {
  // Ensure dist directory exists
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
  }
  
  // Copy the file
  fs.copyFileSync(sourceFile, destFile);
  console.log('✅ _redirects file copied successfully');
} catch (error) {
  console.error('❌ Error copying _redirects file:', error.message);
  process.exit(1);
}
