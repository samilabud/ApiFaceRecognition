const enviroments = {
    development:{
        host : 'localhost',
        user : 'postgres',
        password : '123456',
        database : 'facerecognitiondb',
        apiclarifai:'ea06bdd29d8043b48f5d12d80b177a0f'
    },
    production:{
        active: false
    }
}

module.exports = {
    enviroments : enviroments
}

/*
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
)

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);

INSERT INTO public.users(name, email, entries, joined)
	VALUES ('Samil', 'samilabud@gmail.com', 0, '2022-08-23 18:42:02');
*/