import { createDeployment } from "now-client";

export default async function (token: string, path: string) {
    const events = createDeployment({token: token, path: path}, {})
    for await (const event of events)
      if (event.type === 'ready')
        return event.payload;
};
