import { build } from 'vite';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

async function buildPackages () {
  fs.rmSync('./wp/assets/', { recursive: true, force: true, });

  const inputFiles = Object.fromEntries(
    [
      ...glob.sync('src/css/entry_point/**/*.css').map(file => [
        'css/' + path.relative(
          'src/css/entry_point',
          file.slice(0, file.length - path.extname(file).length),
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
      ...glob.sync('src/ts/entry_point/**/*.ts').map(file => [
        path.relative(
          'src/ts/entry_point/',
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url))
      ]),
    ]
  );

  for (const key in inputFiles) {
    const inputFile = inputFiles[key];
    await build({
      build: {
        minify: true,
        outDir: 'wp/assets/',
        rollupOptions: {
          input: inputFile,
          output: {
            entryFileNames: 'js/[name].js',
            assetFileNames: 'css/[name].css',
          }
        },
        emptyOutDir: false
      },
      configFile: false
    });
  }
}

buildPackages();
