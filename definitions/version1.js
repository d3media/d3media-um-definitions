'use strict';
var ALGORITHM = 'SHA-256';
var TRIM_AND_LOWERCASE = ['whiteSpaceIsSpace', 'trim', 'toLowerCase'];
var country = {
    name: 'country',
    map: ['iso3166alpha2'].concat(TRIM_AND_LOWERCASE)
};
var postalCode = {
    name: 'postalCode',
    map: ['collapseWhiteSpace'].concat(TRIM_AND_LOWERCASE)
};
var street = {
    name: 'street',
    map: TRIM_AND_LOWERCASE
};
var streetNumber = {
    name: 'number',
    map: TRIM_AND_LOWERCASE
};
var HASH_FORMAT = 'hex';
// map definitions:
// trim: remove all white space before and after content
// I.e trim('   abc   ') returns 'abc'
//
// toLowerCase: turn all characters into their lower case version
// I.e toLowerCase('ABC') returns 'abc'
//
// collapseWhiteSpace: only one white space between two blocks of text
// I.e collapseWhiteSpace('a       b') returns 'a b'
//
// whiteSpaceIsSpace: the only valid white space (a character you can not see) 
// character allowed is the white space UTF8 0x20. Any other white space character like
// em space, thin space, etc. Should be transformed into a regular space.
// I.e whiteSpaceIsSpace('Ludwig<TAB>Erhard<TAB>Str') returns 'Ludwig Erhard Str'
// Where <TAB> were tabs characters.
// See https://en.wikipedia.org/wiki/Whitespace_character
//
// iso3166alpha2: value is a valid ISO 3166 alpha 2 code for a given country 
// I.e iso3166alpha2('Germany') returns 'DE'
// See: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
//
// stripNonNumbers: it removes any non number (0-9) from the string
// I.e stripNonNumbers('00 49 0/123-456') returns '00490123456'

exports.hashes = {
    email: {
        name: 'email',
        map: TRIM_AND_LOWERCASE,
        querystring: 'e'
    },
    address: {
        name: 'address',
        querystring: 'a',
        complex: [{
            country: country
        }, {
            postalCode: postalCode
        }, {
            street: street
        }, {
            number: streetNumber
        }]
    },
    countryAndPostalCode: {
        name: 'countryAndPostalCode',
        querystring: 'c',
        complex: [{
            country: country
        }, {
            postalCode: postalCode
        }]
    },
    phoneNumber: {
        name: 'phoneNumber',
        querystring: 'p',
        map: ['stripNonNumbers'].concat(TRIM_AND_LOWERCASE)
    }
};
exports.separator = '|';
exports.algorithm = ALGORITHM;
exports.format = HASH_FORMAT;
