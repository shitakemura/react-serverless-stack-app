import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
  public auth: sst.Auth;

  constructor(scope: sst.App, id: string, props?: sst.AppProps) {
    super(scope, id, props);

    this.auth = new sst.Auth(this, "Auth", {
      cognito: {
        userPool: {
          signInAliases: { email: true },
        },
        // userPoolClient: {
        //   authFlows: { userPassword: true },
        // },
      },
    });

    this.addOutputs({
      Region: scope.region,
      UserPoolId: this.auth.cognitoUserPool?.userPoolId ?? "",
      UserPoolClientId: this.auth.cognitoUserPoolClient?.userPoolClientId ?? "",
    });
  }
}
