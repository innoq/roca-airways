var express = require("express");
var nunjucks = require("nunjucks");
var path = require("path");

var app = express();
var app = module.exports = express();
app.set("title", "ROCAir Seat Selector");
nunjucks.configure("templates", { autoescape: true, express: app });

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.get("/", function(req, res) {
	res.render("seats.html", {
		title: app.get("title")
	});
});
