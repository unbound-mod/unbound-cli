import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { existsSync } from 'fs';
import fs from 'fs/promises'

import queryDataFromCli from './lib/queryDataFromCli';
import handleNotInRepo from './lib/handleNotInRepo';
import handlePluginExists from './lib/handlePluginExists';

// Return early if not in an Unbound Repository
const repoFileExists = existsSync('./.unboundrepo');
handleNotInRepo(repoFileExists)

// Initialize globals
const { template, ...data } = await queryDataFromCli();

console.log('⎯'.repeat(process.stdout.columns));
const spinner = createSpinner('Generating plugin directory...');

// Create actual plugin data
const id = await handlePluginExists(data.id);
data.id = id;

await fs.mkdir(`./plugins/${data.id}`,);

spinner.update({
    text: 'Generating manifest.json...'
})

data['main'] = `src/${template.files.find(x => x.name.startsWith('index'))?.name}`

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
    text: `Done creating plugin called '${data.name}' at 'plugins/${data.id}'!`
})

console.log('⎯'.repeat(process.stdout.columns));
console.log(`
    ${chalk.greenBright(chalk.bold(chalk.underline(`Your plugin '${data.name}' has been created successfully! Your next steps:`)))}

    ${chalk.greenBright(chalk.bold('*'))} ${chalk.greenBright('Run')} ${chalk.bold(`node build.mjs`)} ${chalk.greenBright('or')} ${chalk.bold(`nodemon`)} ${chalk.greenBright('to build your plugin.')}
    ${chalk.greenBright(chalk.bold('*'))} ${chalk.greenBright('Open a new terminal and run')} ${chalk.bold(`cd dist && http-server`)} ${chalk.greenBright('to serve the plugin locally.')}
    ${chalk.greenBright(chalk.bold('*'))} ${chalk.greenBright('Install it to your device via the url below:')}

    ${chalk.bold(`     http://<local-ip>:<port>/${data.id}/manifest.json`)}

    ${chalk.greenBright(chalk.bold('*'))} ${chalk.greenBright('Check out our documentation at')} ${chalk.bold('https://docs.unbound.rip')} ${chalk.greenBright('for help.')}
    ${chalk.greenBright(chalk.bold('*'))} ${chalk.greenBright('Have fun developing!')}
`.split('\n').map(x => x.trim()).join('\n'))