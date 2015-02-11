var stringBuilder = require('../StringBuilder.js').stringBuilder
var chai = require('chai');

chai.config.includeStack = true;

assert = chai.assert;

describe( 'Array', function(){
  	describe( '#indexOf()', function(){
	    it( 'should return -1 when the value is not present', function(){
	      assert.equal(-1, [1,2,3].indexOf(5));
	      assert.equal(-1, [1,2,3].indexOf(0));
	    });
  	});
});

describe( 'StringBuilder', function(){
	describe( '#cat()', function(){
		var bufferLen;
		it( 'given 3 strings as parameter, buffer should have a length of 3', function(){
			var sb = new stringBuilder();
			sb.cat('hello', 'world', 'today');

			bufferLen = sb.buffer.length;

			assert.equal(bufferLen, 3);
		});

		it( 'given an array as parameter buffer should have a length of 5', function(){
			var sb = new stringBuilder();
			sb.cat('this', [' "hello', ' world!"'], ' is' ,' a string');

			bufferLen = sb.buffer.length;

			assert.equal(bufferLen, 5);

		});

		it( 'given a function as a parameter buffer should have a length of 1, the value should be the string returned by the function', function(){
			var sb = new stringBuilder();
			sb.cat( function(){ return "hello world"; } );

			bufferLen = sb.buffer.length;

			assert.equal(bufferLen, 1);
			assert.equal(sb.buffer[0], "hello world");
		});

	})
});