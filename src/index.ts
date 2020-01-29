import deploy from "./deploy";
import {exec} from "@actions/exec";
import * as core from "@actions/core";
import * as github from "@actions/github";
import * as webhooks from "@octokit/webhooks";

(async function (): Promise<void> {
    // Retrieve action inputs using actions core sdk.
    const token = core.getInput("now_token");

    // Prepare reference to use to publish coverage.
    const head: string = github.context.payload.after;
    const reference = `phpcov-${head.substr(0, 16)}`;

    // Prepare arguments for phpunit spawn.
    const cmd = "./vendor/bin/phpunit";
    const args = [`--coverage-html=/tmp/${reference}`];
    const opts = {cwd: process.env.GITHUB_WORKSPACE};

    // Run PHPUnit to produce an html code coverage report.
    await exec(cmd, args, opts)

    // Deploy coverage report using Now.
    const deployment = deploy(token, `/tmp/${reference}`);
    console.log(await deployment);
})();
