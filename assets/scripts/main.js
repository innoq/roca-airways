/*jslint vars: true, white: true */

(function(window, undefined) {

	"use strict";

	// Find out on which page to load what. We do not want to serve
	// unused enhancements to all pages. Not very elegant, but works...

	function isStartPage() {
		return document.title.indexOf("Start") > -1;
	};

	function isSeatSelectionPage() {
		return document.title.indexOf("Seat Selection") > -1;
	};


	// Cutting the mustard: most enhancements reuquire jQuery in place.
	// If a browser does not support it (like IE8) we fall back to
	// basic functionality. If it does support jQuery 2.x we load
	// it first synchronously and provide a fallback in case
	// the CDN is down.

	if (typeof JSON !== 'undefined' && 'querySelector' in document
					&& 'addEventListener' in window) {

		Modernizr.load([
			{
				load: "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js",
				complete: function () {
					if ( !window.jQuery ) {
						console.log('local jQuery loaded');
						Modernizr.load('assets/vendor/jquery.js');
					}
				}
			}
		]);
	} else {
		// A fallback like jQuery 1.x could be loaded here.
		return;
	}

	// We use feature-detection and script loading provided by Moderizr
	// to test and load in additional enhancements. For the sake of
	// simpilcity all enhancements are loaded individually.

	Modernizr.load([

		// Webfonts are loaded by Webfontloader. You can find more details
		// about it here: https://github.com/typekit/webfontloader
		// TODO: Build in fallback if Google CDN is down
		{
			test : Modernizr.fontface,
			yep  : '//ajax.googleapis.com/ajax/libs/webfont/1.5.3/webfont.js',
			callback: function () {
				console.log('Webfontloader loaded');
				WebFont.load({
					google: {
						families: ['Lato:700italic', 'Open+Sans:400,300,600']
					}
				});
			}
		},

		// Clientside form validation is provided by the jQuery plugin h5validate.
		// It works unobtrusively and adds ARIA attributes in its callbacks.
		{
			test : Modernizr.formvalidationapi && isStartPage(),
			yep  : "/assets/vendor/h5validate.js",
			callback : function() {
				console.log('h5validate loaded');
				$('.checkin-form').h5Validate({
					errorClass: 'invalid-input',
					validClass: 'valid-input',
					invalidCallback: function(elem, valid) {
						$(elem.element).attr('aria-invalid', true);
					},
					validCallback: function(elem, valid) {
						$(elem.element).removeAttr('aria-invalid');
					}
				});
			}
		},

		// These small enhancements should be fine with just jQuery in place
		{
			test : isSeatSelectionPage(),
			yep  : ["/assets/scripts/seat_picker.js",
					"/assets/scripts/data_mirror.js",
					"/assets/scripts/smooth_scroll.js"
					],
			callback : {
				"seat_picker.js": function () {
					console.log('seat picker loaded');
					$(".rows").seatPicker();
				},
				"data_mirror.js": function () {
					console.log('data emitter loaded');
					$("[data-emitter]").dataMirror();
				}
			}
		},

		// Fancy tooltips are only shown on non-touch devices as the tend to
		// stay open on touch events and provide a weird glitch while scrolling.
		{
			test : !Modernizr.touch && isSeatSelectionPage(),
			yep  : "/assets/vendor/tooltipsy.js",
			callback : function () {
				console.log('tooltips loaded');
				$('[data-toggle=tooltip]').tooltipsy({
					className: 'tooltip'
				});
			}
		}
	]);

}(this));
