/*jslint vars: true, plusplus: true, node: true, white: true */
"use strict";

var util = require("./util");

module.exports = function(rowCount, colCount, occupancy) {
	var rows = [];
	var i, j;
	for(i = 0; i < rowCount; i++) {
		var seats = [];
		for(j = 0; j < colCount; j++) {
			var id = i * colCount + j;
			var seat = generateSeat(id, 5 * colCount, occupancy);
			seats.push(seat);
		}
		rows.push(seats);
	}

	// preselect random seat
	var selection;
	while(!selection) {
		var row = util.randomInt(0, rowCount - 1);
		var col = util.randomInt(0, colCount - 1);
		var seat = rows[row][col];
		if(!seat.unavailable()) {
			seat.selected = true;
			selection = seat;
		}
	}

	return { selectedSeat: selection, seats: rows };
};

function generateSeat(index, vipCount, occupancy) {
	var vip = index < vipCount;
	var occupied, desc;
	if(vip) {
		desc = "Business Class";
	} else {
		occupied = Math.random() < occupancy;
		desc = occupied ? "Occupied" : "Free";
	}
	return new Seat(index, desc, vip, occupied);
}

function Seat(index, desc, vip, occupied) {
	this.id = seatID(index);
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

function seatID(index) {
	var row = Math.floor(index / 6) + 1;
	var col = "ABCDEF"[index % 6];
	return row + col;
}
