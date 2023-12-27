USE ucode_web;

SELECT heroes.id, teams.name AS 'team', heroes.name ,races.name AS 'race', heroes.class_role
FROM heroes 
JOIN races ON (heroes.race_id = races.id)
JOIN heroes_teams ON (heroes.id = heroes_teams.hero_id)
JOIN teams ON (heroes_teams.team_id = teams.id)
WHERE (heroes.class_role = 'tankman' or heroes.class_role = 'healer') and (heroes.name LIKE '%a%') and races.name != 'Human' 
GROUP BY hero_id
HAVING COUNT(*) > 1
ORDER BY heroes.id
LIMIT 1;