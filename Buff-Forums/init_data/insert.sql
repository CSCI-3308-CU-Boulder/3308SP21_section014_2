INSERT INTO subforums VALUES ('Sports');
INSERT INTO subforums VALUES ('Food');
INSERT INTO subforums VALUES ('Homework Help');

INSERT INTO logins VALUES ('a', 'a');
INSERT INTO logins VALUES ('SuperBuffFan', 'a');
INSERT INTO logins VALUES ('BasketballGuy101', 'a');
INSERT INTO logins VALUES ('pizzaMan', 'a');
INSERT INTO logins VALUES ('yelpMaster', 'a');

INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a693e5','Test Post #1 - Sports','Sports','SuperBuffFan','This is test post #1 for sports', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Test Post #2 - Sports','Sports','SuperBuffFan','This is longer titled test post #2 for sports', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Test Post #3 - Sports','Sports','BasketballGuy101','This is test post #3 for sports', 1);

INSERT INTO posts VALUES (gen_random_uuid(),'Test Post #1 - Food','Food','pizzaMan','This is test post #1 for food', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Test Post #2 - Food','Food','yelpMaster','This is test post #2 for food', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Test Post #3 - Food','Food','BasketballGuy101','This is test post #3 for food', 1);

INSERT INTO comments (author, post, content, id) VALUES ('pizzaMan', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'This comment is about pizza on this post about sports!', 'd2f2924b-2d13-4850-b239-42b665a693e6');
INSERT INTO comments (author, post, content, parent, id) VALUES ('yelpMaster', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'This comment is about yelp and pizza on this post about sports!', 'd2f2924b-2d13-4850-b239-42b665a693e6', 'd2f2924b-2d13-4850-b239-42b665a693e7');
INSERT INTO comments (author, post, content, id) VALUES ('SuperBuffFan', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'This comment is about buffs on this post about sports!', 'd2f2924b-2d13-4850-b239-42b665a693e8');