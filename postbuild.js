import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy all files from dist/public to dist
const sourceDir = path.resolve(__dirname, 'dist', 'public');
const targetDir = path.resolve(__dirname, 'dist');

if (fs.existsSync(sourceDir)) {
  copyDir(sourceDir, targetDir);
  console.log('Build files copied successfully to dist folder');
} else {
  console.error('Source directory dist/public not found');
}
