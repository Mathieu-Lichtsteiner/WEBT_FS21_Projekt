/* 
Ich brauche eine Tabelle für die Posts
Reihen:
	- index (key)
	- email-Adresse
	- url zum Bild (eventuell nicht nötig, da benennung mit dem Datum, oder besser mit dem Index)
	- Erstellungszeit (timestamp sollte ausreichend sein)
	- beschreibung
*/

-- Datenbank "portofolio" erstellen
CREATE DATABASE portofolio;
-- Datenbank verwenden (standard-verfahren)
USE portofolio;
-- Tabelle "posts" erstellen (index wird für dateiname verwendet) (Achtung um Auto_increment zu brauchen, muss der typ von id ein int sein, was ich mit trial & error gemerkt habe)
CREATE TABLE posts (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName varchar(30) NOT NULL, lastName varchar(30) NOT NULL, email varchar(100) NOT NULL, created timestamp NOT NULL, msg varchar(1000) NOT NULL);
-- Abfrageindex für id erstellen
CREATE UNIQUE INDEX posts_id ON posts(id);
-- Abfrageindex für firstName erstellen
CREATE INDEX posts_firsName ON posts(firstName);
-- Abfrageindex für lastName erstellen
CREATE INDEX posts_lastName ON posts(lastName);

-- Erste Einträge erstellen
INSERT INTO posts (firstName, lastName, email, created, msg) VALUES ("Mathieu", "Lichtsteiner", "mathieu.lichts@fakemail.com", timestamp('2021-05-23 15:00:20'), "Das ist mein erstes Kustwerk! WOW!");