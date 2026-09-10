TODO_API_Node.js
A REST API for managing tasks, built with Node.js, Express and MySQL for my Web Development course. It does the basic CRUD you'd expect from a task list: create a task, list them, get one by id, update it, delete it.

I built this one file at a time and committed each piece separately (routes, then controller, then model, then the db connection).
Stack
Node.js
Express 5
MySQL (via mysql2)
dotenv for config
nodemon for local dev



Project structure



TODO_API_Node.js/

├── app.js                  # entry point, mounts routes on /v1/tasks

├── routes/

│   └── taskRoutes.js       # maps HTTP verbs to controller functions

├── controllers/

│   └── taskcontroller.js   # request/response handling, validation, status codes

├── models/

│   └── taskmodel.js        # SQL queries, uses parameterised queries throughout

├── db/

│   ├── db.js                # mysql2 connection pool

│   └── schema.sql          # creates the task_api database and the tasks table

├── .env example             # copy this to .env and fill in your own DB creds

└── package.json



Setup
1. Clone and install
git clone https://github.com/sumailasherif/TODO_API_Node.js.git

cd TODO_API_Node.js

npm install
2. Create the database
Run the schema file against your local MySQL:

mysql -u root -p < db/schema.sql

This creates a task_api database with one table, tasks (id, title, is_completed).

Small heads up: right now db/schema.sql has a typo on the first line (--thisCreates... with no space after the dashes), and MySQL won't read that as a comment without the space, so it'll throw a syntax error. Fix it to -- This creates... and it runs fine.
3. Set up your .env
The example file in this repo is named .env example (space, not a dot), so quote it when you copy:

cp ".env example" .env

Then fill in your own values:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_mysql_password

DB_NAME=task_api

DB_PORT=3306

PORT=3000

One more heads up: the committed .env example has DB_PORT=3000. That's the port the Express server listens on, not MySQL's port. MySQL's default is 3306, so use that for DB_PORT or the app won't be able to reach the database.
4. Run it
npm run dev     # nodemon, restarts on file changes

 or

npm start       # plain node

This appears  in the terminal:

Task API is ready and listening on port 3000

Open http://localhost:3000 in the browser and you should get back API is running!. That route is just a quick check that the server's up before you start hitting /v1/tasks.
Endpoints
Everything task-related sits under /v1/tasks.

Method
Endpoint
Body
What it does
GET
/


health check, returns "API is running!"


POST
/v1/tasks
{ "title": string }
creates a task, returns { id }

GET
/v1/tasks
returns { tasks: [...] }

GET
/v1/tasks/:id


returns one task, 404 if it isn't there

PUT
/v1/tasks/:id
{ "title"?, "is_completed"? }
updates a task, 204 on success

DELETE
/v1/tasks/:id
deletes a task, 204 either way

All postman testing are included in this folder : https://drive.google.com/drive/folders/1dTxHbAO6P2-QZRYQUh0MFuhUK_sv_XVI?usp=sharing

Screenshots

Terminal, server starting up


<img width="798" height="351" alt="image" src="https://github.com/user-attachments/assets/0cbc19ba-cb46-4dc3-9075-4b0f03da10aa" />

Chrome, health check at localhost:3000


<img width="1917" height="920" alt="image" src="https://github.com/user-attachments/assets/e670d65a-1624-43fb-a9d7-5d2f0d87c48c" />


License: ISC (see package.json).

