CREATE DATABASE IF NOT EXISTS data_user;
CREATE USER IF NOT EXISTS 'ehlinystyi'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON * . * TO 'ehlinystyi'@'localhost';

USE data_user;

CREATE TABLE inf_user(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
login VARCHAR(30) UNIQUE NOT NULL,
password TEXT NOT NULL,
name TEXT NOT NULL,
mail TEXT NOT NULL
);