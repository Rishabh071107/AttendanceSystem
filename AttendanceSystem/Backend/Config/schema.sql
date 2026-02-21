-- Create database
CREATE DATABASE IF NOT EXISTS leave_management;
USE leave_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  student_id VARCHAR(50),
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  leave_type VARCHAR(50) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  admin_remarks TEXT,
  proof_deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Proof submissions table
CREATE TABLE IF NOT EXISTS proof_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  leave_request_id INT NOT NULL,
  user_id INT NOT NULL,
  file_path VARCHAR(255),
  file_name VARCHAR(255),
  description TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (leave_request_id) REFERENCES leave_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample admin user (password: admin123)
INSERT INTO users (name, email, password, role, student_id, department) 
VALUES ('Admin User', 'admin@example.com', '$2a$10$X7K7Y9Z8X6Y5Z4A3B2C1D0E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5', 'admin', 'ADMIN001', 'Administration')
ON DUPLICATE KEY UPDATE email = email;

-- Insert sample regular user (password: user123)
INSERT INTO users (name, email, password, role, student_id, department) 
VALUES ('John Doe', 'john@example.com', '$2a$10$X7K7Y9Z8X6Y5Z4A3B2C1D0E0F1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5', 'user', 'STU001', 'Computer Science')
ON DUPLICATE KEY UPDATE email = email;
