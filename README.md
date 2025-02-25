# Telegraph 

```
/telegraph-clone
│── /public              # Static files (CSS, JS, Images)
│   ├── /css             # Stylesheets
│   ├── /js              # Client-side JS (Editor, UI interactions)
│   ├── /static          # Pre-generated static HTML files (SSG)
│   ├── logo.png         # Site assets
│
│── /server              # Backend logic (Node.js + Express)
│   ├── /controllers     # Functions to handle requests
│   │   ├── auth.js      # Login, Signup, JWT authentication logic
│   │   ├── posts.js     # CRUD operations for posts
│   │
│   ├── /models          # Database models (MongoDB Schema)
│   │   ├── User.js      # User schema
│   │   ├── Post.js      # Post schema
│   │
│   ├── /routes          # API and page routing (like Next.js API routes)
│   │   ├── auth.js      # Routes for login/signup/logout
│   │   ├── posts.js     # API routes for posts (create, read, update, delete)
│   │   ├── index.js     # Main file-based routing system
│   │
│   ├── /views           # Server-rendered pages (SSR using EJS)
│   │   ├── layout.ejs   # Main layout (header, footer)
│   │   ├── index.ejs    # Home page (list of articles)
│   │   ├── post.ejs     # Individual article page
│   │   ├── login.ejs    # Login page
│   │   ├── dashboard.ejs# User dashboard
│   │
│   ├── /utils           # Helper functions
│   │   ├── generateStatic.js # Script to generate static pages (SSG)
│   │   ├── authMiddleware.js # Protect routes (JWT authentication)
│   │
│   ├── server.js        # Main server file (Express.js entry point)
│
│── /config              # Configurations (DB, server settings)
│   ├── database.js      # MongoDB connection setup
│   ├── env.example      # Example of .env file
│
│── /scripts             # Utility scripts (SSG, DB setup)
│   ├── generateStatic.js# Runs SSG to pre-build pages
│   ├── seedDB.js        # Adds sample data to MongoDB
│
│── package.json         # Project dependencies & scripts
│── .env                 # Environment variables (MongoDB URL, JWT secret)
│── README.md            # Documentation
```