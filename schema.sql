DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  foreign key (department_id) references department(id),
  PRIMARY KEY (id)
);
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL,
  foreign key (role_id) references role(id),
  manager_id INT,
  foreign key (manager_id) references employee(id),
  PRIMARY KEY (id)
);

USE employee_db;
INSERT INTO department (name) VALUES ("Sales"), ("Programming");
INSERT INTO role (title,salary, department_id) VALUES ("Salesman", 10000,1 ), ("Programer", 20000, 2);
INSERT INTO employee(first_name,last_name, role_id, manager_id) VALUES ("John","Fred",2,NULL ),("Junior","Obed", 1, 1)
