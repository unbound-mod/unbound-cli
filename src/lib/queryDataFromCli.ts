import chalk from "chalk";

import promptBasicInformation from "./promptBasicInformation";
import promptAuthors from "./promptAuthors";
import promptTemplate from "./promptTemplate";

async function queryDataFromCli() {
    console.log('\n');
    console.log(chalk.bold(chalk.underline(chalk.magenta('Welcome to the Unbound Plugin Generator!'))));
    console.log('⎯'.repeat(process.stdout.columns));

    const information = await promptBasicInformation();
    const authors = await promptAuthors();
    const template = await promptTemplate();

    return {
        ...information,
        authors,
        template
    }
}

export default queryDataFromCli;