import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to copy for SPA routing support - ALL POSSIBLE CONFIGURATIONS
const filesToCopy = [
  { from: 'public/_redirects', to: 'dist/_redirects' },
  { from: 'public/.htaccess', to: 'dist/.htaccess' },
  { from: 'public/web.config', to: 'dist/web.config' },
  { from: 'public/nginx.conf', to: 'dist/nginx.conf' },
  { from: 'public/redirect.html', to: 'dist/redirect.html' },
  { from: 'vercel.json', to: 'dist/vercel.json' },
  { from: 'netlify.toml', to: 'dist/netlify.toml' },
  { from: 'render.yaml', to: 'dist/render.yaml' }
];

try {
  // Ensure dist directory exists
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
  }
  
  // Copy all configuration files
  for (const file of filesToCopy) {
    const sourceFile = path.join(__dirname, file.from);
    const destFile = path.join(__dirname, file.to);
    
    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, destFile);
      console.log(`✅ ${file.from} copied to ${file.to}`);
    } else {
      console.log(`⚠️  ${file.from} not found, skipping`);
    }
  }
  
  console.log('✅ All SPA routing configuration files copied successfully');
} catch (error) {
  console.error('❌ Error copying configuration files:', error.message);
  process.exit(1);
}
