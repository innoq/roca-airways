/*jslint vars: true, plusplus: true, node: true, white: true */
"use strict";

exports.randomInt = function(min, max) {
	var num = Math.random() * (max - min) + min;
	return Math.floor(num);
}

