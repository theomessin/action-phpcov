import * as now from "now-client";

export default async function (
  name: string, 
  token: string, 
  path: string,
  production: boolean = true,
): Promise<now.Deployment> {
  const target = production ? "production" : "staging";
  const deployment_opts: now.DeploymentOptions = {name: name, target: target};
  const client_opts: now.NowClientOptions = {token: token, path: path};
  const events = now.createDeployment(client_opts, deployment_opts);
  for await (const event of events) {
    if (event.type === 'ready') {
      return event.payload;
    }
  }
};
