# Task Manager API

The Task Manager API is a web application that allows users to manage their tasks. It provides endpoints for creating, updating, deleting, and retrieving tasks. The API is built using Node.js and Express framework, and it uses MongoDB as the database for storing task data.

## Prerequisites

Before running the Task Manager API, ensure that you have the following software installed on your system:

- Node.js: The JavaScript runtime environment.
- MongoDB: The NoSQL database used for storing task data.

## Getting Started

1. Clone the repository or download the source code.

2. Install the project dependencies by running the following command in the project directory:

   ```shell
   npm install
   ```

## Set up the environment variables:

1. Create a `.env` file in the project root directory.
2. Define the following environment variables in the `.env` file:
   - `PORT`: The port on which the server will run (default: 3000).
   - `MONGO_URI`: The URI for connecting to your MongoDB database.

## Start the server

Run the following command to start the server:

    ```shell
    npm start
    ```

## Server Access

After starting the server, it will be accessible at `http://localhost:3000` (or the specified port).

## API Endpoints

The following endpoints are available in the Task Manager API:

- **GET /api/v1/tasks**: Retrieve all tasks.
- **GET /api/v1/tasks/:id**: Retrieve a specific task by its ID.
- **POST /api/v1/tasks**: Create a new task.
- **PATCH /api/v1/tasks/:id**: Update a specific task by its ID.
- **DELETE /api/v1/tasks/:id**: Delete a specific task by its ID.

You can use tools like Postman or cURL to interact with these endpoints and perform CRUD operations on tasks.

## Project Structure

The project has the following structure:

- `app.js`: The entry point of the application that sets up the Express server and connects to the database.
- `db/connect.js`: The module responsible for establishing a connection to the MongoDB database.
- `middleware/not-found.js`: The middleware that handles requests for non-existent routes.
- `middleware/errorHandler.js`: The middleware that handles errors.
- `routes/tasks.js`: The router that defines the task-related endpoints and their corresponding controller functions.
- `public/`: The directory for serving static files (if any).

Feel free to explore the project files for more details on the implementation.

## Conclusion

The Task Manager API provides a simple and efficient way to manage tasks through a RESTful interface. By leveraging the power of Node.js, Express, and MongoDB, it offers a flexible and scalable solution for handling task-related operations.
