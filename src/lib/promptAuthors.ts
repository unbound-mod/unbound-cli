import inquirer from "inquirer";

const authorMap = {
    ADD_AUTHOR: 'Add an author',
    CONTINUE: 'Continue'
}

async function promptAuthors() {
    const authors: any[] = [];

    while (true) {
        console.log('⎯'.repeat(process.stdout.columns));

        const { authorChoice } = await inquirer.prompt({
            name: 'authorChoice',
            type: 'list',
            message: 'Add a plugin author?',
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
                return 'eternal'
            }
        })

        const { id } = await inquirer.prompt({
            name: 'id',
            type: 'input',
            message: 'Please enter the author\'s discord identifier:',
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