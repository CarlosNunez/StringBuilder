(function (exports){
	"use strict";

	var strBuilder = function(){
		this.buffer = [];
		this.prefixes = [];
		this.suffixes= [];
	},

    isArray = function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },

    isFunction = function(value) {
        return typeof value === "function";
    },

    isNumber = function(n) {
    	return typeof n === "number" && isFinite(n);
    },

    concatenate = function(){
    	var len = arguments.length,
    	i,
    	value,
    	result;

		for ( i = 0; i < len ; i += 1 ) {
			value = arguments[i];
	
			if( isFunction(value) ){				
				result = value.apply(this);
				this.cat.call(this, result);

			}else if( isArray(value) ) {
				this.cat.apply(this, value); 
			}else {
				this.buffer.push(value);
			}
		}
    }
 

	strBuilder.prototype = {
		cat : function() {
			var len = this.prefixes.length,
			args = Array.prototype.slice.call(arguments),
			i,
			j = len - 1,
			pref,
			suff;

	        for (i = 0; i < len; i += 1) {
	            pref = this.prefixes[j];
	            suff = this.suffixes[i];
	            args.unshift(pref);
	            args.push(suff);

	            j -= 1;
	        }

	        concatenate.apply(this, args);

			return this;
		},

		string : function(){
			var resultString = this.buffer.join('');

			return resultString;
		},

		rep : function () {
			var args = Array.prototype.slice.call(arguments),
			numberOfTimes = args.pop(),
			i;

			if( !isNumber(numberOfTimes) ) {
				numberOfTimes = 1;
			}

			for( i = 0; i < numberOfTimes; i += 1 ) {
				this.cat.apply(this, args);

			}

			return this;

		},

		catIf : function(){
			var args = Array.prototype.slice.call(arguments),
			condition = args.pop();

			if( condition ) {
				this.cat.apply(this, args)
			}

			return this;
		},

		wrap : function( prefix, suffix ) {
			this.prefixes.push( prefix );
			this.suffixes.unshift( suffix );

			return this;
		},

		prefix : function( prefix ) {
			this.wrap(prefix, '');

			return this;
		},
		suffix : function( suffix ) {
			this.wrap('', suffix);

			return this;
		},
		end : function( deep ) {
			var i,
			howDeep = 1;

			if ( isNumber( deep ) ) {
				howDeep = deep; 
			} 

			for( i = 0; i < howDeep ; i += 1 ){
				this.prefixes.pop();
				this.suffixes.shift();
			} 

			return this;
		}
	}

	exports.stringBuilder = strBuilder;

}(exports));