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
    getManagerChoice();
});


function getManagerChoice(){
    inquirer.prompt([{
        type: "list",
        choices:["View products for sale","View low inventory","Add to inventory","Add new product","Quit"],
        name : "managerInp"
    }]).then(function(UserInp){
        //console.log(UserInp.managerInp);
        switch (UserInp.managerInp){
            case "View products for sale":
                viewProducts();
                break;
            case "View low inventory":
                viewLowInv();
                break;
            case "Add to inventory":
                addToInv();
                break;
            case "Add new product":
                addNewProd();
                break;
            case "Quit":
                quitApp();
                
        }
    });
};

function viewProducts(){
    var query = connection.query("SELECT * FROM PRODUCTS",function(err,rows){
        if(err) throw err;
        
        //instantiate table
        var table = new Table({
    head : ["Item_id","Product","department","Price","quantity"]
});
        rows.forEach(function(data){
            table.push([data.item_id,data.product_name,data.department_name,data.price,data.stock_quantity]);
        });
        console.log("\n**** Products available for sale  ****\n");
        console.log(table.toString());
        continueApp();
    }
                                )
    
}

function viewLowInv(){
    var query = connection.query("SELECT * FROM PRODUCTS WHERE stock_quantity < 5 ",function(err,rows){
        if(err) throw err;
        //instantiate table
        var table = new Table({
    head : ["Item_id","Product","department","Price","quantity"]
});
        rows.forEach(function(data){
          table.push([data.item_id,data.product_name,data.department_name,data.price,data.stock_quantity]);  
        })
        console.log("\n**** Products with low inventory ****\n");
        console.log(table.toString());
        continueApp();
    }
                                )
         
    }

function addToInv(){
    inquirer.prompt([
        {
        type: "input",
        message : "Please enter the id of the product to update inventory:",
        name : "userInpId"
      },
        {
        type: "input",
        message : "Please enter the quanity for update:",
        name : "userInpQty"
      }
    ]).then(function(userInp){
           var query = connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = " + userInp.userInpQty + " WHERE ITEM_ID =" + userInp.userInpId,function(err,rows){
               if(err) throw err;
               console.log(rows.affectedRows + " products updated!\n ");
               console.log(query.sql);
               continueApp()
               }
                                       )
    })
    
}

function addNewProd(){
    inquirer.prompt([
        {
        type: "input",
        message : "Enter the name of the new product:",
        name : "userInpProd"
      },
        {
        type: "input",
        message : "Enter the department for the new product: ",
        name : "userInpDept"
      },
        {
        type: "input",
        message : "Enter the price for the new product: ",
        name : "userInpPrice"
      },
        {
        type: "input",
        message : "Enter the available stock quantity: ",
        name : "userInpQty"
      }
    ]).then(function(userInp){
           var query = connection.query("INSERT INTO PRODUCTS(product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)", [userInp.userInpProd,userInp.userInpDept,userInp.userInpPrice,userInp.userInpQty] ,function(err,rows){
               if(err) throw err;
               console.log(rows.affectedRows + " products updated!\n ");
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
                getManagerChoice();
                break;
            case "Quit":
                quitApp();
        }
    })
    
}

function quitApp(){
    process.exit(0);
}



