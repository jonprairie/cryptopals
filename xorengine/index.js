'use strict';
var j = require('util');
class xor {
	constructor (x, y, k = false) {
		this.one = x;
		this.two = y;
		this.key = k;
		this.result = null;
	}
	calculate () {
		console.log(j.inspect(this));
		var o = [];
		for (var i = 0; i < this.one.raw.length; i++) {
			o.push(this.one.raw[i] ^ this.two.raw[i]);
		}

		this.result = Buffer.from(o);
	}
}

module.exports = xor;