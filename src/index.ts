import purdy from "purdy";
import * as temp from "tmp";
import now from "./deploy";
import * as exec from "@actions/exec";
import * as core from "@actions/core";
import * as github from "@actions/github";

(async function (): Promise<void> {
    // Temporary directory to store our reports.
    const temporary = temp.dirSync().name;

    // This is where we'll store the html report.
    const html_report = `${temporary}/html_report`;

    // Run PHPUnit to produce an code coverage report(s).
    await exec.exec(
        "./vendor/bin/phpunit", 
        [`--coverage-html=${html_report}`],
        {cwd: process.env.GITHUB_WORKSPACE},
    );

    // We'll use the sha of the GitHub Action.
    const sha: string = github.context.sha;
    // Prepare domain to use to publish coverage.
    const domain = `phpcov-${sha.substr(0, 7)}`;

    // Retrieve action inputs using actions core sdk.
    const now_token = core.getInput("now_token");

    // Deploy coverage report using Now.
    const deployment = await now(domain, now_token, html_report);
    core.setOutput("url", deployment.url);
})();
