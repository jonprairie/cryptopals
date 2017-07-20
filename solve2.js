var hexdecoder = require('./hexdecode');
var xorengine = require('./xorengine');
try {

var value1 = new hexdecoder(process.argv[2]);
var value2 = new hexdecoder(process.argv[3]);
} catch (e) {
	console.error(`USAGE: program <hex ciphertext> <hex key>`);
	process.exit(255);
}
var xe = new xorengine(value1, value2);

xe.calculate();

console.log(xe.result);

var endr = new hexdecoder(xe.result.toString('hex'));

console.log(endr);
