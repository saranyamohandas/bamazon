var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "password",
    database : "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    getSupervisorChoice();
});


function getSupervisorChoice(){
    inquirer.prompt([{
        type: "list",
        choices:["View Product Sales by Department","Create New Department","Quit"],
        name : "userInp"
    }]).then(function(res){
        //console.log(UserInp.managerInp);
        switch (res.userInp){
            case "View Product Sales by Department":
                viewProductSales();
                break;
            case "Create New Department":
                createNewDept();
                break;
            case "Quit":
                quitApp();
        }
    });
};

function viewProductSales(){
    var query = connection.query("select d.department_id,d.department_name,d.over_head_costs, sum(p. product_sales) AS product_sales, (product_sales - d.over_head_costs) AS total_profit from departments d INNER JOIN products p on d.department_name = p.department_name GROUP BY d.department_name",function(err,rows){
        if(err) throw err;
       
        //instantiate table
        var table = new Table({
    head : ["Dept_id","Dept_name","Overhead_cost","Product_Sales","Total_profit"]
});
        rows.forEach(function(data){
            table.push([data.department_id,data.department_name,data.over_head_costs,data.product_sales,data.total_profit]);
        });
        console.log("\n**** Products sales by department  ****\n");
        console.log(table.toString());
        continueApp();
    }
                                )
    
}
  


function createNewDept(){
    inquirer.prompt([
        {
        type: "input",
        message : "Enter the name of new department:",
        name : "userInpdept"
      },
        {
        type: "input",
        message : "Enter the over_head_cost for the department: ",
        name : "userInpcost"
      }
    ]).then(function(res){
           var query = connection.query("INSERT INTO DEPARTMENTS (department_name,over_head_costs) VALUES (?,?)", [res.userInpdept,res.userInpcost] ,function(err,rows){
               if(err) throw err;
               console.log(rows.affectedRows + " new department added!\n ");
               console.log(query.sql);
               continueApp();
               }
        )
    })
    
}

function continueApp(){
    inquirer.prompt([{
        type:"list",
        choices:["Continue with application","Quit"],
        name:"userInp"
    }]).then(function(res){
        switch (res.userInp){
            case "Continue with application": 
                getSupervisorChoice();
                break;
            case "Quit":
                quitApp();
        }
    })
    
}

function quitApp(){
    process.exit(0);
}



