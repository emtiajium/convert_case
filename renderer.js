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
    $('#line-count').text(_string.lines(textSelector.val()).length);
	});

	$('#sentence-case').on('click', () => {
		let text = _string.capitalize(textSelector.val(), true);
		_.each(text, (eachCharacter, index) => {
			let condition = text[index -2] === '.'
				|| text[index -2] === '!'
				|| text[index -2] === '?'
				|| text[index -2] === '\''
				|| text[index -2] === '"';
			if (index > -1 && text[index -1] === ' ' && condition) {
				text = text.slice(0, index) +  text.charAt(index).toUpperCase() + text.slice(index + 1);
			}
			else if (text[index].toLowerCase() === 'i') {
				text = text.slice(0, index) +  text.charAt(index).toUpperCase() + text.slice(index + 1);
			}
		});
		textSelector.val(text);
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
		let words = _string.words(textSelector.val());
		let aWord;
		let wordArray = [];
		_.each(words, (eachWord) => {
      aWord = '';
			_.each(eachWord, (eachCharacter, index) => {
				if ((index % 2) === 0) {
          eachCharacter = eachCharacter.toLowerCase();
				}
				else {
          eachCharacter = eachCharacter.toUpperCase();
        }
        aWord += eachCharacter;
			});
			wordArray.push(aWord);
		});
		textSelector.val(wordArray.join(' '));
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
					 * ?
					 * .
					 * !
					 * '
					 * "
					 */
					let condition = (eachWord.toLowerCase() === eachForbiddenWord.toLowerCase())
						|| (eachWord.toLowerCase().match(new RegExp(eachForbiddenWord.toLowerCase() + "\\?|\\.|\\!|\\'" + '|' + '\\"' , 'i')) !== null);
					return condition;
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
    let words = _string.words(textSelector.val());
    let aWord;
    let wordArray = [];
    _.each(words, (eachWord) => {
      aWord = '';
      _.each(eachWord, (eachCharacter, index) => {
        if ((index % 2) === 1) {
          eachCharacter = eachCharacter.toLowerCase();
        }
        else {
          eachCharacter = eachCharacter.toUpperCase();
        }
        aWord += eachCharacter;
      });
      wordArray.push(aWord);
    });
    textSelector.val(wordArray.join(' '));
	});

	$('#clear-text').on('click', () => {
		textSelector.val('');
		$('#character-count').text(textSelector.val().length);
		$('#word-count').text(_string.words(textSelector.val()).length);
	});
});