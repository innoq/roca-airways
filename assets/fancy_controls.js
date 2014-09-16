/*jslint vars: true, white: true */
/*global jQuery */

(function($) {

"use strict";

var optionSelector = ".seats li:not(.unavailable)"; // XXX: hard-coded
var fieldSelector = "input:radio"; // XXX: hard-coded (should also work with checkboxes)

function fancyControls(selector) {
	var container = selector.jquery ? selector : $(selector);
	container.addClass("augmented").
		on("click", optionSelector, onSelect).
		on("change", fieldSelector, onSelect).
		on("focus", fieldSelector, onFocus).
		on("blur", fieldSelector, onBlur);

	// initialize state -- XXX: somewhat hacky
	var selected = container.find(fieldSelector + ":checked").
		closest(optionSelector);
	onSelect.call(selected[0]);
}

function onFocus(ev) {
	var field = onBlur.apply(this, arguments);
	field.addClass("focused");
}

function onBlur(ev) {
	var field = $(this).closest(optionSelector);
	field.closest(".augmented").find(optionSelector).removeClass("focused");
	return field;
}

function onSelect(ev) {
	// TODO: guard against duplicate invocation (both change & click) and/or deactivation?
	$(fieldSelector, this).prop("checked", true).
		closest(".augmented").find(optionSelector).each(sync);
}

// two-way synchronization of underlying control and fancy representation
function sync(i, node) {
	var el = $(node);
	var selected = el.find(fieldSelector).prop("checked");
	el.toggleClass("selected", selected);
}

// jQuery API
$.fn.fancyControls = function() {
	this.each(function(i, node) {
		fancyControls(node);
	});
	return this;
};

return fancyControls;

}(jQuery));
