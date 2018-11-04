import * as _Neon from "@cityofzion/neon-core";
import * as plugin from "./plugin";

function bundle<T extends typeof _Neon>(
      neonCore: T
): T & { nns: typeof plugin } {
      return { ...(neonCore as any), nns: plugin };
}

export default bundle;
export * from "./plugin";

