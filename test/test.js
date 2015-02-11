var stringBuilder = require('../StringBuilder.js').stringBuilder
var chai = require('chai');

chai.config.includeStack = true;

expect = chai.expect;


describe( 'StringBuilder', function() {
	describe( '#cat()', function() {
		var result;
		it( 'given 3 strings as parameter, buffer should have a length of 3', function() {
			var sb = new stringBuilder();

			sb.cat( 'hello', ' world', ' today' );
			result = sb.string();

			expect(sb.buffer).to.have.length(3);
			expect(result).to.be.a( 'string' );
			expect(result).to.equal( 'hello world today' );
		});

		it( 'given an array as parameter buffer should have a length of 5', function() {
			var sb = new stringBuilder();
			sb.cat( 'this', [ ' "hello', ' world!"' ], ' is' ,' a string' );
			result = sb.string();

			expect( sb.buffer ).to.have.length(5);
			expect(result).to.be.a( 'string' );
			expect(result).to.equal( 'this "hello world!" is a string' );


		});

		it( 'given a function as a parameter buffer should have a length of 1, the value should be the string returned by the function', function() {
			var sb = new stringBuilder();
			sb.cat( function(){ return 'hello world'; } );
			result = sb.string();
			
			expect( sb.buffer ).to.have.length(1);
			expect(result).to.be.a( 'string' );
			expect(result).to.equal( 'hello world' );

		});

		it( 'given a function that returns an array that has a function, should still work and add all the elements correctly', function() {
			var sb = new stringBuilder();
			sb.cat( 'hello', function() { return [ function() { return ' world' }, ' this', ' is'] }, ' some', ' crazy', ' stuff' );
			result = sb.string();

			expect(sb.buffer).to.have.length(7);
			expect(result).to.equal( 'hello world this is some crazy stuff' );	

		});

	});

	describe( '#rep()', function(){
		var result;
		it('Given a a string, and a number, will concatenate the string the specified number of times', function(){
			var sb = new stringBuilder();
			sb.cat('Mom, can you').rep(' please', 3).cat(' buy me an ice cream');
			result = sb.string();

			expect(sb.buffer).to.have.length(5);
			expect(result).to.equal('Mom, can you please please please buy me an ice cream');

		});
	});

	describe( '#catIf()', function(){
		var result;
		it('Given a boolean as last parameter, will run as cat and concatenate if the condition is true', function(){
			var sb = new stringBuilder();
			sb.cat('this will').catIf( ' be', ' concatenated', true);

			result = sb.string();

			expect(result).to.equal('this will be concatenated');

		});
		it('Given a boolean as last parameter, will not concatenate if the condition is false', function(){
			var sb = new stringBuilder();
			sb.cat('this will not').catIf( ' be', ' concatenated', false);

			result = sb.string();

			expect(result).to.equal('this will not');
		});
	});

	describe( '#wrap()', function(){
		var result;
		it('Given the arguments, will add a prefix and suffix to the string',function(){
			var sb = new stringBuilder();
			sb.wrap('<li>', '</li>').cat('list item');
			result = sb.string();

			expect(result).to.equal('<li>list item</li>');
		});
	});

	describe( '#prefix()', function(){
		var result;
		it('Given the arguments, will add a prefix to the string',function(){
			var sb = new stringBuilder();
			sb.prefix('-').cat('list item');
			result = sb.string();

			expect(result).to.equal('-list item');
		});
	});

	describe( '#suffix()', function(){
		var result;
		it('Given the arguments, will add a suffix to the string',function(){
			var sb = new stringBuilder();
			sb.suffix('!').cat('list item');
			result = sb.string();

			expect(result).to.equal('list item!');
		});
	}); 

	describe( '#end()', function(){
		var result;
		it('Will add a prefix and suffix to the string on the first cat, but not on the second',function(){
			var sb = new stringBuilder();
			sb.cat('<ul>').wrap('<li>', '</li>').cat('list item').end().cat('</ul>');
			result = sb.string();

			expect(result).to.equal('<ul><li>list item</li></ul>');
		});
	});

});