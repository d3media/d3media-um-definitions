'use strict';
var fs = require('fs');
var countryCodes = require('./iso3166-alpha2.json');
var WHITE_SPACE_COLLAPSABLE = /\s+/g;
var NON_NUMBER = /\D/g;
var otherWhiteSpace = [
    'U+0009', // character tabulation
    'U+000A', // line feed	
    'U+000B', // line tabulation	
    'U+000C', // form feed
    'U+000D', // carriage return
    'U+0085', // next line
    'U+00A0', // no-break space
    'U+1680', // ogham space mark
    'U+2000', // en quad
    'U+2001', // em quad	
    'U+2002', // en space
    'U+2003', // em space	
    'U+2004', // three-per-em space
    'U+2005', // four-per-em space
    'U+2006', // six-per-em space
    'U+2007', // figure space
    'U+2008', // punctuation space
    'U+2009', // thin space
    'U+200A', // hair space
    'U+2028', // line separator
    'U+2029', // paragraph separator
    'U+202F', // narrow no-break space
    'U+205F', // medium mathematical space
    'U+3000', // ideographic space
    'U+180E', // mongolian vowel separator
    'U+200B', // zero width space
    'U+200C', // zero width non-joiner
    'U+200D', // zero width joiner
    'U+2060', // word joiner
    'U+FEFF', // zero width non-breaking space
];
var illegalWhiteSpace = otherWhiteSpace.reduce(function (acc, unicode) {
    var c = String.fromCharCode(parseInt(unicode.replace('U+', ''), 16));
    if (acc[c]) {
        throw new Error('Unicode ' + unicode + ' defined more than onec');
    }
    acc[c] = unicode;
    return acc;
}, {});

function whiteSpaceIsSpace(input) {
    var ret, c, i;
    for (i = 0; i < input.length; i++) {
        if (!(c = illegalWhiteSpace[i])) {
            continue;
        }
        if (!ret) {
            ret = input.split('');
        }
        ret[i] = ' ';
    }
    return ret && ret.join('') || input;
}

exports.whiteSpaceIsSpace = whiteSpaceIsSpace;

function noExtraWhiteSpace(input) {
    return String(value).replace(WHITE_SPACE_COLLAPSABLE, ' ');
}

exports.noExtraWhiteSpace = noExtraWhiteSpace;

function trim(input) {
    return String(input).trim();
};

exports.trim = trim;

function toLowerCase(input) {
    return String(input).toLowerCase();
};

exports.toLowerCase = toLowerCase;

function stripNonNumbers(input) {
    return String(value).replace(NON_NUMBER, '');
}

exports.stripNonNumbers = stripNonNumbers;

function iso3166alpha2(input) {
    var ret = countryCodes[input];
    if (!ret) {
        throw new Error('Unknown country');
    }
    return ret;
}

exports.iso3166alpha2 = iso3166alpha2;
