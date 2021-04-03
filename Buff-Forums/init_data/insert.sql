INSERT INTO subforums VALUES ('sports','Sports', '/b/sports');
INSERT INTO subforums VALUES ('food','Food', '/b/food');
INSERT INTO subforums VALUES ('homeworkhelp','Homework Help', '/b/homeworkhelp');
INSERT INTO logins VALUES ('a', 'a');

INSERT INTO posts VALUES ('c6c0a426','Test Post #1 - Sports','sports','sports','SuperBuffFan','This is test post #1 for sports',1,NULL,'/b/sports/c6c0a426');
INSERT INTO posts VALUES ('e3a24d31','Test Post #2 - Sports','sports','sports','SuperBuffFan','This is test post #2 for sports',1,NULL,'/b/sports/e3a24d31');
INSERT INTO posts VALUES ('2013ef2f','Test Post #3 - Sports','sports','sports','BasketballGuy101','This is test post #3 for sports',1,NULL,'/b/sports/2013ef2f');

INSERT INTO posts VALUES ('2aee3549','Test Post #1 - Food','food','food','pizzaMan','This is test post #1 for food',1,NULL,'/b/food/2aee3549');
INSERT INTO posts VALUES ('01337f8d','Test Post #2 - Food','food','food','yelpMaster','This is test post #2 for food',1,NULL,'/b/food/01337f8d');
INSERT INTO posts VALUES ('d756fa5c','Test Post #3 - Food','food','food','BasketballGuy101','This is test post #3 for food',1,NULL,'/b/food/d756fa5c');



/*
Post Table format for reference.
CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER NOT NULL PRIMARY KEY DEFAULT 1,
  post_title VARCHAR(20) NOT NULL DEFAULT 'default-title',
  subforum_name VARCHAR(20) NOT NULL DEFAULT 'Default Subforum',
  subforum_id VARCHAR(20) NOT NULL DEFAULT 'default-subforum',
  post_creator_name VARCHAR(30) NOT NULL DEFAULT 'default-username',
  post_text_content VARCHAR(40000) NOT NULL DEFAULT 'default-post-text',
  vote_amount SMALLINT NOT NULL DEFAULT 1,
  comments JSONB,
  post_link VARCHAR(20) NOT NULL DEFAULT 'default-link'
);

*/