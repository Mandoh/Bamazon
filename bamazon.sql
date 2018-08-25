create database bamazon;
use bamazon;

create table products (
    id integer(10) auto_increment not null,
   product_name varchar(50) not null,
   department_name varchar(50) not null,
   price float not null,
   stock_quantity integer not null,
   primary key (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Nintendo Switch", "Elec", 300.00, 10); 

insert into products(product_name, department_name, price, stock_quantity)
values ("Xbox One", "Elec", 300.00, 15);

insert into products(product_name, department_name, price, stock_quantity)
values ("PS4", "Elec", 300.00, 25);

insert into products(product_name, department_name, price, stock_quantity)
values ("ATH-M50X", "Elec", 200.00, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Dog Leash", "Pets", 20.00, 35);

insert into products(product_name, department_name, price, stock_quantity)
values ("Hamster Cage", "Pets", 15.00, 20);

insert into products(product_name, department_name, price, stock_quantity)
values ("Litter Box", "Pets", 25.00, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Baddidas Expensive Sneakers", "Clothing", 350.00, 5);

insert into products(product_name, department_name, price, stock_quantity)
values ("Something I shouldn't buy", "Clothing", 250.00, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("Jesus Sandals", "Clothing", 50.00, 15);

