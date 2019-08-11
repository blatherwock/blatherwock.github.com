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
document.addEventListener('DOMContentLoaded', function(event) {
  var elements = document.getElementsByClassName('bl-email');
  for (let item of elements) {
    var obfuscated_email = item.getAttribute('data-email');
    var email = Obfuscate.deobfuscate(obfuscated_email);
    item.setAttribute('href', 'mailto:' + email);
  }
});

toggleParagraphVisibility = function(paraID) {
  var selected_paragraph = document.getElementById(paraID);
  var is_open = selected_paragraph.className === "show";
  var all_paragraphs = document.getElementsByTagName('p');
  // hide all the other paragraphs
  for (let paragraph of all_paragraphs) {
    paragraph.className = "";
  }

  // toggle the selected one
  if (is_open) {
    selected_paragraph.className = "";
  } else {
    selected_paragraph.className = "show"
  }
};
