var express = require("express");
var nunjucks = require("nunjucks");
var path = require("path");

var app = express();
var app = module.exports = express();
app.set("title", "ROCAir Seat Selector");
nunjucks.configure("templates", { autoescape: true, express: app });

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.get("/", function(req, res) {
	var flightNumber = rand(100, 9999);
	res.redirect("/check-in/rc-" + flightNumber);
});

app.get("/check-in/:flight", function(req, res) {
	var flightID = req.params.flight.toUpperCase();

	if(flightID.indexOf("RC-") !== 0) { // someone's being clever
		res.status(404).send("We're afraid flight " + flightID +
				" is not operated by ROCAir.");
		return;
	}

	res.render("seats.html", {
		title: app.get("title"),
		flightID: flightID
	});
});

function rand(min, max) {
	var num = Math.random() * (max - min) + min;
	return Math.floor(num);
}
