# LMS Backend Server

This is the backend server for the LMS (Learning Management System) website, built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Database

1. Make sure MySQL is running on your machine
2. Update the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lms_database
DB_PORT=3306
PORT=5000
```

### 3. Create Database and Tables

Run the SQL schema file to create the database and tables:

```bash
mysql -u root -p < schema.sql
```

Or manually execute the SQL commands in `schema.sql` using MySQL Workbench or any MySQL client.

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course by ID
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

## Testing the API

You can test the API using:
- Browser (for GET requests)
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL request:
```bash
curl http://localhost:5000/api/courses
```

## Project Structure

```
server/
├── index.js          # Main server file
├── db.js            # Database connection
├── schema.sql       # Database schema
├── .env             # Environment variables
├── package.json     # Dependencies
└── README.md        # This file
```

## Frontend Integration

The frontend Vite dev server is configured to proxy API requests to this backend server. All requests to `/api/*` will be forwarded to `http://localhost:5000`.
