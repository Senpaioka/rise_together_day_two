-- creating database
CREATE DATABASE company_db;

-- creating a table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(50) UNIQUE NOT NULL,
    salary INT,
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- inserting data
INSERT INTO employees(name, email, salary, department, created_at)
VALUES 
('john', 'john@gmail.com', 30000, 'IT', '2025-01-10'),
('doe', 'doe@gmail.com', 45000, 'HR', '2025-02-15'),
('alex', 'alex@gmail.com', 50000, 'Finance', '2025-03-01'),
('roxy', 'roxy@gmail.com', 40000, 'Marketing', '2025-03-20'),
('david', 'david@gmail.com', 55000, 'IT', '2025-04-05');

-- selecting all data
SELECT * FROM employees;


-- selecting specific data
SELECT name, salary FROM employees;


-- WHERE condition
SELECT * FROM employees
WHERE salary > 40000;


-- ORDER BY
SELECT * FROM employees
ORDER BY salary DESC;

-- selecting first 3 highest paying employee
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 3;

-- updating one employee's salary
UPDATE employees
SET salary = salary + 5000
WHERE name = 'alex';

-- deleting an employee
DELETE FROM employee
WHERE id = 4;