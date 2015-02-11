(function (exports){
	"use strict";

	var strBuilder = function(){
		this.buffer = [];
	},

    isArray = function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },

    isFunction = function(value) {
        return typeof value === "function";
    },

    isNumber = function(n) {
    	return typeof n === "number" && isFinite(n);
    }
 

	strBuilder.prototype = {
		cat : function() {
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

		}
	}

	exports.stringBuilder = strBuilder;

}(exports));