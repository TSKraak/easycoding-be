# Easycoding-Server

This server is made to be connected with the [client of Easycoding](https://github.com/TSKraak/easycoding-fe) and is deployed with [Heroku](https://dashboard.heroku.com/apps).

## Functionalities and Technologies

### Functionalities

- Endpoints to get, post and patch data from the Easycoding Database (by using [PostgreSQL](https://www.postgresql.org) and [ElephantSQL](https://www.elephantsql.com).
- Makes a user an Admin or Blocks a user (there is an Admin check for those)
- Authorization checks with middleware.
- Running server with [Express](https://expressjs.com)
- Managing the database models and migrations with [Sequelize](https://sequelize.org)

### Languages and Tools

<img src="https://camo.githubusercontent.com/fd1b1f4b9f0a1f6c2dfc6a96aac5f2a8f8b5a7a4df7be1fd2eba3f116eb9b8d1/68747470733a2f2f7777772e70696b706e672e636f6d2f706e676c2f6d2f3433302d343330393634305f6a732d6c6f676f2d6e6f64656a732d6c6f676f2d636c69706172742e706e67" alt="nodejs-icon" height="45px"/> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" alt="vscode-icon" height="45px" /> <img src="https://camo.githubusercontent.com/72c27477f91493365e44b44306740892911721464f3f25d5b706c5deab24bfc2/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f392f39392f556e6f6666696369616c5f4a6176615363726970745f6c6f676f5f322e7376672f34383070782d556e6f6666696369616c5f4a6176615363726970745f6c6f676f5f322e7376672e706e67" alt="javascript-icon" height="45px" /> <img src="https://cdn.worldvectorlogo.com/logos/sequelize.svg" alt="sequelize-logo" height="45px" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" alt="postgresql-icon" height="45px" />

## Installation Guide

- Install dependencies

```
npm install
```

- Configure your database in `config/config.json`


- Create database, run migrations & seed data

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

- Start your server

```
npm start
```

## Endpoints

| Method       | Path | Purpose | Required Parameteres| Auth         |
| --------- | --------- | -------- | ------------------------------- | ----|
| POST        | '/answer'   | Adds an answer in DB  | content, commentId | yes |
| POST     | '/answer/:answerId' | Edits an answer in DB  | content | yes |
| DELETE | '/answer/:answerId'  | Delete an answer from DB | answerId | yes |
| DELETE | '/answer/admin/:answerId' | Delete an answer from DB (Only admin can use this)| answerId | yes  |
| GET | 'user/me' | Get user that is logged in | none | yes |
| POST | '/login' | Login a user | email, password | no |
| POST | '/signup' | Sign up a new user | name, email, password, picture | no |
| POST | '/comment' | Adds a comment | content, postId, requestId | yes |
| PUT | '/comment/:commentId' | Edits a comment | content, commentId | yes |
| DELETE | '/comment/:commentId' | Deletes a comment | commentId | yes |
| DELETE | '/comment/admin/:commentId' | Delete a comment from DB (Only admin can use this) | commentId | yes |
| GET | '/favourite' | Gets all users with comments and answers from author relation | none | yes |
| POST | '/favourite' | Sets new favourite | postId | yes |
| DELETE | '/favourite/:postId' | Deletes a favourite | postId | yes |
| GET | '/picture/:postId' | Gets a picture | postId | yes |
| POST | '/picture/' | Adds a picture | name, picture | yes |
| PUT | '/picture/:postId' | Updates a picture | name, picture, postId | yes |
| DELETE | '/picture/:id' | Deletes a picture | id (of the picture) | yes |
| GET | '/posts' | Gets all posts | none | no |
| POST | '/posts' | Adds a post | title, content | yes |
| PUT | '/posts/:postId' | Updates a post | title, content, postId | yes |
| DELETE | '/posts/:postId' | Deletes a post | postId | yes |
| DELETE | '/posts/admin/:postId' | Deletes a post (Only admin can use this) | postId | yes |
| GET | '/request' | Gets all requests | none | no |
| POST | '/request' | Adds a request | title, content | yes |
| PUT | '/request/:requestId' | Updates a request | title, content, requestId | yes |
| DELETE | '/request/:requestId' | Deletes a request | requestId | yes |
| DELETE | '/request/admin/:requestId' | Deletes a request (Only admin can use this) | requestId | yes |
| POST | '/users' | Gets all users (Only admin can use this) | none | yes |
| PUT | '/users/profile' | Updates user | name or picture or email | yes |
| PUT | '/users/block/:id' | Blocks/Unblockes a user | id (of the user that is going to be blocked/unblocked) | yes |
| PUT | '/users/admin/:id' | Makes or deletes a user from admin | id (of the user that is going to be changed) | yes |
