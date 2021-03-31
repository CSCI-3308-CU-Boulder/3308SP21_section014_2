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
	res.render('pages/loginPage.ejs');
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


app.get('/home', function(req, res) {
	var query = '';
	db.any(query)
        .then(function (rows) {
            res.render('pages/homePage',{
				data: rows,
				color: '',
				color_msg: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/homePage', {
                data: '',
                color: '',
                color_msg: ''
            })
        })
});

app.get('/postview', function(req, res) {
	var query = '';
	db.any(query)
        .then(function (rows) {
            res.render('pages/postDetailed.ejs',{
				data: rows,
				color: '',
				color_msg: ''
			})

        })
        .catch(function (err) {
            console.log('error', err);
            res.render('pages/postDetailed.ejs', {
                data: '',
                color: '',
                color_msg: ''
            })
        })
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
