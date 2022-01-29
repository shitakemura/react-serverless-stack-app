import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getAuthFromHeader } from "./auth";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event: APIGatewayProxyEvent) => {
  const auth = getAuthFromHeader(event);

  const params = {
    TableName: process.env.TABLE_NAME as string,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": auth.sub,
    },
  };

  try {
    const result = await dynamoDb.query(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(result.Items),
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
