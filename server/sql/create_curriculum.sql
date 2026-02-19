-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50),
    type ENUM('video', 'quiz', 'text') DEFAULT 'video',
    content TEXT,
    video_url VARCHAR(255),
    is_preview BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections (id) ON DELETE CASCADE
);

-- Insert sample data for existing courses (Using valid course ID 40)
-- Course 40: Introduction to Web Development (or whatever it is)

INSERT INTO
    sections (course_id, title, order_index)
SELECT 40, 'Getting Started', 1
WHERE
    EXISTS (
        SELECT 1
        FROM courses
        WHERE
            id = 40
    );

INSERT INTO
    sections (course_id, title, order_index)
SELECT 40, 'HTML Basics', 2
WHERE
    EXISTS (
        SELECT 1
        FROM courses
        WHERE
            id = 40
    );

INSERT INTO
    sections (course_id, title, order_index)
SELECT 40, 'CSS Styling', 3
WHERE
    EXISTS (
        SELECT 1
        FROM courses
        WHERE
            id = 40
    );

-- Insert lessons using subqueries to find section IDs to avoid hardcoding section IDs

INSERT INTO
    lessons (
        section_id,
        title,
        duration,
        type,
        video_url,
        is_preview,
        order_index
    )
SELECT id, 'Welcome to the Course', '5:00', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', TRUE, 1
FROM sections
WHERE
    course_id = 40
    AND title = 'Getting Started'
LIMIT 1;

INSERT INTO
    lessons (
        section_id,
        title,
        duration,
        type,
        video_url,
        is_preview,
        order_index
    )
SELECT id, 'Setting up Environment', '10:00', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', FALSE, 2
FROM sections
WHERE
    course_id = 40
    AND title = 'Getting Started'
LIMIT 1;

INSERT INTO
    lessons (
        section_id,
        title,
        duration,
        type,
        video_url,
        is_preview,
        order_index
    )
SELECT id, 'HTML Tags & Attributes', '15:00', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', FALSE, 1
FROM sections
WHERE
    course_id = 40
    AND title = 'HTML Basics'
LIMIT 1;