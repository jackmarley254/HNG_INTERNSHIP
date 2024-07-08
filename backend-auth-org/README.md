# Backend Auth & Organisation

This project implements user authentication and organisation management using Node.js, Express, Sequelize, and PostgreSQL.

## Features

- User registration with password hashing
- User login with JWT token generation
- Organisation management
- Protected routes
- Unit and end-to-end testing

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Create a `.env` file with the following variables:
    ```
    DB_NAME=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

3. Run migrations:
    ```bash
    npm run migrate
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Run tests:
    ```bash
    npm test
    ```

## Deployment

This project is deployed using Vercel.

## Endpoints

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user
- `GET /api/organisations`: Get organisations
- `POST /api/organisations`: Create a new organisation

