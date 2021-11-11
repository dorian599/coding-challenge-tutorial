import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware";
import validator from "@middy/validator";
import createError from "http-errors";
import editTutorialSchema from "../../lib/schemas/editTutorialSchema";
import { getTutorialById } from "./getTutorial";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function editTutorial(event, context) {
  const { tutorialId } = event.pathParameters;
  const { title, videoUrl, description, publishedStatus } = event.body;

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
  const params = {
    TableName: process.env.TUTORIALS_TABLE_NAME,
    Key: { id: tutorial.id },
    UpdateExpression:
      "set title = :title, videoUrl = :videoUrl, description = :description, publishedStatus = :publishedStatus",
    ExpressionAttributeValues: {
      ":title": title || tutorial.title,
      ":videoUrl": videoUrl || tutorial.videoUrl,
      ":description": description || tutorial.description,
      ":publishedStatus": publishedStatus || tutorial.publishedStatus,
    },
    ReturnValues: "ALL_NEW",
  };

  let updatedTutorial;

  try {
    const result = await dynamodb.update(params).promise();
    updatedTutorial = result.Attributes;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updatedTutorial }),
  };
}

export const handler = commonMiddleware(editTutorial).use(
  validator({ inputSchema: editTutorialSchema })
);
