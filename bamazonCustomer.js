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
    selectQuery();
});




function selectQuery(){
    var query = connection.query("SELECT * FROM PRODUCTS",function(err,res){
        if(err) throw err;
        //instantiate table
        var table = new Table({
            head : ["Item_id","Product","Price"]
        });
        res.forEach(function(data){
            table.push([data.item_id,data.product_name,
                        data.price]);
        })
        console.log("\n**** Below products are available for sale ****\n");
        console.log(table.toString());
        askUser();
        
    }
                                );
};

function askUser(){
        
    inquirer.prompt([
        {
         type: "input",
         message : "Please enter the ID of the product you would like to purchase?[Enter Q to quit]",
         name : "prodId",
         validate : function(val){
             if(val.toUpperCase() == "Q") {
                 process.exit(0);
         } else {return true}
        }
        },
        {
         type: "input",
         message : "Please enter the number of quantity?[Enter Q to quit]",
         name : "prodQuantity",
         validate : function(val){
             if(val.toUpperCase() == "Q") {
                 process.exit(0);
             } else {return true};
         }
            
        }
    ]).then(function(userInp){
        var query = connection.query("SELECT STOCK_QUANTITY,PRICE FROM PRODUCTS WHERE ?",{ITEM_ID: userInp.prodId },function(err,data){
            if(err) throw err;
            console.log("qty: ",data[0].STOCK_QUANTITY);
            console.log("price: ",data[0].PRICE + "\n");
            checkQuantity(userInp.prodId,userInp.prodQuantity,data[0].STOCK_QUANTITY,data[0].PRICE)
        }
                                    ) 
        console.log(query.sql + "\n");
    })
    
    
}

function checkQuantity(id,userqty,availableqty,price){
    if(availableqty < userqty){
        console.log("Sorry the order cannot be placed due to insufficient quantity!\n");
        
    } else {
        var updateQty = availableqty - userqty;
        var totalPrice = userqty * price;
        console.log("updateQty",updateQty);
        var query = connection.query("UPDATE PRODUCTS SET  ?,? WHERE ?",[{STOCK_QUANTITY:updateQty},{PRODUCT_SALES: totalPrice}, {item_id:id}],function(err,res){
            if(err) throw err;
            console.log(res.affectedRows + " product updated!\n");
            console.log("Your total purchase amount is $" + totalPrice + ".\n" );
            console.log(query.sql + "\n");
            continueApp();        
        })
        }
}

function continueApp(){
    inquirer.prompt([{
        type:"list",
        choices:["Continue shopping","Quit"],
        name:"userInp"
    }]).then(function(res){
        switch (res.userInp){
            case "Continue shopping": 
                selectQuery();
                break;
            case "Quit":
                quitApp();
        }
    })
    
}

function quitApp(){
    console.log("\n Thanks for shopping!");
    process.exit(0);
}