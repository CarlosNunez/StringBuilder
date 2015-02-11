(function (exports){
	"use strict";

	var strBuilder = function(){
		this.buffer = [],
		this.builtString;
	},

    is_array = function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },

    is_function = function(value) {
        return typeof value === "function";
    };
 

	strBuilder.prototype = {
		cat : function() {
			var len = arguments.length,
		i,
		value,
		result;
		for ( i = 0; i < len ; i += 1 ) {
			value = arguments[i];

			if( is_function(value) ){				
				result = value.apply(this);
				this.cat.call(this, result);

			}else if( is_array(value) ) {
				this.cat.apply(this, value); 
			}else {
				this.buffer.push(value);
			}
		}

		return this;
		}
	}

	exports.stringBuilder = strBuilder;

}(exports));