# Delivery Challenge API

This document serves as the README for the Delivery Challenge API, which is a fullstack application built with a focus on user and order management.

## Technologies

* **Backend:** The backend is likely implemented using a framework like Node.js or Python (based on the `.env` file).
* **Database:** The application uses a PostgreSQL database to store user and order data (as suggested by the DB_* environment variables).
* **JWT:** The API utilizes JSON Web Tokens (JWT) for authentication, with a secret key stored in the JWT_SIGNATURE_GENERAL environment variable.

## Environment Variables

The `.env` file stores sensitive configuration details for the application. These variables should not be committed to version control.

* `PORT`: Defines the port on which the API server listens for incoming requests (default: 3000).
* `DB_USER`: Username for the database connection (set to `root` in this example).
* `DB_PASSWORD`: Password for the database connection (set to `postgres` in this example).
* `DB_HOST`: Hostname or IP address of the database server (set to `localhost` in this example).
* `DB_NAME`: Name of the database used by the application (set to `deliverychallenge` in this example).
* `JWT_SIGNATURE_GENERAL`: Secret key used for signing JWT tokens (set to `simon` in this example).

## API Endpoints

The API offers a variety of endpoints for managing users and orders:

**Users:**

* `/`: GET request to retrieve all users (likely using a controller function named `getUserSController`).
* `/`: POST request to create a new user (likely using a controller function named `postUsersController`).
* `/:id`: PUT request to update an existing user with the specified ID (likely using a controller function named `putUsersController`).
* `/:id`: DELETE request to delete a user with the specified ID (likely using a controller function named `deleteUsersController`).
* `/:id`: GET request to retrieve a single user with the specified ID (likely using a controller function named `getOneUsersController`).

**Orders:**

* `/:userId`: GET request to retrieve all orders for a specific user identified by `userId` (likely using a controller function named `getOrdersController`).
* `/:userId`: POST request to create a new order for a user identified by `userId` (likely using a controller function named `createOrderController`).
* `/:id/:userId`: PUT request to update an existing order with the specified ID belonging to the user identified by `userId` (likely using a controller function named `updateOrderController`).
* `/:id/:userId`: DELETE request to delete an order with the specified ID belonging to the user identified by `userId` (likely using a controller function named `deleteOrderController`).
* `/:id/:userId`: GET request to retrieve a specific order with the specified ID belonging to the user identified by `userId` (likely using a controller function named `getOrderByIdController`).
* `/bulk/:userId`: POST request to create multiple orders in bulk for a user identified by `userId` (likely using a controller function named `createBulkOrdersController`).

**Authentication:**

* `/login`: POST request for user login (likely using a controller function named `postLoginController`).
* `/register`:  This endpoint seems to be incorrectly named as both register and postUsersController point to the same path. It's likely that this should be a POST request to `/register` for user registration (likely using the same `postUsersController` function).
