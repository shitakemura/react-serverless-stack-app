import * as uuid from "uuid";
import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getAuthFromHeader } from "./auth";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const auth = getAuthFromHeader(event);
  const data = JSON.parse(event.body as string);

  const params = {
    TableName: process.env.TABLE_NAME as string,
    Item: {
      userId: auth.sub,
      todoId: uuid.v1(),
      content: data.content,
      createdAt: Date.now(), // current Unix timestamp
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(params.Item),
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
