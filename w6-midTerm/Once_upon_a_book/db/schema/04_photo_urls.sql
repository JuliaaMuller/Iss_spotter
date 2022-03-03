DROP TABLE IF EXISTS photo_urls CASCADE;

CREATE TABLE photo_urls (
  id SERIAL PRIMARY KEY NOT NULL,
  photo_url VARCHAR(255),
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);