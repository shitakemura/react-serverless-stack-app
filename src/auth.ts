import { APIGatewayProxyEvent } from "aws-lambda";
import jwt_decode from "jwt-decode";

type Auth = {
  // Cognito user id
  sub: string;
};

export const getAuthFromHeader = (event: APIGatewayProxyEvent) => {
  const header = event.headers["authorization"];
  // remove Bearer string
  const token = header?.split(" ")[1] || "";
  return jwt_decode<Auth>(token);
};
