// deobfuscates any obfuscated utf8 string
// uses atob() for base64 decoding, which is not supported by IE
var Obfuscate = {
  base64_decode: function(s) {
    var bytes = [],
        b = atob(s),
        n = b.length, i;
    for(i = 0; i < n; i++) {
      bytes.push(b.charCodeAt(i));
    }
    return bytes;
  },
  deobfuscate: function(s) {
    var hex = [],
        bytes = this.base64_decode(s),
        n = bytes.length, i;
    for(i = 0; i+1 < n; i += 2) {
      hex.push('%'+(bytes[i]^bytes[i+1]).toString(16));
    }

    return decodeURIComponent(hex.join(''));
  }
};
//Unobfuscate the email
YUI().use('node', 'event-base', function (Y) {
    Y.on('domready', function () {
	var email_nodes = Y.all('.bl-email');
	email_nodes.each(function (email_node) {
	    var obfuscated_email = email_node.getAttribute('data-email');
	    var email = Obfuscate.deobfuscate(obfuscated_email);
	    if(!email_node.get('text'))
		email_node.set('text', email); 
	    email_node.set('href', 'mailto:' + email);
	});
    });
});
