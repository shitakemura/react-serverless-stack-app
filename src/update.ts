import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const data = JSON.parse(event.body as string);

  const params = {
    TableName: process.env.TABLE_NAME as string,
    Key: {
      userId: "123",
      todoId: event.pathParameters?.id,
    },
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content || null,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await dynamoDb.update(params).promise();

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
