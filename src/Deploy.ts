import * as now from "now-client";

export default async (
  project: string, 
  token: string, 
  path: string,
): Promise<now.Deployment> => {
  const deployment_opts: now.DeploymentOptions = {name: project};
  const client_opts: now.NowClientOptions = {token: token, path: path};
  const events = now.createDeployment(client_opts, deployment_opts);
  for await (const event of events) {
    if (event.type == "ready") {
      return event.payload;
    }
  }
};
