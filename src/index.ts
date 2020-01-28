import deploy from "./deploy";
import * as core from "@actions/core";
import { spawnSync } from "child_process";

(async function (): Promise<void> {
    // Retrieve action inputs using actions core sdk.
    const token = core.getInput('now_token');

    // Prepare arguments for phpunit spawn.
    const cmd = "./vendor/bin/phpunit";
    const args = ["--coverage-html=/tmp/report-yiogtedwrb"];
    const opts = {cwd: process.env.GITHUB_WORKSPACE, encoding: 'utf8'};

    // Run PHPUnit to produce an html code coverage report.
    const phpunit = spawnSync(cmd, args, opts);
    console.log(phpunit.stdout);

    // Deploy coverage report using Now.
    deploy(token, "/tmp/report-yiogtedwrb");
})();
