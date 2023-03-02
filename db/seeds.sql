INSERT INTO departments (department_name)
VALUES ("Upper Management"),
       ("Clinical staff"),
       ("Sonography");

INSERT INTO roles (title, salary, department_id)
VALUES ("Clinic Manager", 1000000, 1),
       ("Nurse", 70000, 2),
       ("Medical Assistant", 40000, 2),
       ("Sonography Manager", 90000, 3)
       ("Sonographer", 70000, 3); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mindy", "Christensen", 1, null),
       ("Andrea", "Smith", 2, 1),
       ("Orelia", "Garcia", 3, 1),
       ("Xi", "Chen", 4, null), 
       ("Alex", "Nott", 5, 4);



