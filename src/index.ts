import { createSpinner } from 'nanospinner';
import { existsSync } from 'fs';
import fs from 'fs/promises'

import queryDataFromCli from './lib/queryDataFromCli';
import handleNotInRepo from './lib/handleNotInRepo';

// Return early if not in an Unbound Repository
const repoFileExists = existsSync('./.unboundrepo');
handleNotInRepo(repoFileExists)

// Initialize globals
const { template, ...data } = await queryDataFromCli();

console.log('⎯'.repeat(process.stdout.columns));
const spinner = createSpinner('Generating plugin directory...');

// Create actual plugin data
await fs.mkdir(`./plugins/${data.id}`,);

spinner.update({
    text: 'Generating manifest.json...'
})

await fs.writeFile(`./plugins/${data.id}/manifest.json`, JSON.stringify(data, null, 2));

spinner.update({
    text: 'Generating plugin source directory...'
})

// Generate plugin based on template
await fs.mkdir(`./plugins/${data.id}/src`);

spinner.update({
    text: 'Generating plugin template files...'
})

for (const file of template.files) {
    await fs.writeFile(`./plugins/${data.id}/src/${file.name}`, file.code);
}

spinner.success({
    text: 'Done creating plugin!'
})