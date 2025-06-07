## 📄 License

MIT License © 2025 Rachata Singkhet (Caption)

> "Don't just learn frameworks. Understand the concepts behind them." – Caption# 🚀 JavaScript Backend Showcase: Express | Koa | Fastify

> A beginner-friendly backend journey through three powerful JavaScript frameworks.

## 📘 Introduction

Welcome to the **JavaScript Backend Showcase**, a practical and beginner-focused repository that explores three of the most widely used web backend frameworks in the JavaScript/Node.js ecosystem:

- 🌐 **Express** – The robust, minimal and flexible Node.js web application framework.
- ⚡ **Koa** – The next generation web framework for Node.js by the creators of Express.
- 🔥 **Fastify** – A fast and low overhead web framework for Node.js.

Whether you're just starting your backend journey or exploring which framework suits your project best, this repo will guide you through the core concepts and implementation of each.

## 🏗️ Project Structure

```bash
javascript-backend-showcase/
│
├── express_app/        # Express backend project
│   └── ...             # Routes, middleware, controllers, etc.
├── package.json        # Shared dependencies for all apps
└── README.md           # You're reading it now!
```

## 🧰 Tech Stack

| Feature | Express | Koa | Fastify |
|---------|--------|-----|---------|
| Routing | ✅ Express Router | ✅ Middleware & koa-router | ✅ Built-in router |
| Middleware | ✅ Rich ecosystem | ✅ Async middleware | ✅ Hooks & plugins |
| Performance | 🔄 Solid | 🔄 Improved over Express | ✅ Highly optimized |
| Body Parsing | 🔄 Via express.json() | 🔄 Via koa-bodyparser | ✅ Built-in |
| Error Handling | 🔄 Via middleware | ✅ Try/catch & ctx.throw | ✅ Built-in error handler |
| Async Support | ⚠️ Via callbacks/promises | ✅ First-class async/await | ✅ First-class async/await |
| Validation | ❌ Via 3rd party modules | ❌ Via 3rd party modules | ✅ Built-in schema validation |
| Learning Curve | 🎈 Easy | 🚀 Moderate | 🧠 Moderate |

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/javascript-backend-showcase.git
cd javascript-backend-showcase
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Each Project

#### ▶️ Express

```bash
cd express_app
npm run dev
# Server runs on http://localhost:3000
```

## 🧪 Features Demonstrated

- RESTful API implementation
- JSON response formatting
- Middleware usage
- Route parameter handling
- Database integration (MongoDB)
- Error handling and custom responses
- Authentication with JWT
- API documentation (Swagger UI)
- Request validation
- Modular app structure

## 📚 Recommended Learning Resources

- [Express Docs](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 💻 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run server in development mode with hot-reloading |


## ⚙️ Environment Variables

Create a `.env` file in the root directory of each project:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/myapp

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

```

## 📱 API Examples

### Express Route Example

```javascript
// express_app/routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
```

## ❤️ Contributing

This project is open for contributions! Whether it's bug fixes, new features, or better docs — feel free to fork and submit a PR.
