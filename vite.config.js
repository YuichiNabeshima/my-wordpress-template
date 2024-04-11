import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: './wp/assets/',
    rollupOptions: {
      input: Object.fromEntries(
        [
          ...globSync('src/css/entry_point/**/*.css').map(file => [
            'css/' + path.relative(
              'src/css/entry_point',
              file.slice(0, file.length - path.extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
        ]
      ),
      output: {
        assetFileNames: info => {
          if (/\.css/.test(info.name)) {
            return '[name][extname]';
          }
        },
      },
    },
  }
});
