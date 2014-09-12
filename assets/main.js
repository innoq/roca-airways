/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

// ensure inline SVG support - adapted from Modernizr (http://modernizr.com)
var div = document.createElement("div");
div.innerHTML = "<svg />";
var svg = div.firstChild;
svg = svg && svg.namespaceURI === "http://www.w3.org/2000/svg";
if(!svg) {
	return;
}

// augmentation controls
$(".seats").fancyControls();

}(jQuery));
