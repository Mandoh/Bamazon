var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    runManager();
});



function runManager() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "VIEW INVENTORY",
                "VIEW LOW INVENTORY",
                "ADD TO INVENTORY",
                "ADD NEW PRODUCT"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "VIEW INVENTORY":
                    viewInv();
                    break;

                case "VIEW LOW INVENTORY":
                    viewLow();
                    break;

                case "ADD TO INVENTORY":
                    addInv();
                    break;

                case "ADD NEW PRODUCT":
                    addProd();
                    break;
            }
            
        });
}

function viewInv() {
    connection.query('SELECT * FROM `products`', function (error, results, fields) {
        for (let i in results) {
            console.log(`
            ID: ${results[i].id}
            Product: ${results[i].product_name}
            Price: ${results[i].price}
            Quantity: ${results[i].stock_quantity}
            Department: ${results[i].department_name}
            `
            )
        }
        connection.end();
    });
};

function viewLow() {
    connection.query("SELECT * FROM `products` WHERE stock_quantity < 10", function (error, results, fields) {
        for (let i in results) {
            console.log(`
            ID: ${results[i].id}
            Product: ${results[i].product_name}
            Price: ${results[i].price}
            Quantity: ${results[i].stock_quantity}
            Department: ${results[i].department_name}
            `
            )
        }
        connection.end();
    });
}

function addInv() {
    viewInv();
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter ID of product you want to add: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quant",
                type: "input",
                message: "Enter how many: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {


            connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [answer.quant, answer.id], function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
            connection.end();
        })
};

function addProd() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Enter name of product you want to add: ",
               
            },
            {
                name: "quant",
                type: "input",
                message: "Enter how many: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "dept",
                type: "input",
                message: "Enter department name of product: ",
            },
            {
                name: "price",
                type: "input",
                message: "Enter price: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {


            connection.query(`insert into products(product_name, department_name, price, stock_quantity)
            values (?, ?, ?, ?)`, [answer.product, answer.dept, answer.price,answer.quant], function (error, results, fields) {
                if (error) throw error;
                console.log(results);
            });
            connection.end();
        })
};