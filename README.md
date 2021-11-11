# Coding Challenge Tutorial

This is a 100% Aws Serverless implementation using the **[serverless framework](https://www.serverless.com/)** to handle the deployments and also to handle the services/resources the application needs.

## Services implemented

- AWS Lambda (NodeJS 12.x)
- AWS IAM roles
- AWS DynamoDB
- AWS Api Gateway

## Deployment

Is pretty straightforward, just execute the following command:

### Install Dependencies

```
npm install
```

### Deploy

```
sls deploy
```

## Documentation

- **[Postman Collection](./docs/Tutorial-Demo.postman_collection.json)**

## Endpoints

- **POST** /tutorials
- **GET** /tutorials/{id}
- **PUT** /tutorials/{id}
- **GET** /tutorials
- **DELETE** /tutorials/{id}
