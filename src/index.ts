import * as fs from "fs";
import { spawn } from "child_process";

(async function (): Promise<void> {
    let phpunit = spawn("./vendor/bin/phpunit", {
        cwd: process.env.GITHUB_WORKSPACE
    });
    phpunit.stdout.setEncoding('utf8');
    phpunit.stdout.on('data', function(data) {
        console.log(data);
    });
})();
