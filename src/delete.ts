import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";
import { getAuthFromHeader } from "./auth";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const auth = getAuthFromHeader(event);

  const params = {
    TableName: process.env.TABLE_NAME as string,
    Key: {
      userId: auth.sub,
      todoId: event.pathParameters?.id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ status: true }),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: e.message }),
    };
  }
};
