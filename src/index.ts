import now from "./deploy";
import * as temp from "tmp";
import parse from "./parse";
import * as clover from "./clover";
import * as exec from "@actions/exec";
import * as core from "@actions/core";
import * as github from "@actions/github";

(async function (): Promise<void> {
    // Temporary directory to store our reports.
    const temporary = temp.dirSync().name;

    // This is where we'll store the html report.
    const html_path = `${temporary}/report`;
    const clover_path = `${temporary}/report.xml`;

    // Define the current working directory to run PHPUnit in.
    const cwd = process.env.GITHUB_WORKSPACE + "/" + core.getInput("path");

    // Run PHPUnit to produce an code coverage report(s).
    await exec.exec("./vendor/bin/phpunit", [
        `--coverage-html=${html_path}`,
        `--coverage-clover=${clover_path}`,
    ], {cwd: cwd, silent: true});

    // We'll use the sha of the GitHub Action.
    const sha: string = github.context.sha;

    // Retrieve action inputs using actions core sdk.
    const now_token = core.getInput("now_token");
    
    const repo = github.context.repo;
    // Prepare project name to use to publish coverage. Use input value or default.
    const name = core.getInput("now_project") || `phpcov-${repo.owner}-${repo.repo}`;

    // Deploy coverage report using Now.
    const deployment = await now(name, now_token, html_path);
    core.setOutput("url", `https://${deployment.url}`);

    // Display the found URL as a console log message.
    console.log("You may find a full coverage report here: ");
    console.log("https://${deployment.url}");

    // Parse coverage metrics from clover xml report.
    const clover: clover.Root = await parse(clover_path);
    const metrix = clover.coverage.project[0].metrics[0]["$"];

    // Check whether the total coverage is above the minimum.
    const min_coverage = Number(core.getInput("min_coverage"));
    const coverage = metrix.coveredstatements / metrix.statements;
    if (coverage < min_coverage) core.setFailed("Minimum coverage not met.");
    console.log(`Actual coverage is ${coverage}%. Minimum is ${min_coverage}%`);
})();
