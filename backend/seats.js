/*jslint vars: true, plusplus: true, node: true, white: true */
"use strict";

var util = require("./util");

module.exports = function(rows) {
	var cols = 6; // each row consists of 2 * 3 seats
	var seats = [];
	var i;
	for(i = 0; i < rows * cols; i++) {
		var id = seat_id(i);

		var vip = i < 5 * cols;
		var occupied, desc;
		if(vip) {
			desc = "reserved for VIPs";
		} else {
			occupied = Math.random() < 0.3;
			desc = occupied ? "occupied" : null;
		}

		var seat = new Seat(id, desc, vip, occupied);
		seats.push(seat);
	}

	// preselect random seat
	var selection;
	while(!selection) {
		var index = util.randomInt(0, seats.length - 1);
		var seat = seats[index];
		if(!seat.unavailable()) {
			seat.selected = true;
			selection = seat;
		}
	}

	return seats;
};

function Seat(id, desc, vip, occupied) {
	this.id = id;
	this.desc = desc;
	this.vip = !!vip;
	this.occupied = !!occupied;
}

Seat.prototype.class = function() {
	var self = this;
	return ["unavailable", "vip", "occupied"].map(function(name) { // XXX: too implicit
		var prop = self[name];
		if(prop.call) {
			prop = prop.call(self);
		}
		return prop ? name : null;
	}).join(" ").trim();
};

Seat.prototype.label = function() { // XXX: unnecessary
	return this.id.toUpperCase();
};

Seat.prototype.unavailable = function() {
	return !!(this.vip || this.occupied);
};

function seat_id(index) {
	var row = Math.floor(index / 6) + 1;
	var col = "ABCDEF"[index % 6];
	return row + col;
}
