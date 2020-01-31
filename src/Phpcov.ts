import deploy from "./Deploy";
import { dirSync } from "tmp";
import { exec } from "@actions/exec";
import Config from "./types/PhpcovConfig";
import PhpcovOutput from "./types/PhpcovOutput";
import Metrix from "./Metrix";

/**
 * Runs the PHPCov Action that this package implements.
 * @param config The ActionConfig configuration object.
 */
export default async (config: Config): Promise<PhpcovOutput> => {
    // Temporary storage directory to store artifacts.
    const temporary = config.tempdir || dirSync().name;
    const storage = (e: string) => `${temporary}/${e}`;
    
    // Define arguments to pass to PHPUnit to produce reports.
    const html = `--coverage-html=${storage("report")}`;
    const clover = `--coverage-clover=${storage("report.xml")}`;

    // Run PHPUnit to produce an code coverage reports.
    const command = `${config.phpunit} ${html} ${clover}`.split(" ");
    await exec(command[0], command.splice(1), {
        cwd: config.workdir, 
        silent: (config.silent || false),
    });

    // Deploy the HTML report using Now.
    const deployment = await deploy(
        config.now_project, 
        config.now_token, 
        storage("report"),
    );

    // Parse the Clover XML report using Metrix.
    const metrix = await Metrix(storage("report.xml"));

    // Return the Phpcov Output object.
    return {deployment: deployment, metrix: metrix};
}
