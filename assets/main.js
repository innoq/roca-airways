/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

// ensure SVG support - adapted from Modernizr (http://modernizr.com)
var svg = !!document.createElementNS && !!document.
		createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
var svgFilters;
try {
	svgFilters = typeof SVGFEColorMatrixElement !== undefined &&
			SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
} catch(exc) {}
if(!svg || !svgFilters) {
	return;
}

// augmentation controls
$(".rows").fancyControls();

}(jQuery));
