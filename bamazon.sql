DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT primary key,
  product_name  VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) ,
  price  DECIMAL(10,2) NULL,
  stock_quantity  INT
);

INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("iPhone X","Cell phones",1000,20),
                            ("Neck massager","Health & Household",49.95,10),
                            ("Blender","Kitchen",86.95,8),
                            ("Xbox One","Video Games",229.99,32),
                            ("Crib","Baby",109.00,8),
                            ("iRobot","Electronics",900.00,11),
                            ("Hair dryer","Beauty",37.00,20),
                            ("Instant pot","Home & Kitchen",37.00,11),
                            ("Pet Crate","Pet supplies",38.99,13),
                            ("Guitar","Musical Instruments",89.99,15);
								

CREATE TABLE departments(
		department_id INT AUTO_INCREMENT PRIMARY KEY,
        department_name VARCHAR(20) NOT NULL,
        over_head_costs DECIMAL(10,2)
);
UPDATE products SET department_name = "Home & Kitchen" WHERE product_name = "Blender";
ALTER TABLE products ADD COLUMN product_sales INT NOT NULL;
ALTER TABLE products MODIFY COLUMN department_name VARCHAR(100);
INSERT INTO departments(department_name,over_head_costs) VALUES("Cell phones",1000),("Electronics",500),
                                                    ("Camera & Accesories",5000),("Home & Kitchen",2000);


select * from products where stock_quantity < 5;

SELECT * FROM products;
SELECT * FROM departments;

select d.department_id,d.department_name,d.over_head_costs, p. product_sales,
d.over_head_costs - p. product_sales AS total_profit from departments d INNER JOIN products p 
						on d.department_name = p.department_name ;

select d.department_id,d.department_name,d.over_head_costs, sum(p. product_sales) AS product_sales,
 product_sales - d.over_head_costs AS total_profit from departments d INNER JOIN products p 
						on d.department_name = p.department_name GROUP BY d.department_name ;

