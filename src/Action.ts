import Phpcov from "./Phpcov";
import * as chalk from 'chalk';
import Progress from "./Progress";
import * as core from "@actions/core";

export default async function Action () {
    // Call Phpcov with appropriate arguments.
    const output = await Phpcov({
        now_project: core.getInput("now_project"),
        now_token: core.getInput("now_token"),
        phpunit: core.getInput("phpunit"),
        workdir: process.env.GITHUB_WORKSPACE,
    });

    // Set the coverage report url.
    const report_url = `https://${output.deployment.url}`;
    core.setOutput("url", report_url);
    // Populate coverage numbers.
    const actual = output.metrix.coverage
    const pretty = (actual * 100).toFixed(2);
    const minimum = Number(core.getInput("min_coverage"));
    const blue = (s: string) => {console.log(chalk.blue(s))};

    // Print the coverage level in text.
    blue(`\n[Actual coverage is ${pretty}%. Minimum coverage is ${minimum}%]`);
    // Now Print the coverage level as a progress bar.
    blue(Progress(actual, 24));
    // Now show the link for more information.
    blue(`You may find a full coverage report here:`);
    blue(report_url + "\n");
    if ((actual * 100) < minimum) core.setFailed("Minimum coverage has not met.");
};
