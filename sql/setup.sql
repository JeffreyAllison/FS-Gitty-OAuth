-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT, 
  avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT, 
  posts VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES github_users(id)
)
