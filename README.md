# NoteFlex Application

![Logo](./assets/logo.png)

# Description

**NoteFlex** is the backend part of the NoteFlex application, which includes registration and authentication
capabilities (based on tokens), as well as the ability to work with notes (creating notes, retrieving all
notes, retrieving notes by identifier, updating notes by identifier, deleting notes by identifier) and tasks
(creating tasks, retrieving all tasks, retrieving all completed tasks, retrieving all active tasks, retrieving
tasks by identifier, updating tasks by identifier, deleting tasks by identifier). Technologies such as
JavaScript, MySQL, Express, and Swagger (for API documentation) were used to develop the backend part of
this application. Mocha, Should, and Supertest were used for unit testing.


# Endpoints:

**Authentication/Registration:**

| HTTP method | Path          | Short description                        | Is request body required? | Required fields in request body                                                   | Headers |
|-------------|---------------|------------------------------------------|---------------------------|-----------------------------------------------------------------------------------|---------|
| POST        | /api/register | Used for registering new users           | +                         | email: string; firstName: string; lastName: string; password: string; age: number | -       |
| POST        | /api/login    | Used for authenticating registered users | +                         | email: string; password: string;                                                  | -       |

**Operations with Notes:**

| HTTP method | Path                                      | Short description                                        | Is request body required? | Required fields in request body | Headers                    |
|-------------|-------------------------------------------|----------------------------------------------------------|---------------------------|---------------------------------|----------------------------|
| POST        | /api/notes                                | Used for creating a new note                             | +                         | title: string; text: string;    | Authorization: VALID_TOKEN |
| GET         | /api/notes OR /api/notes?title=YOUR_TITLE | Used for retrieving all notes (also searchable by title) | -                         | -                               | Authorization: VALID_TOKEN | 
| GET         | /api/notes/{id}                           | Used for retrieving a note by identifier                 | -                         | -                               | Authorization: VALID_TOKEN |
| PUT         | /api/notes/{id}                           | Used for updating a note by identifier                   | +                         | title?: string; text?:  string; | Authorization: VALID_TOKEN |
| DELETE      | /api/notes/{id}                           | Used for removing a note by identifier                   | -                         | -                               | Authorization: VALID_TOKEN |

**Operations with Tasks:**

| HTTP method | Path                                                          | Short description                                                  | Is request body required? | Required fields in request body                             | Headers                    |
|-------------|---------------------------------------------------------------|--------------------------------------------------------------------|---------------------------|-------------------------------------------------------------|----------------------------|
| POST        | /api/tasks                                                    | Used for creating a new task                                       | +                         | title: string; description: string; isCompleted?: boolean   | Authorization: VALID_TOKEN | 
| GET         | /api/tasks OR /api/tasks?title=YOUR_TITLE                     | Used for retrieving all tasks (also searchable by title)           | -                         | -                                                           | Authorization: VALID_TOKEN |
| GET         | /api/tasks/completed OR /api/tasks/completed?title=YOUR_TITLE | Used for retrieving all completed tasks (also searchable by title) | -                         | -                                                           | Authorization: VALID_TOKEN |
| GET         | /api/tasks/active OR /api/tasks/active?title=YOUR_TITLE       | Used for retrieving all active tasks (also searchable by title)    | -                         | -                                                           | Authorization: VALID_TOKEN |
| GET         | /api/tasks/{id}                                               | Used for retrieving a task by identifier                           | -                         | -                                                           | Authorization: VALID_TOKEN |
| PUT         | /api/tasks/{id}                                               | Used for updating a task by identifier                             | +                         | title?: string; description?: string: isCompleted?: boolean | Authorization: VALID_TOKEN |
| DELETE      | /api/tasks/{id}                                               | Used for removing a task by identifier                             | -                         | -                                                           | Authorization: VALID_TOKEN |

# Technologies used:

- JavaScript ES6
- Express JS
- MySQL
- Swagger
- BcryptJs
- Mocha
- Should
- Supertest

# How to run this project locally?

- make sure you have Node.js, MySQL and NPM installed on your system;
- clone this repository;
- open this project (you can do this using WebStorm, VS Code or another development environment);
- create two files named **.env** and **.test.env** in the root directory of the cloned repository on your computer and fill in these fields:
```
APP_PORT=YOUR_APP_PORT
DB_PORT=YOUR_DB_PORT
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
SECRET_KEY=YOUR_SECRET_KEY
SALT=YOUR_SALT
```
- install required dependencies **npm i** OR **npm install**;
- run tests with **npm run test**;
- enjoy this application;

# Additional information:

If you have any questions, please contact me via email at **alexstepanyak@gmail.com**.

Author: 