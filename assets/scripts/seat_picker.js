/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

var seatSelector = ".seats li:not(.unavailable)";
var inputSelector = "input:radio";

function seatPicker(selector) {
	var container = selector.jquery ? selector : $(selector);

	container.addClass("augmented").
		on("click", seatSelector, onSelect).
		on("change", inputSelector, onSelect).
		on("focus", inputSelector, onFocus).
		on("blur", inputSelector, onBlur);

	// initialize state
	var selected = container.find(inputSelector + ":checked").
		closest(seatSelector);
	onSelect.call(selected[0]);
}

function onFocus(ev) {
	var field = onBlur.apply(this, arguments);
	field.addClass("focused");
}

function onBlur(ev) {
	var field = $(this).closest(seatSelector);
	field.closest(".augmented").find(seatSelector).removeClass("focused");
	return field;
}

function onSelect(ev) {
	$(inputSelector, this).prop("checked", true).
		closest(".augmented").find(seatSelector).each(sync);
}

// two-way synchronization of underlying control and fancy representation
function sync(i, node) {
	var el = $(node);
	var selected = el.find(inputSelector).prop("checked");
	el.toggleClass("selected", selected);
}

// jQuery API
$.fn.seatPicker = function() {
	this.each(function(i, node) {
		seatPicker(node);
	});
	return this;
};

return seatPicker;

}(jQuery));
