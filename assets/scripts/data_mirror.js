/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

$.fn.dataMirror = function () {
	this.each(function() {
		var emitter = $(this);
		var receiverID = emitter.attr("data-emitter");
		var receiversSelector = "[data-receiver=" + receiverID + "]";
		var receivers = $(receiversSelector);
		receivers.attr('aria-live', 'polite');
		emitter.on('click', function(ev){
			var value = $(this).find('input').attr('value');
			receivers.each(function(){
				$(this).text(value);
			});
		});
	});
};

}(jQuery));
