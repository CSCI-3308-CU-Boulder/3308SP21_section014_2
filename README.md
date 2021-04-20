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

### Viewing Program
* Download and Install Docker for your machine (https://docs.docker.com/get-docker/)
* Start the Docker application
* Download Buff-Forums using the git repository
  * $ git clone https://github.com/CSCI-3308-CU-Boulder/3308SP21_section014_2.git

* To start application from CLI
  * $ cd CSCI3308.../Buff Forums
  * $ docker-compose up

* To view  application, in web browser navigate to 
  * localhost:3000

* To stop the application from the CLI
  * $ docker-compose down

### Repository Organization
* Buff Forums (code)
  * init_data
    * create.sql (database created
    * insert.sql (initial posts and comments added to database)
  * resources
    * images
    * js
  * views
    * pages
    * comments.ejs
    * createPost.ejs
    * homePage.ejs (displays homepage
    * loginPage.ejs (displays login page)
    * postDetailed.ejs (displays a post and its comments)
    * registerPage.ejs (displays registration page)
    * subforumPage.ejs (displays subforum page)
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
