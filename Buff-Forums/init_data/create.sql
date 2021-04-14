CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS subforums CASCADE;
CREATE TABLE IF NOT EXISTS subforums (
  subforum_name VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'Default Subforum'
);


DROP TABLE IF EXISTS logins CASCADE;
CREATE TABLE IF NOT EXISTS logins (
  username VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'default-username',
  pwd VARCHAR(50) NOT NULL DEFAULT 'default-password'
);


DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE IF NOT EXISTS posts (
  post_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  post_title VARCHAR(100) NOT NULL DEFAULT 'Default Title',
  subforum_name VARCHAR(50) NOT NULL DEFAULT 'Home',
  post_creator_name VARCHAR(30) NOT NULL DEFAULT 'User1',
  post_text_content VARCHAR(40000) NOT NULL DEFAULT 'Default text',
  vote_amount SMALLINT NOT NULL DEFAULT 1,
  CONSTRAINT fk_author FOREIGN KEY ("post_creator_name")
        REFERENCES public."logins" ("username") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
  CONSTRAINT fk_subforum FOREIGN KEY ("subforum_name")
        REFERENCES public."subforums" ("subforum_name") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE IF NOT EXISTS comments (
   "author" VARCHAR(50) NOT NULL DEFAULT 'default-author',
    "post" uuid NOT NULL,
    "content" character varying(5000) NOT NULL DEFAULT 'default-content',
    "parent" uuid,
    "id" uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "vote_amount" SMALLINT NOT NULL DEFAULT 1,
    CONSTRAINT fk_author FOREIGN KEY ("author")
        REFERENCES public."logins" ("username") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_parent FOREIGN KEY ("parent")
        REFERENCES public."comments" ("id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT pk_post FOREIGN KEY ("post")
        REFERENCES public."posts" ("post_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
