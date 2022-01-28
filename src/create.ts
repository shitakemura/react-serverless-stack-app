import * as uuid from "uuid";
import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const data = JSON.parse(event.body as string);

  const params = {
    TableName: process.env.TABLE_NAME as string,
    Item: {
      userId: "123",
      todoId: uuid.v1(),
      content: data.content,
      createdAt: Date.now(), // current Unix timestamp
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
