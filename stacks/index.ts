import * as sst from "@serverless-stack/resources";
import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack";

export default function main(app: sst.App): void {
  const storageStack = new StorageStack(app, "storage");

  const authStack = new AuthStack(app, "auth");

  new ApiStack(app, "api", {
    auth: authStack.auth,
    table: storageStack.table,
  });
}
