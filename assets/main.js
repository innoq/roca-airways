(function() {

"use strict";

// ensure inline SVG support - adapted from Modernizr (http://modernizr.com)
var div = document.createElement("div");
div.innerHTML = "<svg />";
var svg = div.firstChild;
svg = svg && svg.namespaceURI === "http://www.w3.org/2000/svg";
if(!svg) {
	return;
}

// fancy controls

var list = $(".seats");

var optionSelector = "li:not(.unavailable)";
var fieldSelector = "input:radio";

list.addClass("augmented");
list.on("click", optionSelector, onSelect);
list.on("change", fieldSelector, onSelect);
list.on("focus", fieldSelector, onFocus);
list.on("blur", fieldSelector, onBlur);

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

}());
