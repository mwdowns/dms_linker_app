### DMS_LINKER_APP

This is a Node app for linking a newly created WPT1 client with an already existing WPT2 client.

It will ask a few questions getting the information it needs to make the updates and then run the queries and update statements. This will also update the mat/live/CLIENT/tld/config.php file. You will still need to run the svn commands to commit the changes and the command line stuff for propagating the client as well (basically most of step 4 on this [Confluence page](http://confluence.ignitionone.com/display/WEBPERS/How+to+link+existing+DMS+client+to+WP+client)).

Info it needs:
* what environment your are updating QA or PROD (defaults to PROD)
* the TWAN of the client in WPT1 (all caps)
* the tld of the client (lowercase)
* The company ID from the client in the WPT2 tool
* The business unit ID from the client in the WPT2 tool
* The site group ID from the client in the WPT2 tool

To get the requested info in the above questions, you can use the WPT2 webapp and search for company, business unit, and sitegroup for the client. The IDs will pop up in the search results.

To get it running make sure you have Node and NPM istalled on your machine then clone this repo.

Within the dms_linker_app folder, run `npm install` (uses php-parser, php-unparser, and promise-mysql and dotenv). This will install the needed modules. The next couple of steps are needed to get everything set up for it to work on your local machine:

1. You will need to create your own .env file within the main folder of the tool. In this file, add the following lines (supplying the sensitive info yourself):
```
DB_NAME=TARDIS
QA_DB_HOST='link to qa db here'
DB_HOST='link to prod db here'
DB_PASS='password for db here'
DB_USER='user name for db here'
```
2. You need to edit node_modules/php-unparser/node_translators/array.js line 21 -- change 80 to 40;
3. You need to edit update-php.js -- line 30ish -- path variable so that the first part of the string points to your local mat/live path.

I think that is about it for setup.

To run the app, type `node dms_linker.js`

Answer all the questions and you should be good to go. NOTE: If you want to test in order to see that things are working, use "test" for the twan question. You can update the hard-coded variables in the dms_linker.js (lines 33-37)file to point to the client you are testing (what's in there now is ACCORHOTELS) and also the path to where the test_config.php file is written. You can then see what the config.php file will look like (make sure it's OK).


To-do:
* possible call to bash scripts to run the svn commit commands
* don't think I can do the vagrant stuff, though
* Possible queries of WPT2 tool to get the required info there