/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'buff_forums_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

/*Add your get/post request handlers below here: */

app.get('/',function(req,res) {
	res.redirect('/login');
});

app.get('/register',function(req,res) {
	res.render('pages/registerPage');
});

app.post('/register/create',function(req,res) {
	const newUsername=req.body.newUsername;
	const newPassword=req.body.newPassword;
	const query=`INSERT INTO logins(username, pwd) VALUES('${newUsername}','${newPassword}');`;
	db.any(query)
	.then(function(info) {
		console.log('Successful Registration');
		res.send({registrationWorked:true});
	})
	.catch(function(err) {
		console.log(`Registration Error:\n ${err}`);
		res.send({registrationWorked:false});
	});
});

app.get('/login',function(req,res) {
	res.render('pages/loginPage');
});

app.post('/login/submit',function(req,res) {
	const userNameInput=req.body.userNameInput;
	const passwordInput=req.body.passwordInput;
	const query=`select exists(select * from logins where username='${userNameInput}' and pwd='${passwordInput}');`;
	db.any(query)
	.then(function(info) {
		//query worked - check if username matches password		
		const validLogin=info[0].exists;
		if(validLogin) {
			console.log("Valid Login");
			res.send({validLogin:true});

			// Creates a cookie from a function in the ../../resources/js/cookies.js file
			setCookie('username', userNameInput, 1);
		}
		else {
			console.log("Invalid Login");
			res.send({validLogin:false});
		}
	})
	.catch(function(err) {
		console.log(`Login Error:\n ${err}`);
	});
});

app.post('/createPost/create',function(req,res) { 
	const id=req.body.id; 
	const title=req.body.title; 
	const username=req.body.username; 
	const creatorname=req.body.creatorname; 
	const vote_amount=req.body.vote_amount; 
	const comments=req.body.comments; 
	const link=req.body.link; 
	const query=`INSERT INTO posts(post_id, post_title, subreddit_name, vote_amount, comments, post_link) VALUES('${id}','${title}','${username}','${creatorname}','${vote_amount}','${comments}','${link}');`; 
	db.any(query)
	.then(function(info) {
		console.log('Post Creation Successful');
		res.send({createWorked:true});
	})
	.catch(function(err) {
		console.log(`Post Creation Error:\n ${err}`);
		res.send({createWorked:false});
	});
});

app.get('/b/:subForumId?',function(req,res) {
	const subForumId=req.params.subForumId;
	const query_1=`select * from posts where subforum_id='${subForumId}';`;
	const query_2=`select * from subforums where subforum_id='${subForumId}'`;
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
			task.any(query_2)
		]);
	})
	.then(function(data) {
		console.log()
		res.render('pages/subforumPage', {
			posts:data[0],
			subForumName:data[1][0].subforum_name,
			subForumId:data[1][0].subforum_id
		});
	})
	.catch(function(err) {
		console.log(`Query Error ${err}`);
		res.render('pages/subforumPage', {
			posts:[],
			subForumName:'Subforum Does Not Exist',
			subForumId:subForumId
		});
	});
});

// View Homepage from homePage.ejs
app.get('/home', function(req, res) {
	const query_1='select * from posts;'; // gets every post
	const query_2='select * from subforums;'; // gets every subforum
	
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
			task.any(query_2)
		]);
	})
	.then(function(data) {
		//console.log(data[0])
		//console.log(data[1])
		res.render('pages/homePage', {
			posts:data[0], 		// posts
			subForums:data[1]	// subforums
		});
	})
	.catch(function(err) {
		console.log(`Query Error ${err}`);
		res.render('pages/homePage', {
			subForums:[''],
			posts:[]
		});
	});
});

// View a specific post with id 'postID' from postDetailed.ejs
app.get('/postview/:postID?', function(req, res) {
	var postID = req.query.postID;	// gets postID from URL
	var query_1 = `select * from posts where post_id='${postID}'`; // gets post
	var query_2 = `select * from comments where Post='${postID}'`; // gets comments on post

	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
			task.any(query_2)
		]);
	})
	.then(function(data) {
		//console.log(data[0])
		//console.log(data[1])
		res.render('pages/postDetailed.ejs', {
			post:data[0], //post
			comments:data[1] //comments
		});
	})
	.catch(function(err) {
		console.log(`Post or comments do not exist ${err}`);
		res.render('pages/postDetailed.ejs', {
			post:[''],
			comments:['']
		});
	});
});


// Comment on post from form in postDetailed.ejs using hidden input fields for author and postid
app.post('/postview/comment', function(req, res){
	var post = req.params.comment_on_post_id;
	var author = req.params.comment_on_post_author;
	var comment = req.params.comment_on_post_comment;
	
	var insert_statement = `INSERT INTO comments(Author, Post, Content)
							VALUES (${author}, ${post}, ${comment});`;
	var getPost = `select * from posts where post_id='${postID}'`;
	var getComments = `SELECT * FROM comments where Post='${postID}';`;

	db.task('get-everything', task=> {
		return task.batch([
			db.any(insert_statement), // inserts new comment to database
			db.any(getPost), // gets post again
			db.any(getComments) // gets updated comments
		]);
	})
	.then(info=> {
		res.render('pages/postDetailed.ejs', {
			post:data[1], //post
			comments:data[2] //comments
		});
	})
	.catch(err=>{
		res.render('pages/postDetailed.ejs', {
			post:data[1], //post
			comments:data[2] //comments
		});
	})
});

// Reply to comment from postDetailed.ejs(not functional)
app.post('/postview/reply', function(req, res){
	var post = req.query.postID;
	var author = req.query.username;
	var comment = req.body.comment;
	var parent = req.query.parent;
	
	var insert_statement = `INSERT INTO comments(Author, Post, Content, Parent)
							VALUES (${author}, ${post}, ${comment}, ${parent});`;
	
});




app.get('/createPost', function(req, res) {
	var query = '';
	db.any(query)
        .then(function (rows) {
            res.render('pages/createPost.ejs',{
				data: rows,
				color: '',
				color_msg: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/createPost.ejs', {
                data: '',
                color: '',
                color_msg: ''
            })
        })
});

app.get('/register', function(req, res) {
	var query = '';
	db.any(query)
        .then(function (rows) {
            res.render('pages/registerPage.ejs',{
				data: rows,
				color: '',
				color_msg: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/createPost.ejs', {
                data: '',
                color: '',
                color_msg: ''
            })
        })
});

app.listen(3000);
console.log('3000 is the magic port');
