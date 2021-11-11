import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware";
import createError from "http-errors";
import { getTutorialById } from "./getTutorial";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function deleteTutorial(event, context) {
  const { tutorialId } = event.pathParameters;

  const tutorial = await getTutorialById(tutorialId);

  if (!tutorial) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        tutorial: tutorialId,
        error: "Tutorial ID not found",
      }),
    };
  }

  const now = new Date();

  const params = {
    TableName: process.env.TUTORIALS_TABLE_NAME,
    Key: { id: tutorial.id },
    UpdateExpression: "set deletedAt = :deletedAt",
    ExpressionAttributeValues: {
      ":deletedAt": now.toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    await dynamodb.update(params).promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ tutorial: tutorialId, message: "Tutorial deleted" }),
  };
}

export const handler = commonMiddleware(deleteTutorial);
