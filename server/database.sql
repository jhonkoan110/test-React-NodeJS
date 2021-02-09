create TABLE specialisation(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE master(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    middleName VARCHAR(255),
    specialisation_id INTEGER,
    FOREIGN KEY (specialisation_id) REFERENCES specialisation (id)
);