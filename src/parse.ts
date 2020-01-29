import * as fs from "fs";
import {Parser} from "xml2js";
export default async function (
  path: string,
): Promise<any> {
    const parser = new Parser();
    const xml = fs.readFileSync(path);
    return parser.parseStringPromise(xml);
};
