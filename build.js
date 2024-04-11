import { build } from 'vite';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function buildPackages () {
  const inputFiles = Object.fromEntries(
    glob.sync('src/ts/entry_point/**/*.ts').map(file => [
      path.relative(
        'src/ts/entry_point/',
        file.slice(0, file.length - path.extname(file).length)
      ),
      fileURLToPath(new URL(file, import.meta.url))
    ])
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
          }
        },
        emptyOutDir: false
      },
      configFile: false
    });
  }
}

buildPackages();
