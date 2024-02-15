import chalk from "chalk"

function handleNotInRepo(fileExists: boolean) {
    if (!fileExists) {
        console.log(`
            ${chalk.bold(chalk.underline(chalk.redBright('You are not currently in an Unbound Repository!')))}
            ${chalk.redBright('Please follow the steps below to generate one:')}
    
            ${chalk.bold(chalk.yellow('1.'))} ${chalk.yellowBright('Go to')} ${chalk.bold('https://github.com/unbound-mod/unbound-plugin-template')}
            ${chalk.bold(chalk.yellow('2.'))} ${chalk.yellowBright('Click on')} ${chalk.bold('\'Use this template\'')}
            ${chalk.bold(chalk.yellow('3.'))} ${chalk.yellowBright('Run')} ${chalk.bold('git clone https://github.com/your-name/your-repo')}
            ${chalk.bold(chalk.yellow('4.'))} ${chalk.yellowBright('Run')} ${chalk.bold('cd your-repo')}
            ${chalk.bold(chalk.yellow('5.'))} ${chalk.yellowBright('Run')} ${chalk.bold('pnpm i')}
            ${chalk.bold(chalk.yellow('6.'))} ${chalk.yellowBright('Restart your terminal.')}
    
            ${chalk.redBright('You may now re-run this CLI in that folder.')}
        `.split('\n').map(x => x.trim()).join('\n'))
        process.exit(1)
    }
}

export default handleNotInRepo;