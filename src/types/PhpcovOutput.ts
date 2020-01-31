import { Deployment } from "now-client";
import CoverageMetrix from "./CoverageMetrix";

/**
 * Phpcov output object.
 */
export default interface PhpcovOutput {
    metrix: CoverageMetrix;
    deployment: Deployment;
};
