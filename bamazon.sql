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
ALTER TABLE products ADD COLUMN product_sales INT NOT NULL;
ALTER TABLE products MODIFY COLUMN product_sales INT NULL;

SELECT * FROM products;
select * from products where stock_quantity < 5;
