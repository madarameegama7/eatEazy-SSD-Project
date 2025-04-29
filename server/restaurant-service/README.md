Here is the README for the `restaurant-service` in Markdown format, including the installation steps and a table for installed libraries:

````markdown
# Restaurant-Service Installation Guide

Follow these steps to install and set up the `restaurant-service`:

## Prerequisites

1. Ensure you have **Node.js** (v16.x or later) and **npm** installed. You can download them from [Node.js Official Website](https://nodejs.org/).
2. Install **MySQL** and set up a database for the service.

---

## Installation Steps

1. **Download the Project Files**  
   Copy the project files to your local system.

2. **Navigate to the Project Directory**
   ```bash
   cd restaurant-service
   ```
````

3. **Install Dependencies**  
   Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

4. **Environment Configuration**  
   Create a `.env` file in the project root and add the following environment variables:

   ```plaintext
   DATABASE_URL=mysql://username:password@localhost:3306/database_name
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

   Replace `username`, `password`, and `database_name` with your MySQL credentials.

5. **Set Up Prisma**  
   Initialize Prisma and synchronize the database schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start the Service**
   - For production:
     ```bash
     npm start
     ```
   - For development with live reload:
     ```bash
     npm run dev
     ```

---

## Installed Libraries

| **Library**      | **Version** | **Purpose**                                                           |
| ---------------- | ----------- | --------------------------------------------------------------------- |
| `@prisma/client` | ^6.6.0      | Database ORM to interact with MySQL.                                  |
| `axios`          | ^1.8.4      | Promise-based HTTP client for making requests to APIs.                |
| `dotenv`         | ^16.4.7     | Manages environment variables.                                        |
| `express`        | ^4.21.2     | Framework for building web APIs.                                      |
| `jsonwebtoken`   | ^9.0.2      | Generates and verifies JWTs for authentication.                       |
| `mysql2`         | ^3.14.0     | Driver for connecting Prisma to the MySQL database.                   |
| `nodemon`        | ^3.1.9      | Automatically restarts the server on file changes during development. |

---

## DevDependencies

| **Library** | **Version** | **Purpose**                                    |
| ----------- | ----------- | ---------------------------------------------- |
| `prisma`    | ^6.6.0      | Database schema and migration management tool. |

---

Now, the `restaurant-service` should be up and running on the configured port. 🎉

```

This will give you a complete README for the `restaurant-service` in Markdown format, including installation steps and a neatly formatted table of libraries.
```
