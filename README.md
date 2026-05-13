# Express TypeScript REST API

A modular REST API boilerplate built with **Express.js** and **TypeScript**, featuring a clean folder structure, input validation, and cookie-based authentication scaffolding.


Preview Link: 


---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express.js v5](https://expressjs.com/) | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Zod](https://zod.dev/) | Schema validation |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Cookie handling |
| [cors](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [tsx](https://github.com/privatenumber/tsx) | TypeScript execution & dev watcher |
| [pnpm](https://pnpm.io/) | Package manager |

---

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── auth.controller.ts   # Request handlers for auth routes
│   │   ├── auth.routes.ts       # Auth route definitions
│   │   ├── auth.service.ts      # Business logic (to be implemented)
│   │   └── auth.validation.ts   # Zod schemas & inferred TypeScript types
│   └── routes/
│       └── routers.ts           # Central router — mounts all feature modules
├── config/
│   └── env.ts                   # Environment variable config (dotenv)
├── types/                       # Shared TypeScript types (to be added)
├── app.ts                       # Express app setup & global middleware
└── server.ts                    # HTTP server bootstrap & process signal handling
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 11

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

### Running the Server

```bash
# Development (with hot reload)
pnpm dev

# Build
pnpm build

# Production
pnpm start
```

---

## API Endpoints

Base URL: `/api/v1`

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Server health check |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login with email & password |
| PATCH | `/api/v1/auth/change-password` | Change user password |
| POST | `/api/v1/auth/forgot-password` | Request a password reset link |

---

## Request & Response

### POST `/api/v1/auth/register`

**Request Body**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

### POST `/api/v1/auth/login`

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "email": "john@example.com"
  }
}
```

---

### PATCH `/api/v1/auth/change-password`

**Request Body**
```json
{
  "oldPassword": "secret123",
  "newPassword": "newSecret456",
  "confirmPassword": "newSecret456"
}
```

**Response**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### POST `/api/v1/auth/forgot-password`

**Request Body**
```json
{
  "email": "john@example.com"
}
```

**Response**
```json
{
  "success": true,
  "message": "Password reset link sent successfully",
  "data": {
    "email": "john@example.com",
    "resetToken": "..."
  }
}
```

---

## Validation

All request bodies are validated using [Zod](https://zod.dev/). On validation failure, the API returns:

```json
{
  "success": false,
  "errors": [
    {
      "code": "too_small",
      "path": ["password"],
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## Architecture Notes

- **Modular routing** — each feature module owns its routes, controller, service, and validation. The central `routers.ts` mounts them all.
- **Controller → Service pattern** — controllers handle HTTP concerns (parsing, validation, response). Business logic belongs in the service layer.
- **Cookie-based auth** — tokens are set as `httpOnly` cookies on login/register.
- **Global error handling** — a catch-all error middleware in `app.ts` handles unexpected errors. 404s are handled by a dedicated not-found middleware.
- **Process signal handling** — `server.ts` handles `SIGTERM`, `uncaughtException`, and `unhandledRejection` for graceful shutdown.
