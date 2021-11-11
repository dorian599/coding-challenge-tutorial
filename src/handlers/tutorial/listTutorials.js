import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../../lib/commonMiddleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getTutorials() {
  let tutorials;

  try {
    const result = await dynamodb
      .scan({
        TableName: process.env.TUTORIALS_TABLE_NAME,
      })
      .promise();

    tutorials = result.Items;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  if (!tutorials) {
    tutorials = null;
  }

  return tutorials;
}

async function listTutorials(event, context) {
  const tutorials = await getTutorials();

  if (!tutorials) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        count: 0,
        tutorials: {},
        message: "No tutorials to display",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ count: tutorials.length, tutorials }),
  };
}

export const handler = commonMiddleware(listTutorials);
