DROP DATABASE IF EXISTS employees_db; 

CREATE DATABASE employees_db; 

USE employees_db; 

CREATE TABLE department (
     id INT NOT NULL,
    --  how to make id primary Key? 
    name VARCHAR(30) NOT NULL,
    -- name: VARCHAR(30) to hold department name
);

CREATE TABLE role (
     id INT NOT NULL,
    --  how to make id primary Key? 
    title VARCHAR(30) NOT NULL,
        -- title: VARCHAR(30) to hold role title
    salary DECIMAL NOT NULL,
        -- salary: DECIMAL to hold role salary
    department_id INT NOT NULL
        -- department_id: INT to hold reference to department role belongs to
); 


CREATE TABLE employee (
     id INT NOT NULL,
    --  how to make id primary Key? 
    first_name VARCHAR(30) NOT NULL, 
        -- first_name: VARCHAR(30) to hold employee first name
    last_name VARCHAR(30) NOT NULL,
        -- last_name: VARCHAR(30) to hold employee last name
    role_id INT NOT NULL,
        -- role_id: INT to hold reference to employee role
    manager_id INT, 
        -- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
);

