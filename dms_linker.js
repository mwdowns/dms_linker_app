var dotenv = require('dotenv').config();
var mysql = require('promise-mysql');
var shell = require('shelljs');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var update_php = require('./update-php.js');

var initialquery     = ["SELECT implementation_id AS impID, client_id AS clientID, tag_id AS tagID, dms_id AS dms FROM tar_onsite_implementation WHERE path LIKE '%", 0, "%'"];

var buupdate_test        = ["SELECT dms_id FROM tar_onsite_implementation WHERE implementation_id = ", 0];
var companyupdate_test   = ["SELECT dms_id AS dms FROM tar_client WHERE client_id = ", 0];
var sitegroupupdate_test = ["SELECT dms_id AS dms FROM tar_tag WHERE tag_id = ", 0, "", ""];
var buupdate        = ["UPDATE  tar_onsite_implementation SET dms_id = ", 0, " WHERE implementation_id = ", 0];
var companyupdate   = ["UPDATE  tar_client SET dms_id = ", 0, " WHERE  client_id = ", 0];
var sitegroupupdate = ["UPDATE  tar_tag SET dms_id = ", 0, " WHERE  tag_id = ", 0];


rl.question('What Database is this for? QA or PROD? (default is PROD) : ', (db) => {
	// tell me what database i'm about to destroy... j/k
	var dbase = (db == 'QA') ? process.env.QA_DB_HOST : process.env.DB_HOST;
	console.log('We\'re updating the ' + ((db == 'QA') ? 'QA' : 'PRODUCTION') + ' database.');
	rl.question('What is the TWAN you are looking for? ', (twan) => {
		rl.question('What is the tld for the company? ', (tld) => {
			rl.question('What is the Company ID from WPT2? ', (companyID) => {
				rl.question('What is the Business Unit ID from WPT2? ', (buID) => {
					rl.question('What is the Site Group ID from WPT2? ', (sitegrID) => {
						var connection;
						if (twan === 'test') {
							test = true;
							twan = 'ACCORHOTELS';
							tld = 'fr';
							companyID = 109271;
							buID = 109273;
							sitegrID = 109272;
						} else {
							test = false;
						}
						console.log('hello');
						mysql.createConnection({
							host: dbase,
							user: process.env.DB_USER,
							password: process.env.DB_PASS,
							database: process.env.DB_NAME
						}).then(function(conn) {
							connection = conn;
							initialquery[1] = twan;
							return connection.query(initialquery.join(''));
						}).then(function(data) {
							console.log('hey');
							buupdate = test === true ?  buupdate_test : buupdate;
							buupdate[1] = buID;
							if (test === false) buupdate[3]= data[0].impID;
							console.log(buupdate.join(''));
							return connection.query(buupdate.join(''));
						}).then(function(data) {
							companyupdate = test === true ? companyupdate_test : companyupdate;
							companyupdate[1] = companyID;
							if (test === false) companyupdate[3]= data[0].clientID;
							console.log(companyupdate.join(''));
							return connection.query(companyupdate.join(''));
						}).then(function(data) {
							sitegroupupdate = test === true ? sitegroupupdate_test : sitegroupupdate;
							sitegroupupdate[1] = sitegrID;
							if (test === false) sitegroupupdate[3]= data[0].tagID;
							console.log(sitegroupupdate.join(''));
							return connection.query(sitegroupupdate.join(''));
						}).then(function(data) {
							console.log('finished updating');
							connection.end();
							console.log('updating config.php file');
							update_php(twan, tld, buID, test);
						}).catch(function(error) {
							return error;
						});
						rl.close();
					});
				});
			});
		});
	});
});