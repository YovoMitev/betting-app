# Simple Betting App API - Express, Prisma, Docker

### Prerequisites:

You will need `node` and `npm` or `yarn` installed globally on your machine as well as docker.
Please make sure that Node version is 18 or above (version >= 18).

For easy version management, you can use [nvm](https://github.com/nvm-sh/nvm).

For easily docker setup, you can download the [docker desktop app](https://www.docker.com/products/docker-desktop/).

### Setup:

#### Environment

Create `.env` file in the root of the respository. For easy setup you can copy the .env:

```bash
NODE_PORT=3001
DATABASE_URL=postgresql://test_user:test_password@localhost:5432/betting_app
CORS_DOMAINS= http://localhost:3000, http://localhost:3001, https://example.com, http://localhost:5173
```

#### Docker

To easily setup the database, you can use this simple Docker setup:

```bash
docker build -t betting-app-db -f Dockerfile .

docker run -d --name my-postgres-container -p 5432:5432 betting-app-db
```

## Installation

#### Yarn

```bash
# Install dependencies
yarn
```

#### Npm

```bash
# Install dependencies
npm install
```

## Prisma Setup

#### Migrations

```bash
npx prisma migrate dev --name init
```

#### Seeds

```bash
npx prisma db seed
```

## Running the app

```bash
# development:npm
$ npm run dev

# development:yarn
$ yarn dev
```

## HTTP Requests

### Event list endpoint

- **Endpoint:** `GET /api/events/list`
- **Description:** Betting events list.
- **Example:**

  ```http
  GET http://localhost:3001/api/events/list
  ```
