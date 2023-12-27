USE ucode_web;

SELECT heroes.name, teams.name AS 'team'
FROM heroes 
LEFT JOIN heroes_teams ON (heroes.id = heroes_teams.hero_id)
LEFT JOIN teams ON (heroes_teams.team_id = teams.id)
ORDER BY heroes.name; 

SELECT heroes.name, powers.name AS 'power'
FROM heroes 
LEFT JOIN heroes_powers ON (heroes.id = heroes_powers.power_id)
LEFT JOIN powers ON (heroes_powers.power_id = powers.id)
UNION ALL 
SELECT heroes.name, powers.name
FROM heroes 
RIGHT JOIN heroes_powers ON (heroes.id = heroes_powers.power_id)  
RIGHT JOIN powers ON (heroes_powers.power_id = powers.id); 

SELECT heroes.name, teams.name AS 'team', powers.name AS 'power'
FROM heroes 
JOIN heroes_teams ON (heroes.id = heroes_teams.hero_id)
JOIN teams ON (heroes_teams.team_id = teams.id)
JOIN heroes_powers ON (heroes.id = heroes_powers.hero_id)
JOIN powers ON (heroes_powers.power_id = powers.id)
ORDER BY heroes.name; 