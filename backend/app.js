/*jslint vars: true, node: true, white: true */
"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var nunjucks = require("nunjucks");
var path = require("path");
var generateSeats = require("./seats");
var util = require("./util");

var app = express();
var app = module.exports = express();
app.set("title", "ROCAir Seat Selector");
nunjucks.configure("templates", { autoescape: true, express: app });

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
	var flightNumber = util.randomInt(100, 9999);
	res.redirect("/check-in/rc-" + flightNumber);
});

app.all("/check-in/:flight", function(req, res) {
	// validate request method -- XXX: we shouldn't be doing this manually
	var methods = ["GET", "POST"]; // TODO: OPTIONS, HEAD?
	if(methods.indexOf(req.method) === -1) {
		res.set("Allow", methods.join(", "));
		res.status(405).end();
		return;
	}

	var flightID = req.params.flight.toUpperCase();
	if(flightID.indexOf("RC-") !== 0) { // someone's being clever
		res.status(404).send("We're afraid flight " + flightID +
				" is not operated by ROCAir.");
		return;
	}

	var params = {
		title: app.get("title"),
		flightID: flightID
	};
	if(req.method === "GET") {
		params.checkInURI = ""; // i.e. self
		params.seats = generateSeats(24);
		res.render("seats.html", params);
	} else {
		params.selectedSeat = req.body.seat;
		res.render("confirmation.html", params);
	}
});
