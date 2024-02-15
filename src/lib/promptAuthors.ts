import inquirer from "inquirer";

const authorMap = {
    ADD_AUTHOR: 'Add a new plugin author',
    CONTINUE: 'Continue to template'
}

async function promptAuthors() {
    const authors: any[] = [];

    while (true) {
        console.log('⎯'.repeat(process.stdout.columns));

        const { authorChoice } = await inquirer.prompt({
            name: 'authorChoice',
            type: 'list',
            message: 'Would you like to add a new plugin author?',
            choices: Object.values(authorMap)
        })

        if (authorChoice === authorMap.CONTINUE) {
            return authors;
        }

        const { name } = await inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Please enter the author\'s name:',
            default() {
                return 'you'
            }
        })

        const { id } = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: `Please enter ${name}\'s discord identifier:`,
            default() {
                return '<id>'
            }
        })

        authors.push({
            name,
            id
        });
    }
}

export default promptAuthors;