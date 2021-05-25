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
create database portofolio;
-- Datenbank verwenden (standard-verfahren)
use portofolio;
-- Tabelle "posts" erstellen (index wird für dateiname verwendet)
create table posts (id numeric not null AUTO_INCREMENT, firstName varchar(30) not null, lastName varchar(30) not null, email varchar(100) not null, created timestamp not null, descr varchar(1000) not null, primary key (id));
-- Abfrageindex für id erstellen
create unique index posts_id on posts(id);
-- Abfrageindex für firstName erstellen
create index posts_firsName on posts(firstName);
-- Abfrageindex für lastName erstellen
create index posts_lastName on posts(lastName);

-- Erste Einträge erstellen
insert into posts (id, firstName, lastName, email, created, descr) values (1, "Mathieu", "Lichtsteiner", "mathieu.lichtsteiner@stud.hslu.ch", timestamp('2021-05-23 15:00:20'), "Das ist mein erstes Experiment!");