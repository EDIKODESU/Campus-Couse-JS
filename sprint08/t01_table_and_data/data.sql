USE ucode_web;

INSERT heroes(name, description, class_role) 
VALUES
('Spider-man', 'spide but man', 'healer'),
('Hulk', 'greeeen and strong', 'dps'),
('Capitan-Ukraine', 'Machoo-man', 'tankman'),
('Ant-man', 'small', 'healer'),
('Batmen', 'I am BATMEN', 'tankman'),
('Joker', 'HA-HA-HA', 'dps'),
('Naruto', 'SAAAAaaaske', 'tankman'),
('Sasuke', 'NaruuuuuToo', 'dps'),
('Kozak', 'destroy russian ORKS', 'dps'),
('Iron-man', 'playboy, genius, philanthropist', 'dps'),
('Dr Stringe', 'Magic', 'healer'),
('Anton', 'Silniy maloy', 'healer'),
('Venom', 'Black in our', 'dps');

select * FROM heroes