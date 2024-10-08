﻿# book-management-api
 
This is a simple Book Management API built using Node.js, Express, and MongoDB. The API allows you to perform basic CRUD operations on a collection of books, including features like pagination and search functionality.

## Features

- **CRUD Operations**: Create, Read, Update, Delete books.
- **Pagination**: Retrieve books with pagination support.
- **Search**: Filter books by name, genre, and author.
- **JWT Authentication**: Secure API routes using JSON Web Tokens (JWT).

## Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js**: Download and install from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Install and set up MongoDB. You can use MongoDB Atlas for a cloud-based solution.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
2. npm i
3. set up env variables: Create a `.env` file in the root directory and add the following:
    ```
     PORT=3000
     MONGO_URL=mongodb_url
     JWT_SECRET=your_jwt_secret
4. npm start

## API Endpoints
### Public Routes
- GET /api/books: Get a list of all books with optional pagination and search filters.
    - `page`: Page number (default: 1)
    - `limit`: Number of items per page (default: 5)
    - `name`: Filter by book name (optional)
    - `genre`: Filter by book genre (optional)
    - `author`: Filter by book author (optional)
      
### Protected Routes
- POST /api/books: Add a new book
- PUT /api/books/{id}: Update book by id
- DELETE /api/books/{id}: Delete book by id

### Authenctication Routes
- POST /api/users/register: Register a new user
- POST /api/users/login: Authenticate a user and create JWT

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication
- dotenv for environment variables
