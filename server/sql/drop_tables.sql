-- Drop tables for badges, certificates, and user_badges
-- Execute this script to remove these tables from the database

USE lms_database;

-- Drop user_badges first (has foreign keys to badges and users)
DROP TABLE IF EXISTS user_badges;

-- Drop certificates (has foreign keys to users and courses)
DROP TABLE IF EXISTS certificates;

-- Drop badges (referenced by user_badges)
DROP TABLE IF EXISTS badges;

-- Verify tables are dropped
SHOW TABLES;