'use strict';

var definitions = {
    'v1': require('./version1')
};
definitions.querystring = {
    sig: 'hmac signature',
    cli: 'your client ID'
};
exports = module.exports = definitions;
