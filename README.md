# Premium LMS Platform

A high-quality, full-featured Learning Management System (LMS) built with React, Node.js, and MySQL. This platform provides a seamless experience for students, instructors, and administrators to manage online learning.

## 🚀 Features

### 👤 User / Student
*   **Authentication**: Secure Login and Signup with JWT.
*   **Course Discovery**: Browse and search for courses with filtering options.
*   **Course Enrollment**: Enroll in courses and track progress.
*   **Learning Dashboard**: Access enrolled courses, view progress, and continue learning.
*   **Interactive Lessons**: Video lessons and quizzes.
*   **Profile Management**: Update personal details and view activity.

### 👨‍🏫 Instructor
*   **Instructor Dashboard**: Overview of courses and student statistics.
*   **Course Management**: Create and manage courses.
*   **Student Progress**: View how students are performing.

### 🛡️ Admin
*   **User Management**: View, delete, and manage all users.
*   **Role Management**: Assign roles (Student, Instructor, Admin).
*   **Data Export**: Sync user data to Excel for external reporting.
*   **System Overview**: View total users and platform statistics.

## 🛠️ Technology Stack

### Frontend
*   **React**: UI Library.
*   **Vite**: Build tool for fast development.
*   **Tailwind CSS**: Utility-first styling for a modern look.
*   **Framer Motion**: Smooth animations and transitions.
*   **React Router**: Navigation and routing.
*   **React Icons & Heroicons**: Iconography.

### Backend
*   **Node.js & Express**: API Server.
*   **MySQL**: Relational database for data storage.
*   **JWT (JSON Web Tokens)**: Secure authentication.
*   **Bcrypt**: Password hashing.
*   **XLSX**: Excel file generation and synchronization.

## 📂 Project Structure

```
L-M-S/
├── src/                # Frontend Source
│   ├── components/     # Reusable UI components
│   ├── context/        # Global state (AuthContext)
│   ├── pages/          # Application pages
│   │   ├── Admin/      # Admin dashboard & User management
│   │   ├── Auth/       # Login & Signup pages
│   │   ├── Dashboard/  # Student dashboard
│   │   ├── CourseDetail/ # Course specific views
│   │   └── ...         # other pages (Home, Courses, Payment, etc.)
│   └── main.jsx        # Entry point
├── server/             # Backend Source
│   ├── routes/         # API Routes (auth, users, enrollments)
│   ├── middleware/     # Auth & Admin verification
│   ├── utils/          # Utilities (Excel logger, DB connection)
│   └── index.js        # Server entry point
└── package.json        # Dependencies and scripts
```

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js (v16+)
*   MySQL Server

### 1. Database Setup
Ensure you have MySQL installed and running. Create a database for the LMS and configure the connection settings in `server/db.js` (or `.env` if applicable).

### 2. Install Dependencies

**Root Directory (Frontend)**
```bash
npm install
```

**Server Directory (Backend)**
```bash
cd server
npm install
```

### 3. Running the Application

**Start the Backend Server**
```bash
cd server
npm run dev
# Server generally runs on http://localhost:5000 or similar
```

**Start the Frontend Application**
Open a new terminal:
```bash
npm run dev
# Frontend generally runs on http://localhost:5173
```

## 📄 Key Workflows

### User Registration & Login
New users can sign up from the `/signup` page. By default, they are assigned the 'student' role. They can then log in to access the platform.

### Admin Panel
Accessible only to users with the 'admin' role.
1.  Log in as an admin.
2.  Navigate to the Admin Dashboard (usually via profile menu or `/admin/users`).
3.  **Manage Users**: View list of users, search, delete, or add new users manually.
4.  **Sync Excel**: Click the "Sync Excel" button to export the latest user base to `server/users.xlsx`.

### Course Enrollment
Students can browse the course catalog, view details, and click "Enroll". If payment is integrated, they will proceed to checkout. Enrolled courses appear in their Dashboard.

## 🤝 Contributing
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

---
© 2024 Premium LMS. All rights reserved.
