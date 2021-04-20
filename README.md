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

* If encountering issues with database initialization, remove conflicting volumes tied to other docker containers
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
