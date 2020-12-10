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
      choices: ["veiw all emloyees", "add employee"]
    },
  ])
  .then(function(response) {
if (response.questions ==="veiw all emloyees" ){
    viewAllEmployees()
} else if (response.questions === "add employee"){
  createEmployee()
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
