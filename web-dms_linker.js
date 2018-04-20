var dotenv = require('dotenv').config();
var mysql = require('promise-mysql');

function getData() {
	var twan = document.getElementById("twan").value;
	var tld = document.getElementById("tld").value;
	var companyID = document.getElementById("companyID").value;
	var buID = document.getElementById("buID").value;
	var sitegrID = document.getElementById("sitegrID").value;
	updateDMS(twan, companyID, buID, sitegrID);
	document.getElementById("twan").value = "";
	document.getElementById("companyID").value = "";
	document.getElementById("buID").value = "";
	document.getElementById("sitegrID").value = "";
	document.getElementById("link-dms-button").style.display = "none";
	document.getElementById("link-button-clicked").style.display = "block"
}

function updateDMS(twan, tld, companyID, buID, sitegrID) {
	console.log(twan, tld, companyID, buID, sitegrID);
}