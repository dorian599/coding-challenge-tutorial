const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        videoUrl: { type: "string", format: "uri" },
        publishedStatus: {
          type: "string",
          enum: ["notPublished", "published"],
        },
      },
      required: ["title", "publishedStatus"],
    },
  },
};

export default schema;
