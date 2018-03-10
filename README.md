### DMS_LINKER_APP

This is a Node app for linking a newly created WPT1 client with an already existing WPT2 client. 

It will ask a few questions getting the information it needs to make the updates and then run the queries and update statements.

Info it needs:
* the password to the DB
* the TWAN of the client in WPT1 (all caps)
* The company ID from the client in the WPT2 tool
* The business unit ID from the client in the WPT2 tool
* The site group ID from the client in the WPT2 tool

To get it running make sure you have Node and NPM istalled on your machine then clone this repo
Within the dms_linker_app folder, run `npm install`
This will install the needed Node modeules (just promise-mysql so far).
To run the app, type `node dms_linker.js`
Answer all the questions and you should be good to go.

To-do:
* Error and argument checking
* Possible queries of WPT2 tool to get the required info there