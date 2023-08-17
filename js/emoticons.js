(function($, exports, window, name) {

if (!exports) {
    exports = {};
    if ($) {
        $[name] = exports;
    } else {
        window[name] = exports;
    }
}
var emoticons,
    codesMap = {},
    primaryCodesMap = {},
    regexp,
    metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g,
    entityMap;

entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
};

function escape(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}

/**
 * 
 *
 * @param {Object} data
 */
exports.define = function(data) {
    var name, i, codes, code,
        patterns = [];

    for (name in data) {
        codes = data[name].codes;
        for (i in codes) {
            code = codes[i];
            codesMap[code] = name;

            
            
            codesMap[escape(code)] = name;
            if (i == 0) {
                primaryCodesMap[code] = name;
            }
        }
    }

    for (code in codesMap) {
        patterns.push('(' + code.replace(metachars, "\\$&") + ')');
    }

    regexp = new RegExp(patterns.join('|'), 'g');
    emoticons = data;
};

exports.replace = function(text, fn) {
    return text.replace(regexp, function(code) {
        var name = codesMap[code];
        return (fn || exports.tpl)(name, code, emoticons[name].title);
    });
};

}(typeof jQuery != 'undefined' ? jQuery : null,
  typeof exports != 'undefined' ? exports : null,
  window,
  'emoticons'));
