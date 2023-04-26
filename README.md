<h1 align="center">


**NestJs + RabbitMQ miscroservices project**


</h1>


## Description

Training project consists of 2 microservices: auth - provides JWT authorisation, user CRUD operations and role model; profile - CRUD operations for user's profile

Messaging between microservices is done by RabbitMQ. Each microservice has its own database

Application runs with docker. Each microservice and database runs inside its own container

## Stack

NestJs, TypeScript, RabbitMQm, TypeORM, PostgreSQL, Swagger

## Installation

```bash
npm install
```

## Running the app

```bash
docker-compose up --build
```

## Documentation

To see functionality of app you can start it and use link:

```bash
http://localhost:3000/docs
```