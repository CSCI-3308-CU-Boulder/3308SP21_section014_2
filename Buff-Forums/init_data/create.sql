DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE IF NOT EXISTS posts (
  post_id VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT '1',
  post_title VARCHAR(100) NOT NULL DEFAULT 'default-title',
  subforum_name VARCHAR(20) NOT NULL DEFAULT 'Default Subforum',
  subforum_id VARCHAR(20) NOT NULL DEFAULT 'default-subforum', 
  post_creator_name VARCHAR(30) NOT NULL DEFAULT 'default-username',
  post_text_content VARCHAR(40000) NOT NULL DEFAULT 'default-post-text',
  vote_amount SMALLINT NOT NULL DEFAULT 1,
  comments JSONB,
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