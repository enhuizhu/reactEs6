'use strict';

export function PrefixedEvent(element, type, callback) {
	let pfx = ["webkit", "moz", "MS", "o", ""];

	for (var p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.addEventListener(pfx[p]+type, callback, false);
	}
}