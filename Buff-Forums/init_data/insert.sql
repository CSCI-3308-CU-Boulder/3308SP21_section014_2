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
INSERT INTO posts VALUES (gen_random_uuid(),'Our football team is not good','Sports','SuperBuffFan','Every year our football team has been sooo underwhelming. Any suggestions as to how to improve our team? Because Im sure you know more then our current coaching staff', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Good luck to all the basketball seniors!','Sports','BasketballGuy101','This was one of the best years of buffs basketball and it was a pleasure to watch this great class of seniors. Good luck on whatever you guys decide to do next!', 1);

INSERT INTO posts VALUES (gen_random_uuid(),'Should I branch out to different foods...','Food','pizzaMan','', 1);
INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a69300','Whats the best restaurant you all know in Boulder?','Food','yelpMaster','I like Boychick at Avanti. Their shwarma is amazing!', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'This microwave recipe is delicious and easy to make in your dorm','Food','SuperBuffFan','Chef Boyardee for 1 minute 25 seconds.', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'We need new food for the dining halls','Food','pizzaMan','As a senior, I have realized that nobody likes to food on campus and they never get a dining pass after freshman year. CU PLEASE IMPROVE THE FOOD. ITS A WIN WIN FOR EVERYBODY', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Covid dining hall food is getting to me','Food','yelpMaster','Im a freshman and eating 8+ months of dining hall food has gotten to the point where I have to spend money on off campus food. But the thing is... Im broke so this is just not a great situation', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'What are the best off campus restaurants here?','Food','BasketballGuy101','Transfering here next year and was wondering what are the go-to places here?', 1);

INSERT INTO posts VALUES ('d2f2924b-2d13-4850-b239-42b665a693bb','[PHYS1120] Faradays Law','Homework Help','SuperBuffFan','Can anyone help explain this to me... Im really confused ', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Going into algorithms next year. Any advice?','Homework Help','yelpMaster','I heard this class was important. Any advice as to how to approach the class?', 1);
INSERT INTO posts VALUES (gen_random_uuid(),'Looking for Calc 2 study group','Homework Help','yelpMaster','Me and a friend are looking for others who are also taking calculus 2. If interested email me at yelpmaster@gmail.com. Thanks', 1);

INSERT INTO comments (author, post, content, id) VALUES ('pizzaMan', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Yeah I thought it was great! I ordered a lot of dominos beforehand...', 'd2f2924b-2d13-4850-b239-42b665a693e6');
INSERT INTO comments (author, post, content, parent, id) VALUES ('yelpMaster', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Really... dominos? That place has awful food and worse service. 1/5', 'd2f2924b-2d13-4850-b239-42b665a693e6', 'd2f2924b-2d13-4850-b239-42b665a693e7');
INSERT INTO comments (author, post, content, id) VALUES ('BasketballGuy101', 'd2f2924b-2d13-4850-b239-42b665a693e5', 'Yes, so glad we won that match. My friend at Georgetown was talking their team up so much.', 'd2f2924b-2d13-4850-b239-42b665a693e8');

INSERT INTO comments (author, post, content, id) VALUES ('pizzaMan', 'd2f2924b-2d13-4850-b239-42b665a69300', 'I think cosmos is the best food in boulder, cant go wrong with it.', 'd2f2924b-2d13-4850-b239-42b665a69301');
INSERT INTO comments (author, post, content, parent, id) VALUES ('yelpMaster', 'd2f2924b-2d13-4850-b239-42b665a69300', 'Are you kidding? This is ridiculous. How can you say a pizza place, let alone Cosmos is the best food in Boulder... Its a 1/5 being generous.', 'd2f2924b-2d13-4850-b239-42b665a69301', 'd2f2924b-2d13-4850-b239-42b665a69302');
INSERT INTO comments (author, post, content, id) VALUES ('SuperBuffFan', 'd2f2924b-2d13-4850-b239-42b665a69300', 'I like a lot of restaurants in boulder but the CU cafeteria is truly the best food you can find. No joke, its amazing.', 'd2f2924b-2d13-4850-b239-42b665a69303');

INSERT INTO comments (author, post, content, id) VALUES ('BasketballGuy101', 'd2f2924b-2d13-4850-b239-42b665a693bb', 'It is confusing to me as well, but using Lenzs law to determine the direction helped me a lot.', 'd2f2924b-2d13-4850-b239-42b665a693b0');
INSERT INTO comments (author, post, content, id) VALUES ('BasketballGuy101', 'd2f2924b-2d13-4850-b239-42b665a693bb', 'I would highly recommend going to Kevins office hours. He is absolutely amazing', 'd2f2924b-2d13-4850-b239-42b665a693b1');