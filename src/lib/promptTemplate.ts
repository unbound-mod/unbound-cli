import inquirer from "inquirer";
import templates from "./templates";

async function promptTemplate() {
    console.log('⎯'.repeat(process.stdout.columns));

    const { chosenTemplate } = await inquirer.prompt({
        name: 'chosenTemplate',
        type: 'list',
        message: 'What template would you like to use?',
        choices: templates.map((template, i) => `${i + 1}) ${template.description}`)
    })

    /**
     * Gets the original index of the template chosen
     * Example input: '1) Completely empty template. You will need to implement everything yourself.'
     * This gets the 0th character, in this case '1', subtracts 1 to get 0, and indexes the templates array with it.
     */
    return templates[chosenTemplate[0] - 1];
}

export default promptTemplate;