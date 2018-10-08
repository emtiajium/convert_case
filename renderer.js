/**
 * Created by emtiaj on 10/8/18
 */

const $ = require('jquery');
const _ = require('underscore');
const _string = require('underscore.string');
const autoSize = require('autosize');
const prepositions = require('prepositions');

$(document).ready(() => {
	let textSelector = $('#main-text');

	autoSize(textSelector);

	textSelector.focus();

	textSelector.on('keyup', () => {
		$('#character-count').text(textSelector.val().length);
		$('#word-count').text(_string.words(textSelector.val()).length);
	});

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

		/**
		 * https://www.grammarbook.com/punctuation/capital.asp
		 */
		
		let capitalizeTitle = (title) => {
			let coordinatingConjunction = [
				'and',
				'or',
				'nor',
				'but',
				'for',
				'yet',
				'so'
			];

			let article = [
				'a',
				'an',
				'the'
			];

			let to = [
				'to'
			];

			let other = [
				'etc'
			];

			let forbiddenWords = prepositions.concat(coordinatingConjunction);
			forbiddenWords = forbiddenWords.concat(article);
			forbiddenWords = forbiddenWords.concat(to);
			forbiddenWords = forbiddenWords.concat(other);

			forbiddenWords = _.unique(forbiddenWords);

			title = _string.titleize(title);
		
			let wordArray = _string.words(title);
			let isInForbiddenWords = undefined;
		
			_.each(wordArray, (eachWord, index) => {
				isInForbiddenWords = _.find(forbiddenWords, (eachForbiddenWord) => {
					/**
					 * need to consider `<forbiddenWord>?`, `<forbiddenWord>.`, `<forbiddenWord>!`
					 */
					return eachForbiddenWord.toLowerCase() === eachWord.toLowerCase();
				});

				if (isInForbiddenWords !== undefined) {
					eachWord = _string.decapitalize(eachWord);
					wordArray[index] = eachWord;
				}
		
				isInForbiddenWords = undefined;
			});
		
			title = wordArray.join(' ');
			title = _string.clean(title);
			/**
			 * to Kill a Mockingbird
			 * To Kill a Mockingbird
			 */
			title = title.charAt(0).toUpperCase() + title.slice(1);
		
			return title;
		};
		textSelector.val(capitalizeTitle(textSelector.val()));
	});

	$('#inverse-case').on('click', () => {
		textSelector.val(_string.swapCase(textSelector.val()));
	});

	$('#clear-text').on('click', () => {
		textSelector.val('');
		$('#character-count').text(textSelector.val().length);
		$('#word-count').text(_string.words(textSelector.val()).length);
	});
});