const enviroments = {
  development: {
    host: "localhost",
    user: "samilabud",
    password: "",
    database: "facerecognitiondb",
    apiclarifai: "f8bb2816e8e54560b958cc2594670f95",
  },
};

module.exports = {
  enviroments: enviroments,
};

//Instal psql from homebrew (https://www.postgresql.org/download/macosx/), add to path, connect to url using psql command plus url for connection, e,g:
//     psql postgresql://facerecognition:MEMBfjdtJr8e7mt4HLcJxb17k65r38qr@dpg-cq262a3v2p9s73en9l60-a.oregon-postgres.render.com/facerecognitiondb_9tp4
//Cheat sheet: https://www.timescale.com/learn/postgres-cheat-sheet/databases

//Run this after connnection
/*
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);

INSERT INTO public.users(name, email, entries, joined)
	VALUES ('Samil', 'samilabud@gmail.com', 0, '2022-08-23 18:42:02');


Go to dashboard.render.com and change the environment variables
1- Create the database
2- Wait for the database to be created
3- Copy the the environment variables from the new database UI like
  DATABASE_DB => Database
  DATABASE_HOST => Hostname
  DATABASE_PW => Password
  DATABASE_USER => Username
  DATABASE_URL => External Database URL
*/
