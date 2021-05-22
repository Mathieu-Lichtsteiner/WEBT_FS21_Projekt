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
create table posts (id numeric, email varchar(80), created timestamp, descr varchar(1000));
-- Abfrageindex für id erstellen
create unique index posts_id on posts(id);

-- Erste Einträge erstellen
insert into posts (id, email, created, descr) values (1, "mathieu.lichtsteiner@stud.hslu.ch", timestamp(), "Das ist mein erstes lustiges Experiment!");