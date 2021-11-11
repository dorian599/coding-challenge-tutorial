import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware";
import validator from "@middy/validator";
import createError from "http-errors";
import createTutorialSchema from "../../lib/schemas/createTutorialSchema";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createTutorial(event, context) {
  const { title, videoUrl, description, publishedStatus } = event.body;

  const tutorial = {
    id: uuid(),
    title,
    videoUrl,
    description,
    publishedStatus: publishedStatus || "notPublished",
    deletedAt: "",
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.TUTORIALS_TABLE_NAME,
        Item: tutorial,
      })
      .promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ tutorial }),
  };
  
}

export const handler = commonMiddleware(createTutorial).use(
  validator({ inputSchema: createTutorialSchema })
);
