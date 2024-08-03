import esbuild from 'esbuild';
import { readFile, writeFile, readdir } from 'fs/promises';
import { exists, exec, getFiles } from './utils.js';

/** @type {import('esbuild').BuildOptions} */
const server = {
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
};

/** @type {import('esbuild').BuildOptions} */
const client = {
  platform: 'browser',
  target: ['es2021'],
  format: 'iife',
};

const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
let luaClientFile = false;
let fxmanifest = `name '${packageJson.name}'
author '${packageJson.author}'
version '${packageJson.version}'
description '${packageJson.description}'

${await readFile('./src/fxmanifest.lua', 'utf8')}
`;

const environments = [];
const production = process.argv.includes('--mode=production');
const web = await exists('./src/web');

if (web) {
  fxmanifest += `ui_page 'dist/web/index.html'\n`;
}

if (await exists('./src/client')) {
  environments.push('client');
  fxmanifest += `client_scripts {
    '@ox_lib/init.lua',
    'dist/client.lua',
    'dist/client.js',
}\n`;

  luaClientFile = await readFile('./src/client/client.lua', 'utf8');
}

if (await exists('./src/server')) {
  environments.push('server');
  fxmanifest += `server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'dist/server.js'
}\n`;
}

const buildCmd = production ? esbuild.build : esbuild.context;

for (const context of environments) {
  await buildCmd({
    bundle: true,
    entryPoints: [`./src/${context}/index.ts`],
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

if (luaClientFile) {
  writeFile('dist/client.lua', luaClientFile);
}

if (web) await exec(`cd ./src/web && vite ${production ? 'build' : 'build --watch'}`);

const files = await getFiles('dist/web', 'data', 'locales');

fxmanifest += `\nfiles {\n\t'${files.join("',\n\t'")}',\n}`;

writeFile('.yarn.installed', new Date().toISOString());
writeFile('fxmanifest.lua', fxmanifest);
