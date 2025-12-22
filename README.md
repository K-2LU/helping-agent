# Helping Agent

**Helping Agent** is a backend application designed to serve as a repository and database for connecting users with handymen, laborers, and skilled workers in their local area. Built with [AdonisJS](https://adonisjs.com/), it provides a robust API for managing users, occupations, and authentication.

## Features

- **User Management**: Registration and profile management for users and workers.
- **Authentication**: Secure authentication system using Bearer tokens.
- **OTP Verification**: One-Time Password (OTP) support for secure account verification or actions.
- **Occupation Database**: Maintain a list of various occupations and skills.
- **Work History**: Track occupation history for workers.

## Tech Stack

- **Framework**: [AdonisJS 6](https://adonisjs.com/)
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: [Lucid](https://lucid.adonisjs.com/)
- **Validation**: [VineJS](https://vinejs.com/)
- **Authentication**: @adonisjs/auth

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) Database

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/K-2LU/helping-agent.git
    cd helping-agent
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Configuration:**

    Copy the example environment file and update it with your configuration (database credentials, etc.).

    ```bash
    cp .env.example .env
    ```

4.  **Generate App Key:**

    ```bash
    node ace generate:key
    ```

5.  **Run Database Migrations:**

    Ensure your MySQL database is running and the credentials in `.env` are correct.

    ```bash
    node ace migration:run
    ```

## Running the Application

Start the development server:

```bash
npm run dev
# or
node ace serve --hmr
```

The application will be accessible at `http://localhost:3333`.

## Testing

Run the test suite using the following command:

```bash
npm test
# or
node ace test
```

## Project Structure

- `app/`: Core application logic (Controllers, Models, Services, Validators).
- `config/`: Application configuration files.
- `database/`: Database migrations and seeds.
- `start/`: Application boot scripts and route definitions.
- `tests/`: Unit and functional tests.

## License

This project is [UNLICENSED](LICENSE).