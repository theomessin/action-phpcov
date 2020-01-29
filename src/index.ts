import purdy from "purdy";
import * as temp from "tmp";
import deploy from "./deploy";
import {exec} from "@actions/exec";
import * as core from "@actions/core";
import * as github from "@actions/github";
import * as webhooks from "@octokit/webhooks";

(async function (): Promise<void> {
    // Temporary directory to store our reports.
    const temporary = temp.dirSync().name;

    // Retrieve action inputs using actions core sdk.
    const token = core.getInput("now_token");

    // Prepare report paths.
    const coverage_html = `${temporary}/html_report`;
    const coverage_xml = `${temporary}/report.xml`;

    // Prepare arguments for phpunit spawn.
    const cmd = "./vendor/bin/phpunit";
    const args = [
        `--coverage-html=${coverage_html}`,
        `--coverage-xml=${coverage_xml}`,
    ];
    const opts = {cwd: process.env.GITHUB_WORKSPACE};

    // Run PHPUnit to produce an html code coverage report.
    await exec(cmd, args, opts);

    // Prepare github event context variables.
    const commit: string = github.context.payload.after;

    // Prepare domain to use to publish coverage.
    const domain = `phpcov-${commit.substr(0, 7)}`;

    // Deploy coverage report using Now.
    const deployment = await deploy(domain, token, coverage_html);
    core.setOutput("report_url", deployment.url);
})();
