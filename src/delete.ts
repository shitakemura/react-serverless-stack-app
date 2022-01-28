import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: process.env.TABLE_NAME as string,
    Key: {
      userId: "123",
      todoId: event.pathParameters?.id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true }),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
