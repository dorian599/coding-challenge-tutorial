import AWS from "aws-sdk";
import createError from "http-errors";
import commonMiddleware from "../../lib/commonMiddleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getTutorialById(id) {
  let tutorial;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.TUTORIALS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    tutorial = result.Item;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  if (!tutorial) {
    tutorial = null;
  }

  return tutorial;
}

async function getTutorial(event, context) {
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

  return {
    statusCode: 200,
    body: JSON.stringify({ tutorial }),
  };
}

export const handler = commonMiddleware(getTutorial);
