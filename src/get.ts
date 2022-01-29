import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
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
    const result = await dynamoDb.get(params).promise();

    if (result.Item) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ error: "Item not found" }),
      };
    }
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
