import * as fs from "fs";
import { Parser } from "xml2js";
import CloverXml from "./types/CloverXml";
import CoverageMetrix from "./types/CoverageMetrix";

/**
 * Parse clover xml report to coverage metrix.
 * @param path The path to the clover xml report.
 */
export default async function (
    path: string
): Promise<CoverageMetrix> {
    const parser = new Parser();
    const xml = fs.readFileSync(path);
    const clover: CloverXml = await parser.parseStringPromise(xml);
    const metrix = clover.coverage.project[0].metrics[0]["$"];
    return {coverage: (metrix.coveredstatements / metrix.statements)};
};
