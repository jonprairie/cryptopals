'use strict';

String.prototype.CountChar = function(c) {
    return this
	.split('')
	.filter((x) => x == c)
	.length;
};

Array.prototype.sum = function() { return this.reduce((x, y) => x+y); };

var HexEngine = require('./hexdecode');
var XorEngine = require('./xorengine');

function ScoreMsg(msg) {

    var good_chars = ['r', 's', 't', 'l', 'n', 'e'],
        bad_chars = ['!', '"', '#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '~', ']', '^', '_', '`', '{', '}', '|', '\''];

    var score =
	good_chars.map(String.prototype.CountChar.bind(msg)).sum() -
	bad_chars.map(String.prototype.CountChar.bind(msg)).sum();

    return score;
}

function Main (input_hex, num_results=5) {
    var decoded_input = new HexEngine(input_hex);
    
    var candidate_messages = [];

    for(var i = 0; i < 256; ++i) {
	var decrypted_input = decoded_input.raw.map((b) => b ^ i);
	var hex_decrypted_input = new HexEngine(decrypted_input.toString('hex'));
	
	if (hex_decrypted_input.ascii) {
	    candidate_messages.push(hex_decrypted_input.ascii);
	} 
    }

    return candidate_messages
	.sort((m1, m2) => ScoreMsg(m2) - ScoreMsg(m1))
	.slice(0, num_results);
}

module.exports = { Main, ScoreMsg };

if (process.argv[2]) {
    var results = Main(process.argv[2]);
    console.log(results);
}
