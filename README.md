# 🎓 Instacampus

Instacampus is a full-stack web application designed to connect students on campus. It allows users to post updates, comment, react, track trends — all in one place.

Built with modern web technologies including React, Express, TypeScript, and PostgreSQL.

---
 **Live Site**: [https://insta-campus.vercel.app](https://insta-campus.vercel.app)
## 🛠️ Tech Stack

**React**, **TypeScript**, **Node.js**, **Express.js**, **PostgreSQL**

---

## Features

- User authentication (JWT)
- Create, read, comment on posts
- Upvotes/downvotes on posts
- Comments and threaded discussions
- Trending tags and campus-specific links
- Fully responsive UI

---

## 🖼️ Screenshots
<p>
  <img src="FeedPageimg.jpeg" width="400" alt="Home Page Screenshot"/>
</p>
<p>
  <img src="LoginPage.jpeg" width="400" alt="Login Page Screenshot"/>
</p>


---

## 🏗️ Project Structure

Instacampus/
├── packages/
│ ├── web/ # Frontend (React)
│ └── server/ # Backend (Express)


---

## 🧑‍💻 Local Setup — Step by Step

> Works on **Windows, Mac, or Linux**

### 1. **Clone the Repository**


### 2. **Install Dependencies**


### 3. **Set Up PostgreSQL Database**

- Make sure you have PostgreSQL installed.
- Create a database named `instacampus` (or any name you like).

### 4. **Configure Environment Variables (Backend)**

- In packages/server/, create a `.env` file and add:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/instacampus"
JWT_SECRET="your_random_secret"

### 5. **Run Prisma Migrations**

cd packages/server
npx prisma generate
npx prisma db push


### 6. **Start the Backend Server**

cd packages/server
npm run dev
### 7. **Start the Frontend**

cd packages/web
npm run dev
### 8. **Open in Your Browser**

Go to [http://localhost:3000](http://localhost:3000) — or replace 3000 with your specified frontend port if different

---

## 📝 Notes

- Register or login to use.
- You can post, comment, and upvote/downvote right away!
- For any issues, please create an issue on GitHub or contact Aryan Singh.

---

## Deployment

- **Frontend** – Vercel
- **Backend** – Render
- **Database** – Neon PostgreSQL
---

## 🗃️ Database Design

Here’s the Entity-Relationship (ER) model used in Instacampus:

<p align="center">
  <img src="er_diagram_travellaDB.png" alt="Instacampus ER Diagram" width="600"/>
</p>

---
