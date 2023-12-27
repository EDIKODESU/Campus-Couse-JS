USE ucode_web;

INSERT powers(name, type)
VALUES
('bloody fist', 'attack'),
('iron shield', 'defence'),
('DDOS', 'attack'),
('Emmmm', 'attack'),
('closky', 'defence'),
('KUMSHOT', 'attack');

INSERT heroes_powers(hero_id, power_id, power_points)
VALUES
(3, 2, 200),
(10, 4, 560),
(1, 4, 560),
(5, 1, 110),
(4, 5, 110),
(8, 2, 110),
(5, 2, 110),
(1, 2, 110),
(11, 2, 203),
(13, 1, 100);

INSERT races(name)
VALUES
('Human'),
('Kree'),
('ORK'),
('Vennn'),
('Kub');

INSERT teams(name)
VALUES
('Avengers'),
('Hydra'),
('Antonteams'),
('SeriousGuys'),
('Kub');

INSERT heroes_teams(hero_id, team_id)
VALUES
(1, 5),
(5,4),
(5,1),
(11,3),
(5,3),
(13,2),
(13,1);

