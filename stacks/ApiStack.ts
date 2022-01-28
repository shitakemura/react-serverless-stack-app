import * as sst from "@serverless-stack/resources";

interface ApiStackProps extends sst.StackProps {
  table: sst.Table;
}

export default class ApiStack extends sst.Stack {
  public api: sst.Api;

  constructor(scope: sst.App, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
        "GET /todos": "src/list.main",
        "POST /todos": "src/create.main",
        "GET /todos/{id}": "src/get.main",
        "PUT /todos/{id}": "src/update.main",
        "DELETE /todos/{id}": "src/delete.main",
      },
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
