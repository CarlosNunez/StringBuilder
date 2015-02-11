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
			var args = Array.prototype.slice.call(arguments),
			i,
			len = args.length,
			value;

			for ( i = 0; i < len ; i += 1 ) {
				value = args[i];
				this.buffer.push(value)

			}
			return this;
		}

	}

	exports.stringBuilder = strBuilder;

}(exports));