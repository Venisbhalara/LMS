-- LMS Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS lms_database;

USE lms_database;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor VARCHAR(255),
    duration VARCHAR(100),
    price DECIMAL(10, 2),
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM(
        'student',
        'instructor',
        'admin'
    ) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT DEFAULT 0,
    status ENUM(
        'active',
        'completed',
        'dropped'
    ) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Student Enrollments Log Table (Denormalized for easy access)
CREATE TABLE IF NOT EXISTS student_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    course_price DECIMAL(10, 2) NOT NULL,
    enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enrollment_id INT, -- Optional reference to the main enrollment record
    branch VARCHAR(50) -- Optional: if you want to track branch/category
);

-- Sample data for courses
INSERT INTO
    courses (
        title,
        description,
        instructor,
        duration,
        price
    )
VALUES (
        'Introduction to Web Development',
        'Learn the basics of HTML, CSS, and JavaScript',
        'Jhon Doe',
        '8 weeks',
        99.99
    ),
    (
        'Advanced React Development',
        'Master React with hooks, context, and advanced patterns',
        'Jane Smith',
        '10 weeks',
        149.99
    ),
    (
        'Node.js Backend Development',
        'Build scalable backend applications with Node.js and Express',
        'Mike Johnson',
        '12 weeks',
        129.99
    ),
    (
        'Database Design with MySQL',
        'Learn to design and optimize MySQL databases',
        'Sarah Williams',
        '6 weeks',
        89.99
    );

-- VIEW for easy human-readable enrollment data
CREATE OR REPLACE VIEW enrollment_summary AS
SELECT
    e.id AS enrollment_id,
    u.name AS student_name,
    u.email AS student_email,
    c.title AS course_title,
    c.price AS course_price,
    e.enrolled_at,
    e.status
FROM
    enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
ORDER BY e.enrolled_at DESC;

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Help Requests table
CREATE TABLE IF NOT EXISTS help_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    resume_path VARCHAR(255) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);