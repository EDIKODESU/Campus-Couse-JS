USE ucode_web;

SELECT heroes.id,heroes.name,powers.type,sum(heroes_powers.power_points) AS 'point'
FROM heroes 
JOIN heroes_powers ON (heroes.id = heroes_powers.hero_id)
JOIN powers ON (heroes_powers.power_id = powers.id)
GROUP BY heroes.id
ORDER BY point DESC
LIMIT 1;

SELECT heroes.id, heroes.name,powers.type, sum(heroes_powers.power_points) AS 'point'
FROM heroes 
JOIN heroes_powers ON (heroes.id = heroes_powers.hero_id)
JOIN powers ON (heroes_powers.power_id = powers.id)
WHERE powers.type = 'defence'
GROUP BY heroes.id
ORDER BY point ASC
LIMIT 1;

SELECT heroes.id, heroes.name,powers.type, sum(DISTINCT heroes_powers.power_points) AS 'point'
FROM heroes 
JOIN heroes_powers ON (heroes.id = heroes_powers.hero_id)
JOIN powers ON (heroes_powers.power_id = powers.id)
GROUP BY heroes.id
ORDER BY point ASC;

SELECT teams.id,teams.name, heroes.name,powers.type, sum(heroes_powers.power_points) AS 'point'
FROM heroes 
JOIN heroes_powers ON (heroes.id = heroes_powers.hero_id)
JOIN powers ON (heroes_powers.power_id = powers.id)
JOIN heroes_teams ON (heroes.id = heroes_teams.hero_id)
JOIN teams ON (heroes_teams.team_id = teams.id)
GROUP BY teams.id
ORDER BY point ASC;