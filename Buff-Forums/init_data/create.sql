DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE IF NOT EXISTS posts (
  post_id INTEGER NOT NULL PRIMARY KEY DEFAULT 1,
  post_title VARCHAR(20) NOT NULL DEFAULT 'default-title',
  subforum_name VARCHAR(20) NOT NULL DEFAULT 'Default Subforum',
  subforum_id VARCHAR(20) NOT NULL DEFAULT 'default-subforum',
  post_creator_name VARCHAR(30) NOT NULL DEFAULT 'default-username',
  vote_amount SMALLINT NOT NULL DEFAULT 1,
  post_link VARCHAR(20) NOT NULL DEFAULT 'default-link'
);

DROP TABLE IF EXISTS logins CASCADE;
CREATE TABLE IF NOT EXISTS logins (
  username VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'default-username',
  pwd VARCHAR(50) NOT NULL DEFAULT 'default-password'
);

DROP TABLE IF EXISTS subforums CASCADE;
CREATE TABLE IF NOT EXISTS subforums (
  subforum_id VARCHAR(50) NOT NULL PRIMARY KEY DEFAULT 'default-subforum',
  subforum_name VARCHAR(50) NOT NULL DEFAULT 'Default Subforum',
  subforum_url VARCHAR(200) NOT NULL DEFAULT '/default-subforum'
);


DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE IF NOT EXISTS comments (
   "Author" VARCHAR(50) NOT NULL DEFAULT 'default-author',
    "Post" uuid NOT NULL DEFAULT 'default-post-reference',
    "Content" character varying(5000) NOT NULL DEFAULT 'default-content',
    "Parent" uuid NOT NULL,
    "ID" uuid NOT NULL,
    PRIMARY KEY ("ID"),
    CONSTRAINT fk_author FOREIGN KEY ("Author")
        REFERENCES public."logins" ("username") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_parent FOREIGN KEY ("Parent")
        REFERENCES public."comments" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT pk_post FOREIGN KEY ("Post")
        REFERENCES public."posts" ("post_id") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);