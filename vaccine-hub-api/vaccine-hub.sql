\echo 'Delete and recreate the vaccine_hub database?'
\prompt 'Return for yes or Control-C to cancel > ' answer

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

\i vaccine-hub-schema.sql
