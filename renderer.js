/**
 * Created by emtiaj on 10/8/18
 */

const $ = require('jquery');
const _string = require('underscore.string');
const autoSize = require('autosize');

$(document).ready(() => {
	let textSelector = $('#main-text');
	autoSize(textSelector);

	$('#sentence-case').on('click', () => {
		textSelector.val(_string.capitalize(textSelector.val(), true));
	});

	$('#lower-case').on('click', () => {
		textSelector.val(textSelector.val().toLowerCase());
	});

	$('#upper-case').on('click', () => {
		textSelector.val(textSelector.val().toUpperCase());
	});

	$('#capitalized-case').on('click', () => {
		textSelector.val(_string.titleize(textSelector.val()));
	});

	$('#alternating-case').on('click', () => {
		textSelector.val(_string.swapCase(textSelector.val()));
	});

	$('#title-case').on('click', () => {
		textSelector.val(_string.titleize(textSelector.val()));
	});

	$('#inverse-case').on('click', () => {
		textSelector.val(_string.swapCase(textSelector.val()));
	});

	$('#clear-text').on('click', () => {
		textSelector.val('');
	});
});