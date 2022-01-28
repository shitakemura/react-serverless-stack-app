import * as sst from "@serverless-stack/resources";

interface FrontendStackProps extends sst.AppProps {
  api: sst.Api;
  auth: sst.Auth;
}

export default class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const { api, auth } = props;

    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool?.userPoolId ?? "",
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient?.userPoolClientId ?? "",
      },
    });

    this.addOutputs({
      SiteUrl: site.url,
    });
  }
}
