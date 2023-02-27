const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

function menu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Welcome to the Employee Tracker! What would you like to do?',
            name: 'nextstep',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
            ]
        }
    ])
        .then((data) => {
            console.log(data);
            if (data.nextstep === 'View All Employees') {
                viewAllEmployees();
            }
            else if (data.nextstep === 'Add Employee') {
                addEmployee();
            } else if (data.nextstep === 'Update Employee Role') {
                updateEmployee();
            } else if (data.nextstep === 'View All Roles') {
                viewAllRoles();
            } else if (data.nextstep === 'Add Role') {
                addRole();
            } else if (data.nextstep === 'View All Departments') {
                viewAllDepartments();
            } else if (data.nextstep === 'Add Department') {
                addDepartment();
            } else {
                finish();
            }
        })
}


function viewAllEmployees() {
    console.log("viewing all employees");
};

function addEmployee() {
    console.log("added employee");
};

function updateEmployee() {
    console.log("updated employee");
};

function viewAllRoles() {
    console.log("viewing all roles");
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
};

function addRole() {
    console.log("added role");
};

function viewAllDepartments() {
    console.log("viewing all departments");
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
};

function addDepartment() {
    console.log("added department");
};

function finish() {
    console.log("finished with menu");
};

menu();