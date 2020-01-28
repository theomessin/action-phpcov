import * as fs from "fs";

(async function (): Promise<void> {
    const path = process.env.GITHUB_WORKSPACE;
    console.log(fs.readdirSync(path));
})();
