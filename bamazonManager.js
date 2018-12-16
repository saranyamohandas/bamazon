var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//instantiate table
var table = new Table({
    head : ["Item_id","Product","department","Price","quantity"]
});

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




//function selectQuery(){
//    var query = connection.query("SELECT * FROM PRODUCTS",function(err,res){
//        if(err) throw err;
//        res.forEach(function(data){
//            table.push([data.item_id,data.product_name,
//                        data.price]);
//        })
//        console.log("\n**** Below products are available for sale ****\n");
//        console.log(table.toString());
//        getManagerChoice();
//        
//    }
//                                );
//};

function getManagerChoice(){
    inquirer.prompt([{
        type: "list",
        choices:["View products for sale","View low inventory","Add to inventory","Add new product"],
        name : "managerInp"
    }]).then(function(UserInp){
        console.log(UserInp.managerInp);
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
        }
    });
};

function viewProducts(){
    var query = connection.query("SELECT * FROM PRODUCTS",function(err,rows){
        if(err) throw err;
        console.log(rows);
        rows.forEach(function(data){
            table.push([data.item_id,data.product_name,data.department_name,data.price,data.stock_quantity]);
        });
        console.log("\n**** Products available for sale  ****\n");
        console.log(table.toString());
    }
                                )
}

function viewLowInv(){
    var query = connection.query("SELECT * FROM PRODUCTS WHERE stock_quantity < 5 ",function(err,rows){
        if(err) throw err;
        rows.forEach(function(data){
          table.push([data.item_id,data.product_name,data.department_name,data.price,data.stock_quantity]);  
        })
        console.log("\n**** Products with low inventory ****\n");
        console.log(table.toString());
    }
                     
                    )
    }

function addToInv(){
    inquirer.prompt([{
        type: "input",
        message : "Please enter the id of the product to update inventory:",
        name : "userInpId"
    },{
        type: "input",
        message : "Please enter the quanity for update:",
        name : "userInpQty"
    }
    ]).then(function(userInp){
           var query = connection.query("UPDATE PRODUCTS SET STOCK_QUANTITY = " + userInp.STOCK_QUANTITY" + WHERE ID =" + userInp.userInpQty)
        
    })
 
    
    
}



