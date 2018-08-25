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
    runBam();
});

function runBam() {

    connection.query('SELECT * FROM `products`', function (error, results, fields) {
        console.log(displayProd(results));
        buySomething();
    })
};

function buySomething() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter ID of product you want to buy: ",
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

            connection.query("SELECT stock_quantity, price FROM products WHERE ?", { id: answer.id }, function (err, res) {
                var stock = res[0].stock_quantity;
                var bought = answer.quant;
                var total = bought * res[0].price;

                // console.log(stock);
                // console.log(answer.quant);
                // console.log(stock - bought);
                if (stock > bought || stock === bought) {

                    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [stock - bought, answer.id], function (error, results, fields) {
                        if (error) throw error;
                        // console.log(results);
                    });

                    console.log(`Your total is: $${total}`);
                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Do you want to order again?",
                            name: "confirm"
                        }
                    ]).then((answers) => {

                        if (answers.confirm) {
                            runBam();
                        }
                        else {
                            connection.end();
                        }
                    })


                }
                else {
                    console.log("Insufficient quantity!");
                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Do you want to order again?",
                            name: "confirm"
                        }
                    ]).then((answers) => {

                        if (answers.confirm) {
                            runBam();
                        }
                        else {
                            connection.end();
                        }
                    })

                }

            });
        });
}

function displayProd(results) {

    for (let i in results) {
        console.log(`
        ID: ${results[i].id}
        Product: ${results[i].product_name}
        Price: ${results[i].price}
        `
        )

    };


};