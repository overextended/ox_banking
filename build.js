import esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';

/** @type {import('esbuild').BuildOptions} */
const server = {
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
};

/** @type {import('esbuild').BuildOptions} */
const client = {
  platform: 'browser',
  target: ['chrome93'],
  format: 'iife',
};

const production = process.argv.includes('--mode=production');
const buildCmd = production ? esbuild.build : esbuild.context;
const packageJson = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }));

writeFileSync(
  '.yarn.installed',
  new Date().toLocaleString('en-AU', {
    timeZone: 'UTC',
    timeStyle: 'long',
    dateStyle: 'full',
  })
);

writeFileSync(
  'fxmanifest.lua',
  `fx_version 'cerulean'
game 'gta5'
use_experimental_fxv2_oal 'yes'
lua54 'yes'

name '${packageJson.name}'
author '${packageJson.author}'
version '${packageJson.version}'
license '${packageJson.license}'
repository '${packageJson.repository.url}'
description '${packageJson.description}'

dependencies {
    '/server:7290',
    '/onesync',
}

client_scripts {
  '@ox_lib/init.lua',
  'client/client.lua',
  'dist/client.js'
}

server_scripts {
  '@oxmysql/lib/MySQL.lua',
  'dist/server.js'
}


ui_page 'web/build/index.html'

files {
    'locales/*.json',
    'data/*.json',
    'web/build/index.html',
    'web/build/**/*',
}

`
);

for (const context of ['client', 'server']) {
  buildCmd({
    bundle: true,
    entryPoints: [`${context}/index.ts`],
    outfile: `dist/${context}.js`,
    keepNames: true,
    dropLabels: production ? ['DEV'] : undefined,
    legalComments: 'inline',
    plugins: production
      ? undefined
      : [
          {
            name: 'rebuild',
            setup(build) {
              const cb = (result) => {
                if (!result || result.errors.length === 0) console.log(`Successfully built ${context}`);
              };
              build.onEnd(cb);
            },
          },
        ],
    ...(context === 'client' ? client : server),
  })
    .then((build) => {
      if (production) return console.log(`Successfully built ${context}`);

      build.watch();
    })
    .catch(() => process.exit(1));
}
