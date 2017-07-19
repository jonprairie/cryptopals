//hex string decoder
'use strict';

class hex2b64 {
	constructor (hex) {
		this.hex = hex;
		//console.warn(`HD:${hex}`);
		this.raw = (new Buffer(hex, 'hex'));
		this.base64 = (new Buffer(hex, 'hex')).toString('base64');
		try {
			this.ascii = ((new Buffer(hex, 'hex')).toString('ascii')).slice(0,-1);
			for (var i = 0; i < this.ascii.length; i++) {
				if ((new Buffer(hex, 'hex'))[i] < 32 || (new Buffer(hex, 'hex'))[i] > 126) {
					throw new RangeError;
				} 
			}
		} catch (err) {
			this.ascii = false;
		}


		this.utf8 = (new Buffer(hex, 'hex')).toString('utf8');

	}

}

module.exports = hex2b64;