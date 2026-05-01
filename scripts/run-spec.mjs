#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { basename, join, relative, sep } from 'node:path';

const [specName, ...cypressArgs] = process.argv.slice(2);
const specsRoot = join(process.cwd(), 'tests');
const specFilePattern = /\.cy\.(js|jsx|ts|tsx)$/;

if (!specName?.trim()) {
  console.error('Usage: npm run cy:spec -- <spec-name> [cypress flags]');
  console.error('Example: npm run cy:spec -- mvideo.landing');
  console.error('Example: npm run cy:spec -- mvideo.landing --headed');
  process.exit(1);
}

const normalizePath = (path) => path.split(sep).join('/');
const normalizeSpecName = (name) => basename(name).replace(specFilePattern, '');

const collectSpecs = (directory) => {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectSpecs(path);
    }

    return specFilePattern.test(entry.name) ? [path] : [];
  });
};

const specs = collectSpecs(specsRoot);
const requestedName = normalizeSpecName(specName.trim());
const matches = specs.filter((specPath) => {
  const relativePath = normalizePath(relative(process.cwd(), specPath));
  const fileName = basename(specPath);
  const shortName = normalizeSpecName(fileName);

  return (
    relativePath === specName ||
    fileName === specName ||
    shortName === requestedName ||
    shortName.includes(requestedName)
  );
});

if (matches.length === 0) {
  console.error(`No spec matched "${specName}".`);
  console.error('Available specs:');
  specs.forEach((specPath) => console.error(`- ${normalizeSpecName(specPath)}`));
  process.exit(1);
}

if (matches.length > 1) {
  console.error(`Spec name "${specName}" matched multiple specs:`);
  matches.forEach((specPath) => console.error(`- ${normalizePath(relative(process.cwd(), specPath))}`));
  console.error('Pass a more specific spec name.');
  process.exit(1);
}

const specPath = normalizePath(relative(process.cwd(), matches[0]));
const cypressBin = join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'cypress.cmd' : 'cypress',
);
const result = spawnSync(cypressBin, ['run', '--spec', specPath, ...cypressArgs], {
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
