CREATE SCHEMA IF NOT EXISTS jungleBlog;

SET search_path TO jungleBlog, public;

CREATE TABLE IF NOT EXISTS jungleBlog.stories (
  story_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jungleBlog.comments (
  comment_id SERIAL PRIMARY KEY,
  story_id INTEGER REFERENCES jungleBlog.stories(story_id),
  username VARCHAR(50) NOT NULL,
  comment_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);