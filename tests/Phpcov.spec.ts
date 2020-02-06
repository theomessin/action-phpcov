import { dirSync } from "tmp";
import Deploy from "../src/Deploy";
import Phpcov from "../src/Phpcov";
import Metrix from "../src/Metrix";
import { exec } from "@actions/exec";
import * as core from "@actions/core";
import { Deployment } from "now-client";
import PhpcovConfig from "../src/types/PhpcovConfig";
import PhpcovOutput from "../src/types/PhpcovOutput";
import CoverageMetrix from "../src/types/CoverageMetrix";

jest.mock("tmp");
jest.mock("@actions/core");
jest.mock("@actions/exec");
jest.mock("../src/Deploy");
jest.mock("../src/Metrix");
beforeEach(() => { jest.clearAllMocks(); });

const default_config: PhpcovConfig = {
    now_project: "FACTORY",
    now_token: "FACTORY",
    phpunit: "FACTORY",
    silent: false,
    tempdir: null,
    workdir: "FACTORY",
};

test("it produces coverage reports", async () => {
    // Arrange: exec Deploy to return success.
    (<jest.Mock>exec).mockReturnValue(0);
    // Predefine Phpcov config paths.
    const binary = "./vendor/bin/phpunit --testdox";
    const workdir = "/home/theomessin";
    const tempdir = "/tmp/action-phpcov";
    // Arrange: prepare expected exec arguments.
    const command = "./vendor/bin/phpunit"
    const path_html = "/tmp/action-phpcov/report";
    const path_xml = "/tmp/action-phpcov/report.xml";
    const opts = { "cwd": workdir, "silent": false };
    const args = ["--testdox", `--coverage-html=${path_html}`, `--coverage-clover=${path_xml}`];

    // Act: run Phpcov with test config.
    await Phpcov({
        ...default_config,
        phpunit: binary,
        tempdir: tempdir,
        workdir: workdir,
    });

    // Assert: exec was called just once.
    expect(exec).toHaveBeenCalledTimes(1);
    // Assert: GitHub Actions exec was called with correct arguments.
    expect(exec).toHaveBeenCalledWith(command, expect.arrayContaining(args), opts);
    // Assert: core set failed was called.
    expect(core.setFailed).not.toBeCalled();
});

test("it uses temporary directory if none given", async () => {
    // Arrange: mock tmp.dirSync to return a pre-set folder.
    (<jest.Mock>dirSync).mockReturnValue({ name: "/tmp/mocked" });

    // Act: run Phpcov with test config.
    await Phpcov(default_config);

    // Assert: dirSync called once.
    expect(dirSync).toBeCalledTimes(1);
    // Assert: dirSync called with no arguments.
    expect(dirSync).toBeCalledWith();
    // Assert: exec was called with correct arguments.
    expect(exec).toHaveBeenCalledWith(
        expect.anything(),
        expect.arrayContaining([expect.stringContaining("mocked")]),
        expect.anything(),
    );
});

test("it deploys html report", async () => {
    // Predefine Phpcov config paths.
    const tempdir = "/tmp";
    const now_project = "my-project";
    const now_token = "MY-ZEIT-NOW-TOKEN";
    // Arrange: prepare expected exec arguments.
    const path_html = "/tmp/report";

    // Act: run Phpcov with test config.
    await Phpcov({
        ...default_config,
        now_project: now_project,
        now_token: now_token,
        tempdir: tempdir,
    });

    // Assert: deploy was called just once.
    expect(Deploy).toHaveBeenCalledTimes(1);
    // Assert: deploy was called with correct arguments.
    expect(Deploy).toHaveBeenCalledWith("my-project", "MY-ZEIT-NOW-TOKEN", path_html);
});

test("it returns the deployment", async () => {
    // Arrange: prepare the expected url.
    const __url = "https://example.now.sh";
    const __deployment = <Deployment>{url: __url};
    // Arrange: mock Deploy to return a pre-set url.
    (<jest.Mock>Deploy).mockReturnValue(__deployment);
    // Arrange: prepare the expected output.
    const __output = {deployment: __deployment};

    // Act: run Phpcov with test config.
    const output = await Phpcov(default_config);

    // Assert: deploy was called just once.
    expect(output).toMatchObject(__output);
});

test("it returns the coverage metrix", async () => {
    const __metrix = <CoverageMetrix>{coverage: (1/2)};
    // Arrange: mock Deploy to return a pre-set url.
    (<jest.Mock>Metrix).mockReturnValue(__metrix);
    // Arrange: prepare the expected output.
    const __output = {metrix: __metrix};

    // Act: run Phpcov with test config.
    const output = await Phpcov(default_config);

    // Assert: deploy was called just once.
    expect(output).toMatchObject(__output);
});

test("it sets core to failed if phpunit fails", async () => {
    // Arrange: mock Deploy to return a pre-set url.
    (<jest.Mock>exec).mockReturnValue(1);

    // Act: run Phpcov with test config.
    await Phpcov(default_config);

    // Assert: deploy was called just once.
    expect(core.setFailed).toBeCalledWith("PHPUnit test suite failed.");
});
