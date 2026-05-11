# ⚡ The Siren — Server (Backend)

A production-ready **RESTful API** built with **Node.js**, **Express**, and **MongoDB Atlas**. It powers The Siren blog with full authentication, post management, comments, likes, bookmarks, and view tracking.

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM (Object Document Mapper) |
| **JSON Web Tokens (JWT)** | Authentication |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image upload & storage |
| **Helmet** | Security HTTP headers |
| **Morgan** | HTTP request logger |
| **CORS** | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── db.js                # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, GetMe
│   │   ├── postController.js    # CRUD posts, likes, bookmarks, view tracking
│   │   └── commentController.js # Get & add comments
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification (protect)
│   │   ├── adminMiddleware.js   # Role check (adminOnly)
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── Post.js              # Post schema with auto-slug generation
│   │   ├── User.js              # User schema with password hashing
│   │   └── Comment.js          # Comment schema
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── postRoutes.js        # /api/posts
│   │   ├── commentRoutes.js     # /api/comments
│   │   └── uploadRoutes.js     # /api/upload (Cloudinary)
│   ├── utils/
│   │   ├── seed_web.js          # Database seed script (16 sample posts)
│   │   └── fix_images.js        # Utility to patch image URLs in the DB
│   └── index.js                 # App entry point
├── .env                         # Environment variables (see below)
└── package.json
```

---

## 🌐 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login & receive JWT |
| `GET` | `/api/auth/me` | Private | Get current logged-in user |

---

### Post Routes — `/api/posts`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/posts` | Public | Get all posts (supports `?category=`, `?limit=`) |
| `GET` | `/api/posts/latest` | Public | Get the 6 most recent posts |
| `GET` | `/api/posts/:slug` | Public | Get single post (auto-increments view count) |
| `POST` | `/api/posts` | **Admin** | Create a new post |
| `PUT` | `/api/posts/:id` | **Admin** | Update a post |
| `DELETE` | `/api/posts/:id` | **Admin** | Delete a post |
| `PATCH` | `/api/posts/:id/like` | Auth | Toggle like on a post |
| `PATCH` | `/api/posts/:id/bookmark` | Auth | Toggle bookmark on a post |
| `GET` | `/api/posts/:postId/comments` | Public | Get comments for a post |
| `POST` | `/api/posts/:postId/comments` | Auth | Add a comment to a post |

---

### Upload Routes — `/api/upload`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/upload` | **Admin** | Upload an image to Cloudinary |

---

## 🗃 Data Models

### Post

| Field | Type | Details |
|---|---|---|
| `title` | String | Required |
| `slug` | String | Auto-generated from title (unique) |
| `description` | String | Required, short summary |
| `content` | String | Required, full article body |
| `img` | String | Image URL |
| `imgPublicId` | String | Cloudinary public ID for deletion |
| `category` | String | Enum: `tollywood`, `technology`, `jobs`, `nature` |
| `author` | ObjectId | Ref: `User` |
| `tags` | [String] | Array of tags |
| `likes` | [ObjectId] | Array of User refs who liked the post |
| `views` | Number | Auto-incremented on each fetch |
| `isPublished` | Boolean | Default: `true` |

### User

| Field | Type | Details |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Hashed with bcryptjs, `select: false` |
| `role` | String | Enum: `user`, `admin`. Default: `user` |
| `avatar` | String | URL |
| `savedPosts` | [ObjectId] | Ref: `Post` (bookmarks) |

---

## 🔐 Authentication Flow

1. User sends `POST /api/auth/login` with `email` and `password`.
2. Server verifies the password hash using `bcryptjs`.
3. Server returns a **signed JWT** (expires in `JWT_EXPIRES_IN`, default `7d`).
4. Client stores the token in `localStorage` and sends it as `Authorization: Bearer <token>` on subsequent requests.
5. Protected routes use the `protect` middleware to verify the token.
6. Admin routes additionally use the `adminOnly` middleware to check `user.role === 'admin'`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- A **MongoDB Atlas** account with a cluster and connection string

### Installation

```bash
cd server
npm install
```

### Running the Dev Server

```bash
npm run dev
```

The API will start at **http://localhost:5000**.

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/siren-blog

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ **IMPORTANT:** Never commit your `.env` file to version control. It is already in `.gitignore`.

---

## 🌱 Database Seeding

To populate the database with 16 sample posts across all categories:

```bash
node src/utils/seed_web.js
```

This script will:
1. Connect to your MongoDB Atlas cluster.
2. Delete all existing posts.
3. Insert 16 fresh, high-quality sample posts (Tollywood, Technology, Jobs, Nature).

> You need a valid `ADMIN_EMAIL` (an existing admin user) in the DB for the seed to work — the script uses the first admin it finds as the post author.

---

## 🏃 Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `nodemon src/index.js` | Start dev server with hot reload |
| `npm start` | `node src/index.js` | Start production server |
