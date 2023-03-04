const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ====================Establishing mysql connection====================
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.db_password,
    database: process.env.db_name
},
    console.log("You are now connected to the hospital employees database")
);

// ====================Main Menu====================
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
            }
        })
};

// ====================Menu options====================
function viewAllEmployees() {
    // let managerName = '';
    // if (employees.manager_id === 1) {
    //     managerName = 'Mindy Christensen';
    // } else if (employees.manager_id === 2) {
    //     managerName = 'Xi Chen';
    // };
    db.query(`SELECT * FROM employees JOIN roles ON employees.role_id = roles.id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    });
};

function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        message: "What is Employee's first name?",
        name: 'first'
    }, {
        type: 'input',
        message: "What is Employees last name?",
        name: 'last'
    }, {
        type: 'list',
        message: "What is Employee role?",
        choices: [
            'Clinic Manager',
            'Nurse',
            'Medical Assistant',
            'Sonography Manager',
            'Sonographer'
        ],
        name: 'role'
    }, {
        type: 'list',
        message: "Who is the manager of this Employee?",
        choices: [
            'Mindy Christensen',
            'Xi Chen'
        ],
        name: 'manager'
    }
    ]).then((data) => {
        let roleID = 1;
        let managerID = 1;
        if (data.choices === 'Clinic Manager') {
            roleID = 1;
            managerID = 'null';
        }
        else if (data.choices === 'Nurse') {
            roleID = 2;
            managerID = 1;
        } else if (data.choices === 'Medical Assistant') {
            roleID = 2;
            managerID = 1;
        } else if (data.choices === 'Sonography Manager') {
            roleID = 3;
            managerID = 'null';
        } else if (data.choices === 'Sonographer') {
            roleID = 3;
            managerID = 4;
        }
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.first}", "${data.last}", ${roleID}, ${managerID})`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
            menu();
        })
    });
};

function updateEmployee() {
    console.log("updated employee");
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
};

function viewAllRoles() {
    db.query(`SELECT * FROM roles;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    });
};

function addRole() {
    inquirer.prompt([{
        type: 'input',
        message: "What role would you like to add?",
        name: 'title'
    }, {
        type: 'input',
        message: "What is the salary for this role?",
        name: 'salary'
    }, {
        type: 'list',
        message: "Which department does this role belong to?",
        name: "department",
        choices: [
            'Upper Management',
            'Clinical staff',
            'Sonography'
        ]
    }
    ]).then((data) => {
        let departmentID = 1;
        if (data.choices === 'Upper Management') {
            departmentID = 1;
        } else if (data.choices === 'Clinical staff') {
            departmentID = 2;
        }
        else if (data.choices === "Sonography") {
            departmentID = 3;
        }
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${departmentID});`, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.table(result);
                menu();
            }
        })
    });
};

function viewAllDepartments() {
    db.query(`SELECT * FROM departments;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        menu();
    });
};

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: "What department would you like to add?",
        name: 'department'
    }
    ]).then((data) => {
        db.query(`INSERT INTO departments (department_name) VALUES ("${data.department}");`, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.table(result);
                menu();
            }
        })
    });

};

menu();

// ================Default for any other result===============
app.use((req, res) => {
    res.status(404).end();
});

// ================Listening for port===============
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});