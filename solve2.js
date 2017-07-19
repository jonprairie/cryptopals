var hexdecoder = require('./hexdecode');
var xorengine = require('./xorengine');

var value1 = new hexdecoder('1c0111001f010100061a024b53535009181c');
var value2 = new hexdecoder('686974207468652062756c6c277320657965');

var xe = new xorengine(value1, value2);

xe.calculate();

console.log(xe.result);

var endr = new hexdecoder(xe.result.toString('hex'));

console.log(endr);
