<h1 align="center">


**NestJs + RabbitMQ miscroservices project**


</h1>


## Description

An application consisting of two microservices: auth - provides JWT authorization, CRUD operations for users, and a role model (access to endpoints for certain roles); profile - CRUD operations for working with user profiles

Microservice architecture pattern used in this app is API gateway

Messaging between microservices is done by RabbitMQ. Each microservice has its own database

Application runs with docker. Each microservice and database runs inside its own container

## Stack

NestJs, TypeScript, RabbitMQ, PostgreSQL, TypeORM, Swagger

## Installation

```bash
npm install
```

## Running the app

```bash
docker-compose up --build
```

## Documentation

To see functionality of app you can start it and use link below:

```bash
http://localhost:3000/docs
```