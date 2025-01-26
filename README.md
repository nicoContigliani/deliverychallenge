# Delivery Challenge API

## Introduction

The Delivery Challenge API is a fullstack application focused on user and order management. This README provides an overview of the API's functionality, setup instructions, and usage examples.

## Technologies

- **Backend:** Node.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)

## Setup

### Environment Variables

Create a \`.env\` file in the root directory with the following variables:

\`\`\`
PORT=3000
DB_USER=root
DB_PASSWORD=postgres
DB_HOST=localhost
DB_NAME=deliverychallenge
JWT_SIGNATURE_GENERAL=simon
\`\`\`

## API Endpoints

### Authentication

#### Register a new user

- **URL:** \`POST http://localhost:3000/api/register\`
- **Body:**
  \`\`\`json
  {
    "fullname": "nico",
    "email": "nico.contigliani@gmail.com",
    "password": "123456789"
  }
  \`\`\`

#### Login

- **URL:** \`POST http://localhost:3000/api/login\`
- **Body:**
  \`\`\`json
  {
    "email": "nico.contigliani@gmail.com",
    "password": "123456789"
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "data": {
      "id": 1,
      "fullname": "nico",
      "email": "nico.contigliani@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJuaWNvIiwiZW1haWwiOiJuaWNvLmNvbnRpZ2xpYW5pQGdtYWlsLmNvbSIsImlhdCI6MTczNzg3MDA5MiwiZXhwIjoxNzczODcwMDkyfQ.E9NRGB6Yfgf7w3m76Usbk3z5pKfj0DJhI45gN_1VLOY"
  }
  \`\`\`

### Users

#### Get all users

- **URL:** \`GET http://localhost:3000/api/users\`
- **Headers:** \`Authorization: Bearer <token>\`

### Orders

#### Create an order

- **URL:** \`POST http://localhost:3000/api/orders/1\` (1 is the user ID)
- **Headers:** \`Authorization: Bearer <token>\`
- **Body:**
  \`\`\`json
  {
    "items": [
      { "id": 1 },
      { "id": 2 }
    ],
    "totalAmount": 100.0,
    "status": "En preparación",
    "isDeleted": false
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "status": "En preparación",
    "totalAmount": 100,
    "user": {
      "id": 1
    },
    "items": [
      {
        "id": 1,
        "name": "Milanesa",
        "description": "Milanesa con papas",
        "price": "8000",
        "updatedAt": "2025-01-26T04:57:26.392Z",
        "deletedAt": null
      },
      {
        "id": 2,
        "name": "Coca ligth",
        "description": "Coca sin azucar",
        "price": "1500",
        "updatedAt": "2025-01-26T04:57:26.392Z",
        "deletedAt": null
      }
    ],
    "id": 1,
    "orderDate": "2025-01-26T04:58:49.892Z",
    "isDeleted": false
  }
  \`\`\`

#### Update an order

- **URL:** \`PUT http://localhost:3000/api/orders/1/1\` (First 1 is order ID, second 1 is user ID)
- **Headers:** \`Authorization: Bearer <token>\`

#### Get user's orders

- **URL:** \`GET http://localhost:3000/api/orders/1\` (1 is the user ID)
- **Headers:** \`Authorization: Bearer <token>\`

#### Delete an order

- **URL:** \`DELETE http://localhost:3000/api/orders/1/1\` (First 1 is order ID, second 1 is user ID)
- **Headers:** \`Authorization: Bearer <token>\`

#### Get order status

- **URL:** \`GET http://localhost:3000/api/orders/1/status\` (1 is the order ID)
- **Headers:** \`Authorization: Bearer <token>\`

## Additional Endpoints

- \`POST /api/orders/bulk/:userId\`: Create multiple orders in bulk
- \`GET /api/users/:id\`: Get a single user
- \`PUT /api/users/:id\`: Update a user
- \`DELETE /api/users/:id\`: Delete a user

## Note

Always include the JWT token in the Authorization header for authenticated requests.

## Developer

This Delivery Challenge API was developed by Nicolás Contigliani, a Fullstack Developer.

Connect with Nicolás:
- LinkedIn: [https://www.linkedin.com/in/nicolas-contigliani/](https://www.linkedin.com/in/nicolas-contigliani/)

