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
    db.query(`
        SELECT employees.id AS 'ID', 
                employees.first_name AS 'First Name', 
                employees.last_name AS 'Last Name', 
                roles.title AS 'Role', 
                departments.department_name AS 'Department Name', 
                roles.salary AS 'Salary', 
                manager.first_name AS 'Manager'
                FROM employees
                LEFT JOIN roles ON (employees.role_id = roles.id)
                LEFT JOIN departments ON (roles.department_id = departments.id)
                LEFT JOIN employees manager ON (employees.manager_id = manager.id)`,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
            menu();
        });
};

function addEmployee() {
    db.query(`SELECT * FROM roles`, (err, results) => {
        if (err) {
            console.log(err);
        }
        let rolesArray = [];
        for (let i = 0; i < results.length; i++) {
            rolesArray.push(results[i].title)
        }
        db.query(`SELECT * FROM employees`, (err, results) => {
            if (err) {
                console.log(err);
            }
            let managerArray = [];
            for (let i = 0; i < results.length; i++) {
                const m = results[i].first_name + " " + results[i].last_name;
                managerArray.push(m)
            }
            console.log(rolesArray)
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
                choices: rolesArray,
                name: 'role'
            }, {
                type: 'list',
                message: "Who is the manager of this Employee?",
                choices: managerArray,
                name: 'manager'
            }
            ]).then((data) => {
                const roleID = rolesArray.indexOf(data.role) + 1;
                console.log(roleID);
                const managerID = managerArray.indexOf(data.manager) + 1;
                console.log(managerID);
                db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.first}", "${data.last}", "${roleID}", "${managerID}")`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    menu();
                })
            });
        })

    }
    )

};

function updateEmployee() {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) {
            console.log(err);
        }
        let employeeArray = [];
        for (let i = 0; i < result.length; i++) {
            const e = result[i].first_name + " " + result[i].last_name;
            employeeArray.push(e)
        }
        db.query(`SELECT * FROM roles`, (err, result) => {
            if (err) {
                console.log(err);
            }
            let rolesArray = [];
            for (let i = 0; i < result.length; i++) {
                rolesArray.push(result[i].title)
            }
            inquirer.prompt([{
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeArray,
                name: 'employee'
            }, {
                type: 'list',
                message: "What is the employee's role?",
                choices: rolesArray,
                name: 'role'
            }]).then((data) => {
                let roleID = rolesArray.indexOf(data.role) + 1;
                let employeeID = employeeArray.indexOf(data.employee) + 1;
                db.query(`UPDATE employees SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.table(result);
                    menu();
                })
            })
        })
    });

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
    db.query(`SELECT * FROM departments;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        let departmentArray = [];
        for (let i = 0; i < result.length; i++) {
            const d = result[i].department_name;
            departmentArray.push(d)
        }
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
            choices: departmentArray
        }
        ]).then((data) => {
            let departmentID = departmentArray.indexOf(data.department) + 1;
            console.log(departmentID)
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${departmentID});`, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.table(result);
                    menu();
                }
            })
        });
    })

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