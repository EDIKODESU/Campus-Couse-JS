CREATE DATABASE IF NOT EXISTS bd;
GRANT ALL PRIVILEGES ON bd.* TO 'bmaltsev'@'localhost';
USE bd;
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT,
    login VARCHAR(31) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    fullName VARCHAR(63) NOT NULL,
    email VARCHAR(63) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cards (
    id INT(11) AUTO_INCREMENT,
    url_card VARCHAR(50) NOT NULL UNIQUE,
    power INT(11) NOT NULL,
    protection INT(11) NOT NULL,
    mana INT(11) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);