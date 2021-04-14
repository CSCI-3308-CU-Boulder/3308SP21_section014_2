INSERT INTO subforums VALUES ('Sports');
INSERT INTO subforums VALUES ('Food');
INSERT INTO subforums VALUES ('Homework Help');

INSERT INTO logins VALUES ('a', 'a');
INSERT INTO logins VALUES ('SuperBuffFan', 'a');
INSERT INTO logins VALUES ('BasketballGuy101', 'a');
INSERT INTO logins VALUES ('pizzaMan', 'a');
INSERT INTO logins VALUES ('yelpMaster', 'a');

INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a693e5','Buffs vs Georgetown match','Sports','SuperBuffFan','Wow, did you guys watch this match! I loved every second of it. What do you guys think?', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'CU Intramural sports','Sports','SuperBuffFan','I am considering joining an intramural sport, should I?', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Denver Nuggets this year','Sports','BasketballGuy101','They are doing pretty well and Jokic is out of control this season!! Hes hitting 61% of his two point shots.', 1);

INSERT INTO posts VALUES (gen_random_uuid(),'Should I branch out to different foods...','Food','pizzaMan','', 1);
INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a69300','Whats the best restaurant you all know in Boulder?','Food','yelpMaster','I like Boychick at Avanti. Their shwarma is amazing!', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'This microwave recipe is delicious and easy to make in your dorm','Food','SuperBuffFan','Chef Boyardee for 1 minute 25 seconds.', 1);
                          
INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a693bb','[PHYS1120] Faradays Law','Homework Help','SuperBuffFan','Can anyone help explain this to me... Im really confused ', 1);


INSERT INTO comments (author, post, content, id) VALUES ('pizzaMan', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Yeah I thought it was great! I ordered a lot of dominos beforehand...', 'd2f2924b-2d13-4850-b239-42b665a693e6');
INSERT INTO comments (author, post, content, parent, id) VALUES ('yelpMaster', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Really... dominos? That place has awful food and worse service. 1/5', 'd2f2924b-2d13-4850-b239-42b665a693e6', 'd2f2924b-2d13-4850-b239-42b665a693e7');
INSERT INTO comments (author, post, content, id) VALUES ('BasketballGuy101', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Yes, so glad we won that match. My friend at Georgetown was talking their team up so much.', 'd2f2924b-2d13-4850-b239-42b665a693e8');

INSERT INTO comments (author, post, content, id) VALUES ('pizzaMan', 'd2f2924b-2d13-4850-b239-42b665a69300', 'I think cosmos is the best food in boulder, cant go wrong with it.', 'd2f2924b-2d13-4850-b239-42b665a69301');
INSERT INTO comments (author, post, content, parent, id) VALUES ('yelpMaster', 'd2f2924b-2d13-4850-b239-42b665a69300', 'Are you kidding? This is ridiculous. How can you say a pizza place, let alone Cosmos is the best food in Boulder... Its a 1/5 being generous.', 'd2f2924b-2d13-4850-b239-42b665a69301', 'd2f2924b-2d13-4850-b239-42b665a69302');
INSERT INTO comments (author, post, content, id) VALUES ('SuperBuffFan', 'd2f2924b-2d13-4850-b239-42b665a69300', 'I like a lot of restaurants in boulder but the CU cafeteria is truly the best food you can find. No joke, its amazing.', 'd2f2924b-2d13-4850-b239-42b665a69303');

INSERT INTO comments (author, post, content, id) VALUES ('BasketballGuy101', 'd2f2924b-2d13-4850-b239-42b665a693bb', 'It is confusing to me as well, but using Lenzs law to determine the direction helped me a lot.', 'd2f2924b-2d13-4850-b239-42b665a693b0');
