# 📰 The Siren — Full Stack MERN Blog

A complete, production-ready **MERN stack blog application** featuring a React frontend with a Node.js/Express backend and MongoDB Atlas database. The Siren is a modern editorial blog covering categories including Tollywood, Technology, Jobs, and Nature.

🌐 **Live Demo:** [manikumar-react-blog-complete.netlify.app](https://manikumar-react-blog-complete.netlify.app)

---

## ✨ Features

- 🎨 **Modern UI** — Hero grid layout, smooth hover animations, and responsive design
- 📖 **Article System** — Full article view with title, image, metadata (views, likes), and content
- 🗂 **Category Pages** — Browse posts by Tollywood, Technology, Jobs, or Nature
- 🔐 **JWT Authentication** — Secure login with persistent sessions via localStorage
- 🛡 **Admin Dashboard** — Protected CRUD panel to create, edit, and delete posts with live image preview
- 📊 **View Tracking** — Auto-increments view count on every article page visit
- 👏 **Likes System** — Authenticated users can like posts
- 🔖 **Bookmarks** — Save posts for later reading
- 💬 **Comments** — Authenticated users can comment on posts
- 🌱 **Database Seeding** — One-command script to populate the DB with 16 sample posts

---

## 🛠 Tech Stack

### Frontend (client/)
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router v6 | Client-side routing |
| TanStack React Query | Server state & data fetching |
| Axios | HTTP client with auth interceptor |
| Vanilla CSS | Styling |

### Backend (server/)
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB Atlas + Mongoose | Cloud database & ODM |
| JSON Web Tokens | Authentication |
| bcryptjs | Password hashing |
| Cloudinary | Image upload & hosting |
| Helmet + CORS | Security |

---

## 📁 Monorepo Structure

```
React-Blog-Complete/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── api/               # Axios instance
│   │   ├── Components/        # All UI components
│   │   ├── context/           # Auth context (JWT)
│   │   └── hooks/             # React Query data hooks
│   ├── README.md              # Client-specific documentation
│   └── package.json
├── server/                    # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, admin, error handling
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API route definitions
│   │   └── utils/             # Seed scripts
│   ├── README.md              # Server-specific documentation
│   └── package.json
├── package.json               # Root scripts (run both concurrently)
└── README.md                  # This file
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Punnamanikumar/React-Blog-Complete.git
cd React-Blog-Complete
```

### 2. Install All Dependencies

```bash
npm run install-all
```

This installs dependencies for the root, client, and server in one command.

### 3. Configure Environment Variables

**Server** — Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/siren-blog
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Seed the Database

```bash
npm run seed
```

This populates your database with 16 sample articles across all categories.

### 5. Run the Full Stack App

```bash
npm run dev
```

This runs **both** the client and server concurrently:
- 🖥 **Frontend**: http://localhost:3000
- ⚡ **Backend API**: http://localhost:5000

---

## 📡 API Overview

Base URL: `http://localhost:5000/api`

| Resource | Endpoint | Description |
|---|---|---|
| Auth | `/api/auth` | Register, Login, Get current user |
| Posts | `/api/posts` | CRUD, latest, category filter |
| Posts | `/api/posts/:slug` | Single post (increments views) |
| Comments | `/api/posts/:id/comments` | Get and add comments |
| Likes | `/api/posts/:id/like` | Toggle like (auth required) |
| Bookmarks | `/api/posts/:id/bookmark` | Toggle bookmark (auth required) |
| Upload | `/api/upload` | Image upload to Cloudinary (admin) |

---

## 🔐 Admin Access

1. First, create an admin user directly in MongoDB Atlas by setting `role: "admin"` on a user document.
2. Navigate to `/login` and log in with the admin credentials.
3. The **Dashboard** link will appear in the navigation bar.
4. From the Dashboard, you can **create**, **edit**, and **delete** any post.

---

## 📜 Root Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run client & server concurrently (recommended) |
| `npm run server` | Run only the backend with nodemon |
| `npm run client` | Run only the frontend with Vite |
| `npm run install-all` | Install all dependencies (root + client + server) |
| `npm run seed` | Seed the database with sample posts |
| `npm start` | Start production server |

---

## 📚 Documentation

- [Client README](./client/README.md) — Detailed frontend component docs, routing, and hooks
- [Server README](./server/README.md) — Detailed API endpoints, data models, and auth flow

---

## 👤 Author

**Punna ManiKumar**

- 🌐 Portfolio: [manikumarportfolio.netlify.app](https://manikumarportfolio.netlify.app)
- 💼 LinkedIn: [linkedin.com/in/punnamanikumar](https://linkedin.com/in/punnamanikumar)
- 🐙 GitHub: [github.com/Punnamanikumar](https://github.com/Punnamanikumar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
