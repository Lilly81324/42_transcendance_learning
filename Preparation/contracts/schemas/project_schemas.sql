CREATE TABLE AIMING_TYPES (
	id INT PRIMARY KEY,
	name VARCHAR(50) DEFAULT 'confirm',
	pick_position BOOLEAN DEFAULT false,
	switch_direction BOOLEAN DEFAULT false,
	aim_angle BOOLEAN DEFAULT false);

INSERT INTO AIMING_TYPES () VALUES ();

INSERT INTO AIMING_TYPES (
name, aim_angle) VALUES (
'aim_angle', true);

INSERT INTO AIMING_TYPES (
name, pick_position, switch_direction) VALUES (
'pick_pos|switch_direction', true, true);

INSERT INTO AIMING_TYPES (
name, pick_position) VALUES (
'pick_pos', true);



CREATE TABLE EXPLOSION_TYPES (
	id INT PRIMARY KEY,
	size int NOT NULL,
	damage int NOT NULL,
	falloff int NOT NULL );

INSERT INTO EXPLOSION_TYPES (
id, size, damage, falloff) VALUES (
1, 1, 10, 0);

INSERT INTO EXPLOSION_TYPES (
size, damage, falloff) VALUES (
5, 30, 0);

INSERT INTO EXPLOSION_TYPES (
size, damage, falloff) VALUES (
9, 30, 0);

INSERT INTO EXPLOSION_TYPES (
size, damage, falloff) VALUES (
17, 50, 0);



CREATE TABLE GENERIC_WEAPON (
	id INT PRIMARY KEY,
	)


CREATE TABLE WEAPON_MELEE (
	id INT PRIMARY KEY,
	name VARCHAR(50),
	default_amount int DEFAULT 999,
	controls VARCHAR(50) DEFAULT 'confirm',
	FOREIGN KEY (controls) REFERENCES AIMING_TYPES(name),
	range int NOT NULL,
	damage int NOT NULL);

INSERT INTO WEAPON_MELEE (
name, range, damage) VALUES (
'Punch', 1, 20);

INSERT INTO WEAPON_MELEE (
name, control, default_amount, range, damage) VALUES (
'Baseball Bat', 'aim_angle', 1, 1, 30);


CREATE TABLE WEAPON_RANGED (
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	default_amount int DEFAULT 999,
	controls VARCHAR(50) DEFAULT 'confirm',
	FOREIGN KEY (controls) REFERENCES AIMING_TYPES(name),
	allowed_angle_min int DEFAULT 0,
	allowed_angle_max int DEFAULT 180,
	projectile_count int DEFAULT 1,
	speed int DEFAULT 10,
	mass int DEFAULT 1,
	spread FLOAT DEFAULT 0,
	damage int NOT NULL,
	explosion_size int,
	FOREIGN KEY (explosion_size) REFERENCES EXPLOSION_TYPES(size) );

INSERT INTO WEAPON_RANGED (
name, control, speed, spread, damage, explosion_size) VALUES(
'Bazooka', 'aim_angle', 15, 0.1, 5, 5);

INSERT INTO WEAPON_RANGED (
name, control, allowed_angle_max, speed, damage, explosion_size) VALUES (
'Mortar', 'aim_angle', 15, 30, 5, 5);

INSERT INTO WEAPON_RANGED (
name,control, projectile_count, spread, damage) VALUES (
'Handgun', 'aim_angle', 2, 0.2, 12);

INSERT INTO WEAPON_RANGED (
name, control, allowed_angle_min, allowed_angle_max, projectile_count, spread, damage, explosion_size) VALUES (
'Shotgun', 'aim_angle', 70, 110, 3, 0.3, 1, 1);

INSERT INTO WEAPON_RANGED (
name, control, projectile_count, speed, spread, damage) VALUES (
'Uzi', 'aim_angle', 5, 15, 0.4, 6);



CREATE TABLE WEAPON_THROWABLE (
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	default_amount int DEFAULT 999,
	controls VARCHAR(50) DEFAULT 'confirm',
	FOREIGN KEY (controls) REFERENCES AIMING_TYPES(name),
	allowed_angle_min int DEFAULT 0,
	allowed_angle_max int DEFAULT 180,
	speed int DEFAULT 10,
	spread int DEFAULT 0,
	damage int NOT NULL,
	timer int );

INSERT INTO WEAPON_THROWABLE (
name, control, allowed_angle_min, speed, damage, timer) VALUES (
'Grenade', 'aim_angle', 45, 5, 0, 3);

INSERT INTO WEAPON_THROWABLE (
name, default_amount, control, allowed_angle_min, speed, damage, timer) VALUES (
'Cluster grenade', 1, 'aim_angle', 45, 5, 0, 3);

INSERT INTO WEAPON_THROWABLE (
name, default_amount, control, allowed_angle_min, allowed_angle_max, speed, damage) VALUES (
'Anvil', 1, 'aim_angle', 35, 55, 4, 35);

INSERT INTO WEAPON_THROWABLE (
name, speed, damage, timer) VALUES (
'Dynamite', 0, 0, 5);



CREATE TABLE WEAPON_AIRDROP (
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	default_amount int DEFAULT 999,
	controls VARCHAR(50) DEFAULT 'confirm',
	FOREIGN KEY (controls) REFERENCES AIMING_TYPES(name),
	projectile_amount int DEFAULT 1,
	explosion_size int,
	FOREIGN KEY (explosion_size) REFERENCES EXPLOSION_TYPES(size) );

INSERT INTO WEAPON_AIRDROP (
name, control, projectile_amount, explosion_size) VALUES (
'Airstrike', 'pick_pos|switch_direction', 5, 1);

INSERT INTO WEAPON_AIRDROP (
name, default_amount, control, explosion_size) VALUES (
'Meteor', 1, 'pick_pos|switch_direction', 7);

INSERT INTO WEAPON_AIRDROP (
name, control, explosion_size) VALUES (
'Falling Piano', 'pick_pos', 1);

The specific weapon category holds generic weapon.
Effects (enum) 
Specific_Effect > Effects()

CREATE TABLE EFFECTS (
	id INT PRIMARY KEY,
	type enum('explosion', 'spawn_cluste', 'teleport')
)