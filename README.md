# Buff Forums

### Team Members
Ryan Stone,
Dylan Kriegman,
Florian Frick,
Noah Warren,
Marcus Chong,
Caleb Jimenez

### Application Description
A web application like reddit where users can create and interact with text posts.
Users register and login to the site before they reach the homepage, which is populated with posts stored in the database.
If the user does not account they will be able to create an account through the registration page.
Sub forums can be navigated to from the homepage to narrow the type of posts seen.
These will be located on the provided sidebar in the homepage.

In the detailed view of a post, comments can be created, using cookies created on login to determine the author of a comment.
Similarly, when creating a post, the author, text content, title, and sub-forum selection are used to add the post to the database.
Users will also be able to upvote or downvote posts.
The posts will subsequently reorder in descending order based on the amount of upvotes.
Users will also be able to upvote and downvote other user comments as well.

Ultimately, it is valuable for students to interact with one another to share and communicate easily.
For this reason, the goal of our application is to connect CU students in an easy to use manner on a platform which allows them to express their ideas and thoughts within the CU community.

### Running and Viewing Buff-Forums as a Docker Container in Browser
The Docker environment deploys the application by using NodeJS in the background to run the application and it is served over HTTP using Express on port 3000 of the host machine and can be viewed in the client’s browser at http://localhost:3000.

A client can run Buff Forums in their browser by following these steps using their machine’s graphical user interface and a linux command line interface (CLI):

* Download and Install Docker for your machine (https://docs.docker.com/get-docker/)

* Start the Docker application

* Download Buff-Forums using the git repository
  * $ git clone https://github.com/CSCI-3308-CU-Boulder/3308SP21_section014_2.git

* To start application from CLI
  * $ cd 3308SP21_section014_2/Buff Forums
  * $ docker-compose up

* To view application in browser, navigate to 
  * http://localhost:3000

* To stop the application from the CLI
  * $ docker-compose down

* If encountering issues with database initialization, remove conflicting volumes tied to the docker container
  * $ docker volume list
  * $ docker volume rm buff-forums_buff_forums_volume



### Repository Organization
* Buff Forums (code)
  * init_data
    * create.sql (database created
    * insert.sql (initial posts and comments added to database)
  * resources
    * images
      * culogo.png
      * ...
    * js
      * cookies.js
      * ...
  * views
    * pages
      * comments.ejs
      * createPost.ejs
      * homePage.ejs (displays homepage
      * loginPage.ejs (displays login page)
      * postDetailed.ejs (displays a post and its comments)
      * registerPage.ejs (displays registration page)
      * subforumPage.ejs (displays subforum page)
      * ...
    * partials
      * setup.ejs
  * docker-compose.yml
  * package-lock.json
  * package.json
  * server.js (route handlers)
* meeting-logs
* milestone-submissions
* Architecture Diagram.JPG
* README.md

### Architecture Plan
The website’s frontend is created using HTML, CSS, javascript, and EJS templating to display posts, comments, and show navigation options.
This user interface communicates with the backend by following HTTP protocol using Node.js route handlers.
The backend will use a PostgreSQL database to store user accounts, posts, and comments. The database is relational, with foreign keys ensuring ACID properties are followed.

### Architecture Diagram
![Architecture Diagram](https://github.com/CSCI-3308-CU-Boulder/3308SP21_section014_2/blob/1fca83d33efaa0da43fa08665fe7485d671f0e98/Architecture%20Diagram.JPG)

### Testing
* Feature 1: Registering and logging in
  * Users should be able to create accounts and login in from the registration and login pages.
  * UAT: A user will go to the specified URL for the website which will redirect to a login page. They should select the “I don’t have an account yet” link to get to the registration page. They should be able to input a valid username and password to generate their account. If the information they enter is valid, then they will be redirected to the home page.   Once logged in, if a user presses the sign out button in the navbar, then they will be logged out. Should they go to the login page again, a cookie will still hold their username, but they will need to re enter their password to log back in. Additionally on the registration page, passwords will be checked to see if they meet the listed minimum strength requirements and if they do not meet the requirements then an error message will be outputted to the user. Also if a confirmation password does not match the original, then an error will be outputted.

* Feature 2: Posting
  * Users should be able to create text posts from the post creation page and see them properly displayed on the homepage and specified subforum.
  * UAT: A logged in user should select the “make post” button in the navigation bar from any page, excluding registration/login. From the page they were redirected to, they should be able to input a title of their post, the post’s content, and specify a subforum to post to. If the text inputted for the post title or for a comment is empty or if it is over the character limits for titles and content. Then an error will be outputted and the post will not be submitted. If the post content passes these checks, then the user will be redirected to the new post page. The new post page will be visible for all users. Additionally the high-level view of the home or a subforum will contain a short description of the created post.

* Feature 3: Commenting
  * Users should be able to successfully comment on posts and see their comments displayed on posts.
  * UAT: A user can click on the comment button which will create a text area where they can create a comment. When they click on the submit button, the comment and their username will appear on the post. If they navigate back to that post or other users navigate to the post, the comment will remain there. Additionally if a user clicks on the upvote or downvote button next to a comment, the comment’s “score” will correspondingly go up or down. This score will be visible to other users as well. A user can also reply to any comment and assuming the reply is not empty, the reply will appear beneath the replied to comment and persist across any page refreshes 
