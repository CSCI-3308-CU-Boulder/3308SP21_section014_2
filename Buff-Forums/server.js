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

// Cookies from express, used to know who is logged in
var cookieParser = require('cookie-parser');
app.use(cookieParser());


/*get/post request handlers: */

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
			res.cookie('username', userNameInput).send({validLogin:true}); // Sets username cookie using express
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
	// Gets username from cookies and title/content from the form. The UUID is automatically created when inserted into the database
	let title=req.body.post_title; 
	const username=req.cookies.username;
	const vote_amount=1;
	let content=req.body.post_details;
	const subforum = req.body.select_subforum; // Assumes subforum exists
	//allows for form input with an apostrophe
	content=content.replace(/'/g,"''");
	title=title.replace(/'/g,"''");
	// Does not insert into a subforum
	const query=`INSERT INTO posts(post_title, subforum_name, post_creator_name, post_text_content, vote_amount) VALUES('${title}', '${subforum}', '${username}','${content}','${vote_amount}');`; 
	db.any(query)
	.then(function(info) {
		console.log('Post Creation Successful');
		res.redirect('/home');
		// res.send({createWorked:true});
	})
	.catch(function(err) {
		console.log(`Post Creation Error:\n ${err}`);
		res.send({createWorked:false});
	});
});

app.get('/b/:subForum',function(req,res) {
	
	const subForum=req.params.subForum;
	const query_1=`select * from posts where subforum_name='${subForum}' ORDER BY vote_amount DESC;`;
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
		]);
	})
	.then(function(data) {
		console.log()
		res.render('pages/subforumPage', {
			posts:data[0],
			subForum: subForum
		});
	})
	.catch(function(err) {
		console.log(`Query Error ${err}`);
		res.render('pages/subforumPage', {
			posts:[''],
			subForum:''
		});
	});
});

// View Homepage from homePage.ejs
app.get('/home', function(req, res) {
	const query_1='select * from posts ORDER BY vote_amount DESC;'; // gets every post
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


// Vote on a post on any page homepage or subforum
app.post('/home/postVote',function(req,res) {
	const postId=req.body.postId;
	const voteChange=req.body.voteAmount;
	const voteQuery=`UPDATE posts SET vote_amount=vote_amount + ${voteChange} WHERE post_id='${postId}';`;
	db.any(voteQuery)
	.then(function(info) {
		console.log('Post Vote Value Changed');
	})
	.catch(function(err) {
		console.log(`Failed to Change Post Vote Value:\n ${err}`);
	})
	.then(info=> {
		res.redirect('back'); // Redirects to the post page, showing the newly added comment
	})
	.catch(err=>{
		res.redirect('back');
	});
})


// View a specific post with id 'postID' from postDetailed.ejs
app.get('/postview/:postID', function(req, res) {
	var postID = req.params.postID;	// gets postID from URL
	var query_1 = `select * from posts where post_id='${postID}'`; // gets post
	var query_2 = `select * from comments where post='${postID}' ORDER BY parent desc, vote_amount desc`; // gets comments on post
	
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
			task.any(query_2)
		]);
	})
	.then(function(data) {
		//console.log(data[0][0])
		//console.log(data[1])
		res.render('pages/postDetailed.ejs', {
			post:data[0][0], //post
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

app.post('/postview/vote',function(req,res) {
	const voteAmount=req.body.voteAmount;
	const commentId=req.body.commentId;
	const query=`UPDATE comments SET vote_amount=vote_amount + ${voteAmount} WHERE id='${commentId}';`;
	db.any(query)
	.then(function(info) {
		console.log('Vote Value Changed');
	})
	.catch(function(err) {
		console.log(`Failed to Change Vote Value:\n ${err}`);
	});
});

// Comment on post from form in postDetailed.ejs using hidden input fields for author and postid
app.post('/postview/comment', function(req, res){
	var postID = req.query.id;
	var author = req.body.comment_on_post_author;
	var comment = req.body.comment_on_post_comment;
	//allows for form input with an apostrophe
	comment=comment.replace(/'/g,"''");
	var insert_statement = `INSERT INTO comments(author, post, content)
							VALUES ('${author}', '${postID}', '${comment}');`;


	db.task('get-everything', task=> {
		return task.batch([
			db.any(insert_statement), // inserts new comment to database
		]);
	})
	.then(info=> {
		res.redirect('back'); // Redirects to the post page, showing the newly added comment
	})
	.catch(err=>{
		res.redirect('back');
	})
});

// Reply to comment from postDetailed.ejs(not functional)
app.post('/postview/reply', function(req, res){
	var postID = req.query.id;
	var parent = req.query.comment;
	var author = req.body.reply_author;
	var comment = req.body.reply_comment;
	//allows for form input with an apostrophe
	comment=comment.replace(/'/g,"''");
	var insert_statement = `INSERT INTO comments(author, post, content, parent)
							VALUES ('${author}', '${postID}', '${comment}', '${parent}');`;

	db.task('get-everything', task=> {
		return task.batch([
			db.any(insert_statement), // inserts new comment to database
		]);
	})
	.then(info=> {
		res.redirect('back'); // Redirects to the post page, showing the newly added comment
	})
	.catch(err=>{
		res.redirect('back');
	})
});

// Populates dropdown menu of subforums
app.get('/createPost', function(req, res) {
	const query='select * from subforums;'

	db.any(query)
        .then(function (rows) {
            res.render('pages/createPost.ejs',{
				subforums: rows
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/createPost.ejs', {
                subforums: ['']
            })
        })
});


app.get('/register', function(req, res) {
	var query = '';
	db.any(query)
        .then(function (rows) {
            res.render('pages/registerPage.ejs',{
				data: rows
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/registerPage.ejs', {
                data: ''
            })
        })
});

app.listen(3000);
console.log('3000 is the magic port');
