const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');


// ====================Establishing mysql connection====================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'addpassword here',
    database: 'hospitalemployees_db'
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

// ====================Menu options====================
function viewAllEmployees() {
    console.log("viewing all employees");
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
};

function addEmployee() {
    console.log("added employee");
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
};

function updateEmployee() {
    console.log("updated employee");
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and their new role and this information is updated in the database
};

function viewAllRoles() {
    console.log("viewing all roles");
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
};

function addRole() {
    console.log("added role");
    // WHEN I choose to add a role
    // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
};

function viewAllDepartments() {
    console.log("viewing all departments");
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
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

// You might also want to make your queries asynchronous. MySQL2 exposes a .promise() function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the npm documentation on MySQL2Links to an external site..