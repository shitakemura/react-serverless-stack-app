import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";
import FrontendStack from "./FrontendStack";

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, "storage");

  const authStack = new AuthStack(app, "auth");

  const apiStack = new ApiStack(app, "api", {
    auth: authStack.auth,
    table: storageStack.table,
  });

  new FrontendStack(app, "frontend", {
    api: apiStack.api,
    auth: authStack.auth,
  });
}
