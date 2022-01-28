import * as sst from "@serverless-stack/resources";
import * as apigAuthorizers from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { UserPoolClient } from "aws-cdk-lib/aws-cognito";

interface ApiStackProps extends sst.StackProps {
  auth: sst.Auth;
  table: sst.Table;
}

export default class ApiStack extends sst.Stack {
  public api: sst.Api;

  constructor(scope: sst.App, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { auth, table } = props;

    this.api = new sst.Api(this, "Api", {
      defaultAuthorizer: new apigAuthorizers.HttpUserPoolAuthorizer(
        "Authorizer",
        auth.cognitoUserPool as cognito.UserPool,
        {
          userPoolClients: [
            auth.cognitoUserPoolClient as cognito.UserPoolClient,
          ],
        }
      ),
      // JWT認証
      defaultAuthorizationType: sst.ApiAuthorizationType.JWT,
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
