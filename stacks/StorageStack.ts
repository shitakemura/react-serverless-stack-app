import * as sst from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack {
  public table: sst.Table;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.table = new sst.Table(this, "Todos", {
      fields: {
        userId: sst.TableFieldType.STRING,
        todoId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "todoId" },
    });
  }
}
