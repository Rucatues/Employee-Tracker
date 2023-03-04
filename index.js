const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ====================Establishing mysql connection====================
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mysql2323',
    database: 'hospitalemployees_db'
},
    console.log("You are now connected to the hospital employees database")
);

let roleID = '';
let manager = '';
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
};

// ====================Menu options====================
function viewAllEmployees() {
    console.log("viewing all employees");
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query("SELECT * FROM employees;"),
        function (err, res) {
            if (err) {
                console.log("ERROR!");
                console.log(err);
            }
            console.table(res);
            menu();
        }
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
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
        setRoleIDandManagerID(data);
        db.query(`INSERT INTO employees (${data.first}, ${data.last}, ${roleID}, ${manager}`), (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
            menu();
        }
    });
};

function setRoleIDandManagerID(data) {
    if (data.choices === 'Clinic Manager') {
        roleID = 1;
        manager = '';
        console.log("Clinic Manager picked")
    }
    else if (data.choices === 'Nurse') {
        roleID = 2;
        manager = '';
        console.log("Nurse picked")
    } else if (data.choices === 'Medical Assistant') {
        roleID = 2;
        manager = '';
        console.log("Medical Assistant picked")
    } else if (data.choices === 'Sonography Manager') {
        roleID = 3;
        manager = '';
        console.log("Sonography Manager picked")
    } else if (data.choices === 'Sonographer') {
        roleID = 3;
        manager = '';
        console.log("Sonographer picked")
    }
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
    console.log("added role");
    // WHEN I choose to add a role
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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
    console.log("added department");
    // WHEN I choose to add a department
    // THEN I am prompted to enter the name of the department and that department is added to the database
};

function finish() {
    console.log("finished with menu");
    // What to do when finished? Just display all data? 
};

menu();

//====================Default response for any other request====================
app.use((req, res) => {
    res.status(404).end();
});

// ====================Listening to port====================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});