USE ucode_web;

CREATE TABLE IF NOT EXISTS powers(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
type ENUM('attack', 'defence') NOT NULL
);

CREATE TABLE IF NOT EXISTS heroes_powers(
hero_id INT NOT NULL,
power_id INT NOT NULL,
power_points INT NOT NULL,
FOREIGN KEY (hero_id)  REFERENCES heroes (id) ON DELETE CASCADE,
FOREIGN KEY (power_id)  REFERENCES powers (id) ON DELETE CASCADE
);
select * FROM heroes_powers
LIMIT 13;

CREATE TABLE IF NOT EXISTS races(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
); 

CREATE TABLE IF NOT EXISTS heroes_teams(
hero_id INT NOT NULL,
team_id INT NOT NULL,
FOREIGN KEY (hero_id)  REFERENCES heroes (id) ON DELETE CASCADE,
FOREIGN KEY (team_id)  REFERENCES teams (id) ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=0;-- 
ALTER TABLE heroes
  ADD COLUMN race_id INT DEFAULT(1),
  ADD FOREIGN KEY (race_id)  REFERENCES races (id) ON DELETE CASCADE;
  
  UPDATE heroes
SET race_id = 2
WHERE id = 5 OR id = 7;

	UPDATE heroes
SET race_id = 3
WHERE id = 1;

UPDATE heroes
SET race_id = 3
WHERE id = 4 OR id = 8 OR id = 3;