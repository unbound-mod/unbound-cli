import inquirer from "inquirer"

async function promptBasicInformation() {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Plugin\'s name:',
        default() {
            return 'test'
        }
    })

    const { id } = await inquirer.prompt({
        name: 'id',
        type: 'input',
        message: 'Plugin\'s identifier:',
        default() {
            return 'your.plugin.id'
        }
    })

    const { icon } = await inquirer.prompt({
        name: 'icon',
        type: 'input',
        message: 'Plugin\'s icon:',
        default() {
            return 'ic_star_filled'
        }
    })

    const { description } = await inquirer.prompt({
        name: 'description',
        type: 'input',
        message: 'Plugin\'s description:',
        default() {
            return 'A plugin that does things'
        }
    })

    return {
        name,
        id,
        icon,
        description
    }
}

export default promptBasicInformation;