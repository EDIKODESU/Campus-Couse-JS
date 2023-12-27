USE ucode_web;

CREATE TABLE heroes(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) UNIQUE NOT NULL,
description TEXT NOT NULL,
class_role ENUM('tankman', 'healer', 'dps') NOT NULL
);
