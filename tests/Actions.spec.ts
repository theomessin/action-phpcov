import Action from "../src/Action";
import Phpcov from "../src/Phpcov";
import PhpcovOutput from "../src/types/PhpcovOutput";
import PhpcovConfig from "../src/types/PhpcovConfig";
import { getInput, setOutput, setFailed } from "@actions/core";

// Mock console.log - used to check the console output from Action.
const consolelogspy = jest.spyOn(console, 'log').mockImplementation();

// Mock underlying dependencies.
jest.mock("@actions/core");
jest.mock("../src/Phpcov");
// Clear all mocks before each test.
beforeEach(() => { jest.clearAllMocks(); });

// Prepare mocked GitHub Actions inputs.
const __now_project = "zeit-project";
const __now_token = "MY-ZEIT-NOW-TOKEN";
const __phpunit = "./vendor/bin/phpunit";

// Mock GitHub Actions core getInput.
(<jest.Mock>getInput).mockImplementation((name: string) => {
    switch (name) {
        case "now_project":
            return __now_project;
        case "now_token":
            return __now_token;
        case "min_coverage":
            return 35;
        case "phpunit":
            return __phpunit;
    }
});

// Set GITHUB_WORKSPACE environment variable.
const __workdir = "/github/workspace";
process.env.GITHUB_WORKSPACE = __workdir;
const __dashboardurl = "example.now.sh";

const __phpcovoutput = (function (coverage: number) {
    return {
        deployment: { url: __dashboardurl },
        "metrix": { coverage: coverage },
    };
});

const __phpcovconfig: PhpcovConfig = {
    now_project: __now_project,
    now_token: __now_token,
    phpunit: __phpunit,
    workdir: __workdir,
};

test("it calls phpcov correctly", async () => {
    // Arrange: Mock Phpcov return value to __phpcovoutput.
    (<jest.Mock>Phpcov).mockResolvedValue(__phpcovoutput(.5));
    // Act: run Action.
    await Action();
    // Assert: phpcov called correctly.
    expect(Phpcov).toBeCalledTimes(1);
    expect(Phpcov).toBeCalledWith(__phpcovconfig);
});

test("it outputs to console correctly", async () => {
    // Arrange: Mock Phpcov return value to __phpcovoutput.
    (<jest.Mock>Phpcov).mockResolvedValue(__phpcovoutput(.5));
    // Act: run Action.
    await Action();

    // Get terminal output.
    const output = consolelogspy.mock.calls.map(x => x[0]).join("\n");

    // Assert: output contains minimum coverage.
    expect(output).toMatch("35%");
    // Assert: output contains actual coverage.
    expect(output).toMatch("50.00%");
    // Assert: output contains percentage bar.
    expect(output).toMatch("▰▰▰▰▱▱▱▱");
    // Assert: output contains report url.
    expect(output).toMatch(__dashboardurl);
});

test("it fails if minimum coverage is not met", async () => {
    // Arrange: Mock Phpcov return value to __phpcovoutput.
    (<jest.Mock>Phpcov).mockResolvedValue(__phpcovoutput(.25));
    // Act: run Action.
    await Action();

    // Get terminal output.
    const output = consolelogspy.mock.calls.map(x => x[0]).join("\n");

    // Assert: output contains minimum coverage.
    expect(output).toMatch("35%");
    // Assert: output contains actual coverage.
    expect(setFailed).toBeCalledTimes(1);
});

test("it sets GitHub Action url output correctly", async () => {
    // Arrange: Mock Phpcov return value to __phpcovoutput.
    (<jest.Mock>Phpcov).mockResolvedValue(__phpcovoutput(.50));
    // Act: run Action.
    await Action();
    // Assert: GitHub Actions output set.
    expect(setOutput).toBeCalledTimes(1);
    expect(setOutput).toBeCalledWith("url", "https://" + __dashboardurl);
});
