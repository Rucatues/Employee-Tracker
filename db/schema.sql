DROP DATABASE IF EXISTS employees_db; 

CREATE DATABASE employees_db; 

USE employees_db; 

CREATE TABLE departments (
     id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
        -- department_id: INT to hold reference to department role belongs to
); 


CREATE TABLE employees (
     id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT, 
        -- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    -- FOREIGN KEY (manager_id) REFERENCES 
);

-- how to complete manager_id FOREIGN KEY? 
