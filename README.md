Auth and Payments API

This is a simple NestJS project that implements user authentication and payment simulation using JWT tokens, Stripe API, and MongoDB.
Features

    User Registration: Register a new user by providing email and password.

    User Login: Authenticate the user and generate JWT access and refresh tokens.

    Authenticated User Details: Fetch the details of the logged-in user.

    Logout: Logout the user by invalidating the refresh token.

    Refresh Tokens: Use a refresh token to get a new access token.

    Payment Simulation: Simulate a payment transaction using Stripe.

Prerequisites

    Node.js (v16+ recommended)

    MongoDB

    Stripe account for payments

Setup
1. Clone the repository

git clone https://github.com/your-repo/auth-payments-api.git
cd auth-payments-api

2. Install dependencies

npm install

3. Create a .env file

Create a .env file at the root of the project and configure the necessary environment variables:

MONGO_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

4. Run the application

npm run start

The server will start at http://localhost:3000.
Endpoints
Authentication Endpoints
1. POST /auth/signup

Register a new user with email and password.

Request body:

{
  "email": "test@example.com",
  "password": "password123"
}

Response:

{
  "accessToken": "JWT_ACCESS_TOKEN",
  "refreshToken": "JWT_REFRESH_TOKEN"
}

2. POST /auth/signin

Login with email and password.

Request body:

{
  "email": "test@example.com",
  "password": "password123"
}

Response:

{
  "accessToken": "JWT_ACCESS_TOKEN",
  "refreshToken": "JWT_REFRESH_TOKEN"
}

3. GET /auth/me

Fetch logged-in user details.

Headers:

Authorization: Bearer JWT_ACCESS_TOKEN

Response:

{
  "_id": "...",
  "email": "test@example.com",
  "role": "User"
}

4. POST /auth/logout

Logout the user by invalidating the refresh token.

Headers:

Authorization: Bearer JWT_ACCESS_TOKEN

Response:

{
  "message": "Logged out"
}

5. POST /auth/refresh

Refresh the access token using the refresh token.

Request body:

{
  "refreshToken": "JWT_REFRESH_TOKEN"
}

Response:

{
  "accessToken": "NEW_JWT_ACCESS_TOKEN",
  "refreshToken": "NEW_JWT_REFRESH_TOKEN"
}

Payment Endpoints
6. POST /payments/checkout

Simulate a payment using Stripe.

Request body:

{
  "amount": 5000, 
  "currency": "usd"
}

Response:

{
  "id": "payment-id",
  "status": "succeeded",
  "amount": 5000
}

Testing

Run the tests to ensure everything is working:

npm run test

