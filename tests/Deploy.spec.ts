import * as now from "now-client";
import Deploy from "../src/Deploy";

// Mock underlying dependencies.
jest.mock("now-client");
// Clear all mocks before each test.
beforeEach(() => { jest.clearAllMocks(); });

interface event {
    type: string;
    payload?: string;
};

/**
 * This function is used to mock now.createDeployment.
 * Initially the first async output will be "not_ready".
 * Then a "ready" event will be returned with the payload.
 * @param payload The final deployment url for "ready" event.
 */
const _createDeployMocker = (payload: string) => (
async function* (): AsyncGenerator<event, void> {
    let counter = 0;  // Initially this will be zero, then 1, then 2.
    const events: event[] = [{type: "not_ready"}, {type: "ready",payload: payload}];
    while (counter < 2) yield events[counter++];
})();

test("it creates correct Deployment and returns url", async () => {
    // Arrange: Mock now.createDeployment to return a url.
    const expected_deployment_url = "https://example.now.sh";
    const _mock = () => _createDeployMocker(expected_deployment_url);
    (<jest.Mock>now.createDeployment).mockImplementation(_mock);
    // Arrange: prepare arguments for Deploy.
    const project = "my-zeit-now-project";
    const token = "MY-ZEIT-NOW-TOKEN";
    const path = "/tmp/coverage/report";
    // Arrange: prepare expected createDeployment arguments.
    const expected_deployment_opts: now.DeploymentOptions = { name: project };
    const expected_client_opts: now.NowClientOptions = { token: token, path: path };

    // Act: call Deploy with prepared arguments.
    const deployment_url = await Deploy(project, token, path);

    // Assert: createDeployment was called just once.
    expect(now.createDeployment).toHaveBeenCalledTimes(1);
    // Assert: createDeployment was called with correct arguments.
    expect(now.createDeployment).toHaveBeenCalledWith(expected_client_opts, expected_deployment_opts);
    // Assert: createDeployment return value is the Deployment url.
    expect(deployment_url).toBe(expected_deployment_url);
});
