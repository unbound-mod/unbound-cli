import chalk from "chalk"
import inquirer from "inquirer";
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { createSpinner } from 'nanospinner';

const choices = [
    {
        name: 'delete',
        description: 'Delete the existing plugin and continue.',
        async callback(id: string) {
            const spinner = createSpinner('Deleting existing directory...');

            await fs.rm(`./plugins/${id}`, { recursive: true, force: true });

            spinner.success({
                text: 'Successfully deleted existing plugin.'
            });
        }
    },
    {
        name: 'new',
        description: 'Choose a new identifier and continue.',
        async callback() {
            const { id } = await inquirer.prompt({
                name: 'id',
                type: 'input',
                message: 'Enter the new identifier:',
                default() {
                    return 'your.plugin.id'
                }
            })

            return id;
        }
    },
    {
        name: 'exit',
        description: 'Exit the process and try again later.',
        async callback() {
            process.exit(0);
        }
    }
]

async function handlePluginExists(baseId: string) {
    let id = baseId;

    while (true) {
        if (existsSync(`./plugins/${id}`)) {
            console.log(chalk.bold(chalk.bold(chalk.yellowBright('A plugin already exists with that identifier!'))))

            const { chosenOption } = await inquirer.prompt({
                name: 'chosenOption',
                type: 'list',
                message: 'What would you like to do?',
                choices: choices.map((template, i) => `${i + 1}) ${template.description}`)
            })

            const newId = await choices[chosenOption[0] - 1].callback(id);

            if (newId) {
                id = newId;
            }
        } else {
            return id;
        }
    }
}

export default handlePluginExists;