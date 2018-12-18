# bamazon node app
                  bamazon node application

### Overview of the application -
* This is back-end interactive nodejs application that uses MySql database for storing data.
* This application requires "mysql" and "inquirer" node module.
* App queries bamazon Mysql database that has customer and department information stored in it.
* App takes user input from CLI and builds SQL queries for querying tables. 
* Basically there are three node applications based on the user.
     1. bamazonCustomer - shopping application for customer
         -   Customer is given option to choose purchase available product. Once customer has placed the order, application checks if store has enough of the product to meet the customer's request. If available, cost of purchase is displayed and inventory is updated.
         -  If customer requirement is not met,appropriate message is displayed to customer on insufficient quantity.

     2. bamazonManager - application for manager to view,update and add 
          inventory details. Below are the options available for manager.
         
          -  View Products for Sale
          -  View Low Inventory
          -  Add to Inventory
          -  Add New Product
          
     3. bamazonSupervisor - application for supervisor
         - View Product Sales by Department
         - Create New Department


* Below are the snapshots of the application -


  ![bamazoncustomer](https://raw.githubusercontent.com/saranyamohandas/bamazon/master/images/bamazonManager1.png)

![bamazoncust2](https://raw.githubusercontent.com/saranyamohandas/bamazon/master/images/bamazoncust3.png)

 ![bamazonManager](https://raw.githubusercontent.com/saranyamohandas/bamazon/master/images/bamazonManager2.png)
![bamazonManager1](https://raw.githubusercontent.com/saranyamohandas/bamazon/master/images/bamazoncust1.png)
![bamazonSupervisor](https://raw.githubusercontent.com/saranyamohandas/bamazon/master/images/bamazonSupervisor.png)
