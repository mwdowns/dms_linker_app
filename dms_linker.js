var dotenv = require('dotenv').config();
var mysql = require('promise-mysql');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var initalquery = ["SELECT implementation_id AS impID, client_id AS clientID, tag_id AS tagID, dms_id AS dms FROM tar_onsite_implementation WHERE path LIKE '%", "", "%'"];
var buupdate = ["UPDATE  tar_onsite_implementation SET dms_id = ", 0, " WHERE implementation_id = ", 0];
// var query3 = ["SELECT dms_id AS dms FROM tar_client WHERE client_id = ", 0];
// var query4 = ["SELECT dms_id AS dms FROM tar_tag WHERE tag_id = ", 0];
var companyupdate = ["UPDATE  tar_client SET dms_id = ", 0, " WHERE  client_id = ", 0];
var sitegroupupdate = ["UPDATE  tar_tag SET dms_id = ", 0, " WHERE  tag_id = ", 0];


rl.question('What is the TWAN you are looking for? ', (twan) => {
	rl.question('What is the Company ID from WPT2? ', (companyID) => {
		rl.question('What is the Business Unit ID from WPT2? ', (buID) => {
			rl.question('What is the Site Group ID from WPT2? ', (sitegrID) => {
				var connection;
				mysql.createConnection({
					host: process.env.DB_HOST,
					user: process.env.DB_USER,
					password: process.env.DB_PASS,
					database: process.env.DB_NAME,
				}).then((conn) => {
					connection = conn;
					initalquery[1] = twan;
					return connection.query(initalquery.join(''));
				}).then((data) => {
					buupdate[1] = buID;
					buupdate[3]= data[0].impID;
					companyupdate[3] = data[0].clientID;
					sitegroupupdate[3] = data[0].tagID;
					console.log(buupdate);
					return connection.query(buupdate.join(''));
				}).then((data) => {
					companyupdate[1] = companyID;
					console.log(companyupdate);
					return connection.query(companyupdate.join(''));
				}).then((data) => {
					sitegroupupdate[1] = sitegrID;
					console.log(sitegroupupdate);
					return connection.query(sitegroupupdate.join(''));
				}).then((data) => {
					console.log('finished updating');
					connection.end();
				}).catch((error) => {
					if (connection && conection.end) connection.end();
					console.log(error);
				});
				rl.close();
			});
		});
	});
});
