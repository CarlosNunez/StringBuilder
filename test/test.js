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
		it('Given a boolean as last parameter, will run as cat and concatenate if the condition is true', function() { 
			var sb = new stringBuilder();
			sb.cat('this will').catIf( ' be', ' concatenated', true);

			result = sb.string();

			expect(result).to.equal('this will be concatenated');

		});
		it('Given a boolean as last parameter, will not concatenate if the condition is false', function() {
			var sb = new stringBuilder();
			sb.cat('this will not').catIf( ' be', ' concatenated', false);

			result = sb.string();

			expect(result).to.equal('this will not');
		});
	});

	describe( '#wrap()', function(){
		var result;
		it('Given the arguments, will add a prefix and suffix to the string', function() {
			var sb = new stringBuilder();
			sb.wrap('<li>', '</li>').cat('list item');
			result = sb.string();
			expect(result).to.equal('<li>list item</li>');
		});

		it('Given the arguments, will add the prefix to all strings concatenated after the wrap call', function() { 
			var sb = new stringBuilder();
			sb.wrap('<li>', '</li>').cat('list item').rep('more list items', 3);
			result = sb.string();

			expect(result).to.equal('<li>list item</li><li>more list items</li><li>more list items</li><li>more list items</li>');
		});

		it('Calling the wrap more than once will wrap the next strings in all the wraps before', function() { 
			var sb = new stringBuilder();
			sb.wrap('<div>', '</div>').wrap('<p>','</p>').cat('content');
			result = sb.string();

			expect(result).to.equal('<div><p>content</p></div>');
		});	


	});

	describe( '#prefix()', function(){
		var result;
		it('Given the arguments, will add a prefix to the string', function() {
			var sb = new stringBuilder();
			sb.prefix('-').cat('list item');
			result = sb.string();

			expect(result).to.equal('-list item');
		});
		it('Given the arguments, will add prefix to all the following concatenated strings', function() {
			var sb = new stringBuilder();
			sb.prefix('sub').rep('marine ', 3);
			result = sb.string();

			expect(result).to.equal('submarine submarine submarine ');
		});
		it('Calling prefix several times will add all prefixes to the following string', function() {
			var sb = new stringBuilder();
			sb.prefix('yellow').prefix(' sub').cat('marine');
			result = sb.string();

			expect(result).to.equal('yellow submarine');
		});

	});

	describe( '#suffix()', function(){
		var result;
		it('Given the arguments, will add a suffix to the string', function() {
			var sb = new stringBuilder();
			sb.suffix('!').cat('list item');
			result = sb.string();

			expect(result).to.equal('list item!');
		});

		it('Given the argument, will add the suffix to all the following concatenated strings', function() {
			var sb = new stringBuilder();
			sb.suffix('!').cat('this').cat('is').cat('sparta');
			result = sb.string();

			expect(result).to.equal('this!is!sparta!');
		});
		it('Calling suffix several times will add all suffixes to the following strings', function() {
			var sb = new stringBuilder();
			sb.suffix('?').suffix('!').cat('what').cat('when');

			result = sb.string();

			expect(result).to.equal('what!?when!?');

		});
	}); 

	describe( '#end()', function(){
		var result;
		it('Using end without deep parameter will the wrap like effect added', function() {
			var sb = new stringBuilder();
			sb.cat('<ul>').wrap('<li>', '</li>').cat('list item').end().cat('</ul>');
			result = sb.string();

			expect(result).to.equal('<ul><li>list item</li></ul>');
		});

		it('Having called wrap-like methods several times,calling end without parameter will end the last effect added', function() {
			var sb = new stringBuilder();
			sb.cat('<ul>').wrap('<li>', '</li>').prefix('sub').cat('marine').end().cat('boat').end().cat('</ul>');
			result = sb.string();

			expect(result).to.equal('<ul><li>submarine</li><li>boat</li></ul>');
		});
		it('Passing a deep parameter, end() will undo the selected number of effects starting with the latest one', function() {
			var sb = new stringBuilder();
			sb.wrap('<li>', '</li>').prefix('sub').cat('marine').end(2).cat(' boat');
			result = sb.string();

			expect(result).to.equal('<li>submarine</li> boat')

		})

	});

});