<img width="1470" alt="Screenshot 2025-07-06 at 18 39 56" src="https://github.com/user-attachments/assets/c4611caa-27ab-4753-93ba-50da434e2143" /># 🎓 InstaCampus

A modern full-stack campus social media platform for students and staff to connect, share news, and discuss everything campus-related.

---

## 🚀 Features

- User authentication (JWT)
- Posting with tags and images
- Comments and threaded discussions
- Upvotes/downvotes on posts
- Responsive UI with trending tags and campus links

---

## 🖼️ Screenshots

<!-- Add actual image URLs or relative paths to your repo/images -->
<p>
  <img src="<img width="1470" alt="Screenshot 2025-07-06 at 18 39 56" src="https://github.com/user-attachments/assets/f92c147d-fa61-4612-b7d9-eb05386045ec" />
" width="600" alt="Home Page Screenshot"/>
</p>


---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, Prisma ORM, TypeScript
- **Database:** PostgreSQL

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

- In `packages/server`, copy `.env.example` to `.env`:
- Edit `.env`:
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/instacampus"
JWT_SECRET="choose_any_long_random_string"


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

Go to [http://localhost:3000](http://localhost:3000)

---

## 📝 Notes

- Register or login to use.
- You can post, comment, and upvote/downvote right away!
- For any issues, please create an issue on GitHub or contact Aryan Singh.

---

## 🌏 Deployment (for Later)

- Deploy backend & DB (Railway/Render/other)
- Deploy frontend (Netlify/Vercel)
- Set environment variables in each platform as shown above

---

## 📜 License

MIT

**Built with ❤️ by Aryan Singh and contributors**

