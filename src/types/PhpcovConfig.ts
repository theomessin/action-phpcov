/**
 * Phpcov configuration object.
 */
export default interface PhpcovConfig {
    /**
     * (Required) Your ZEIT Now project.
     * Used to deploy html report to web.
     */
    now_project: string;

    /**
     * (Required) Your ZEIT Now token.
     * Used to deploy html report to web.
     */
    now_token: string;

    /**
     * (Required) The path to the PHPUnit binary.
     * Additional arguments such as --testdox may be passed.
     */
    phpunit: string;

    /**
     * (Optional) Whether to execute PHPUnit in silent mode.
     * Default value is false.
     */
    silent?: boolean;

    /**
     * (Optional) The directory to use for storing artifacts.
     * Default value will be infered using the "tmp" package.
     */
    tempdir?: string;

    /**
     * (Required) The current working directory.
     * Will be used to run PHPUnit to produce reports.
     */
    workdir: string;
};
