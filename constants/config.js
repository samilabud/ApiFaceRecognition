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
//     psql postgres://facerecognition:fLUItFyk7aAbXAZ2HVjR3tQCTOOX3tdp@dpg-cobcil7109ks738h6dbg-a.oregon-postgres.render.com/facerecognitiondb_unl7
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


Go to https://railway.app/project/c196071c-c825-45c9-87f9-05a3083ab10c/service/722194bd-aa9a-4fba-9b85-f463ef2282be/variables and change variables
*/
