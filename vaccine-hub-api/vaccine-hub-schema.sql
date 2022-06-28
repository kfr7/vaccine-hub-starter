CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),    -- needs to be single quotes, not single tick marks or double quotes
    location    TEXT NOT NULL, --STRING separated by commas i.e. "City, State, Country" // this will be manipulated with backend API
    date        DATE NOT NULL
);