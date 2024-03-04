CREATE TYPE HABITTYPE AS ENUM ('checkbox', 'counter');

CREATE TABLE category (
  category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(47)
);

CREATE TABLE habit (
  habit_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  habit_type HABITTYPE NOT NULL,
  title VARCHAR(47) NOT NULL,
  text VARCHAR(127),
  category_id INT REFERENCES category(category_id) NOT NULL
);

CREATE TABLE checkbox_details (
  habit_id INT REFERENCES habit(habit_id) PRIMARY KEY,
  curr_value BOOLEAN NOT NULL,
  goal_value BOOLEAN NOT NULL
);

CREATE TABLE counter_details (
  habit_id INT REFERENCES habit(habit_id) PRIMARY KEY,
  curr_value INT NOT NULL,
  goal_value INT NOT NULL
);

INSERT INTO category(title) VALUES (NULL);

INSERT INTO habit (habit_type, title, text, category_id) VALUES
  ('checkbox', 'Wake up', 'grab a brush and put a little makeup', 1);
--  ('counter', 'Leetcode', NULL, 1);

INSERT INTO checkbox_details (habit_id, curr_value, goal_value) VALUES
  (1, FALSE, TRUE);

--INSERT INTO counter_details (habit_id, curr_value, goal_value) VALUES
--  (2, 0, 1);
