'use strict';
String.prototype.count=function(s1) { 
    return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
}

var HexEngine = require('./hexdecode');
var XorEngine = require('./xorengine');

if (process.argv[2]) {
	//console.log(process.argv);
	var _cfcl = true;
	Main (process.argv[2]);
}

function Main (input_hex) {
	var value1 = new HexEngine(input_hex);
	

	var i = 0;
	var accr = [];
	var bestr = '';
	var cbest = 0;

	function Score (text) {
		var counted = (
			text.count('r')+
			text.count('s')+
			text.count('t')+
			text.count('l')+
			text.count('n')+
			text.count('e')-
			text.count('!')-
			text.count('"')-
			text.count('#')-
			text.count('$')-
			text.count('%')-
			text.count('&')-
			text.count('\'')-
			text.count('\\(')-
			text.count('\\)')-
			text.count('\\*')-
			text.count('\\+')-
			text.count('\\,')-
			text.count('\\-')-
			text.count('\\.')-
			text.count('\\/')-
			text.count('\\:')-
			text.count('\\;')-
			text.count('\\<')-
			text.count('\\=')-
			text.count('\\>')-
			text.count('\\?')-
			text.count('\\@')-
			text.count('\\~')-
			text.count('\\]')-
			text.count('\\^')-
			text.count('\\_')-
			text.count('\\`')-
			text.count('\\{')-
			text.count('\\}')-
			text.count('\\|')




		);
		if (counted > cbest) {
			bestr = text;
			cbest = counted; 
		}
	}

	while (i < 256) {
		var z = [];
		var ThisKey = Buffer.from([i]);
		for (var j = 0; j <= value1.raw.length; j++) {
			var p = value1.raw[j] ^ ThisKey[0];
			z.push(p);
			
		}
		var w = new HexEngine((Buffer.from(z)).toString('hex'));
		if (w.ascii) {
			accr.push(w.ascii);
			Score(w.ascii);
		} 

		i++;
	}
	function listall (l) {
		for (var _i = 0; _i <= l.length; _i++) {
			console.log((Buffer.from(l[_i])).toString('hex'));
		}
	}
	console.log(bestr);
	return accr;
	//listall(accr);
}
module.exports = Main;