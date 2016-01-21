# d3media UM definitions

## What is this repository
This repository contains all the information you need to create UM valid hashes.
You probable get to here because you already know this service. Otherwise, please visit [d3media.de](http://www.d3media.de/)

## How does it work?
We expose a [definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json) file which defines each hash type *recipe*

## Hash types?
As you can see at [definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json) we accept four different hashes:
* email hash
* address hash
* country and postal code hash
* phone number hash

## Understanding the definitions.json file

[definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json) under `$version/hashes` contains the different hash types for that version.
```
{
    "v1": {
        "hashes": {
	    // Hash type email
            "email": {
		// "map" is a list of function to apply to the raw email.
		// the output of the previous will be input of the next one.
                "map": ["whiteSpaceIsSpace", "trim", "toLowerCase"],
		// querystring
                "querystring": "e"
            },
        }
    }
}
```
Also, it defines the hash algorithm and format.
### The map field
The map field defines how to process the raw information to create the hash. In this case, an email address. Given the following functions in our program `whiteSpaceIsSpace`, `trim`, `toLowerCase`we can process an email in the following way:
```
var email = 'foo@bar.com';
var readyToHash = toLowerCase(trim(whiteSpaceIsSpace(email)));
var hash = sha256(readyToHash);
```

You can find [reference implementations](https://github.com/d3media/d3media-um-definitions/blob/master/lib/version1-functions.js) for all functions defined at 
[definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json).

### Complex hashes
Some hashes are the product of the concatenation of fields. We call them *complex hash types*. For instance, the address hash is a composition of country, postal code, street and number. 
We define such hashes at [definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json) with the `complex` field. To build a complex hash you process the different fields an once they are ready you concatenate them with the `separator` field defined at [definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json) too. Fields should be concatenated keeping *exactly* the same order they have in `complex` field.
Here is a little example: 
```
Given the following definition
...
    "someComplexHash": {
	"complex": [{
	    "field1": {
		"map": ["trim"]
	    }
	}, {
	    "field2": {
		"map": ["trim", "toLowerCase"]
	    }
	}]
    }
...
"separator":"|"

var field1ReadyToHash = trim(field1);
var field2ReadyToHash = toLowerCase(trim(field2));
// Notice that we hash the fields in the same order as they are
// in the *complex* field.
var someComplexHash = sha256(field1+"|"+field2);
```

### The querystring field
Every hash definition defines a `querystring` value. When you submit this hashes via an http `GET`, the `querystring` value is the *key* you will use to reference this hash.
```
{
    "v1": {
        "hashes": {
	    // Hash type email
            "email": {
	         ...
                "querystring": "e"
            },
        }
    }
}
// GET $HOST/e=$email-hash
```

### Hashing
Hash must be computed with the *algorithm* and *format* specified  at [definitions.json](https://github.com/d3media/d3media-um-definitions/blob/master/definitions.json)
