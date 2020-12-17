const inquirer = require("inquirer");
const mysql = require ("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "T3chnolo@y",
    database: "employee_db"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  function start (){

  
inquirer
  .prompt([
    {
      type: "list",
      message: "What do you want to do?",
      name: "questions",
      choices: ["view all emloyees", "add employee", "view all roles", "add roles", "view all departments", "add department"]
    },
  ])
  .then(function(response) {
if (response.questions ==="view all emloyees" ){
    viewAllEmployees()
} else if (response.questions === "add employee"){
  createEmployee()
}else if (response.questions === "view all roles"){
  viewRoles()
} else if (response.questions === "add roles"){
  createRole()
}else if (response.questions === "view all departments"){
  viewDepartments()
}else if (response.questions === "add department"){
  createDepartment()
}

  });
  }
  function viewAllEmployees(){
      console.log("hello")
      connection.promise().query("SELECT * FROM employee").then(([rows])=> {
          console.table(rows)
          start()
      })
  }
  function viewRoles(){
    console.log("hello")
    connection.promise().query("SELECT * FROM role").then(([rows])=> {
        console.table(rows)
        start()
    })
}
function viewDepartments(){
  console.log("hello")
  connection.promise().query("SELECT * FROM department").then(([rows])=> {
      console.table(rows)
      start()
  })
} 
function createEmployee(){
  connection.promise().query("SELECT * FROM role").then(([rows])=> {
    const roleArray = rows.map(function(role){
      return ({
        name: role.title,
        value:role.id
      })
    })
    connection.promise().query("SELECT * FROM employee").then(([rows])=> {
      const employeeArray = rows.map(function(employee){
        const fullName = employee.first_name +' ' + employee.last_name
        return ({
          name: fullName, 
          value:employee.id
        })
      })
      inquirer.prompt([
        {
          name: "first_name",
         message: "what is your first name",
         type: "input"
        },
        {
          name: "last_name",
         message: "what is your first last_name",
         type: "input"
        },
        {
          name: "role_id",
         message: "what is your role",
         type: "list",
         choices: roleArray
        },
        {
          name: "manager_id",
         message: "who is your manager",
         type: "list",
         choices: employeeArray
        },
      ]).then(answer=> {
        connection.promise().query("INSERT INTO employee SET ?", answer).then(() =>{
 console.log ("employee was add") 
 start()
        })
      })
    })
  })
}
function createRole(){
  connection.promise().query("SELECT * FROM department").then(([rows])=> {
    const departmentArray = []
    rows.forEach(function(department){
      departmentArray.push({
        name: department.name,
        value:department.id
      })
    })
    
      inquirer.prompt([
        {
          name: "title",
         message: "what is your title?",
         type: "input"
        },
        {
          name: "salary",
         message: "what is your salary?",
         type: "input"
        },
        {
          name: "department_id",
         message: "what is your department",
         type: "list",
         choices: departmentArray
        },
        
      ]).then(answer=> {
        connection.promise().query("INSERT INTO role SET ?", answer).then(() =>{
 console.log ("role") 
 start()
        })
      })
    })
  
}
inquirer.prompt([
        {
          name: "title",
         message: "what is your title?",
         type: "input"
        },
        {
          name: "salary",
         message: "what is your salary?",
         type: "input"
        },
        {
          name: "department_id",
         message: "what is your department",
         type: "list",
         choices: departmentArray
        },
        
      ]).then(answer=> {
        connection.promise().query("INSERT INTO role SET ?", answer).then(() =>{
 console.log ("role") 
 start()
        })
      })

     const createDepartment = function(){
      inquirer.prompt([
        {
          name: "name",
         message: "what is your dpartments name?",
         type: "input"
        },
    
      ]).then(answer=> {
        connection.promise().query("INSERT INTO department SET ?", answer).then(() =>{
 console.log ("department") 
 start()
        })
      })
     }