"use strict";
var generics;
(function (generics) {
    /* Interface contraints */
    function getProperty(obj, key) {
        return obj[key];
    }
    function loggingIdentity(arg) {
        // Using extends allows us to constrain the generic type.
        console.log(arg.length);
        return arg;
    }
    function processNumKeyPairs(key, value) {
        console.log('processNumKeyPairs: key = ' + key + ', value = ' + value);
    }
    function processStringKeyPairs(key, value) {
        console.log('processStringKeyPairs: key = ' + key + ', value = ' + value);
    }
    let numKVProcessor = processNumKeyPairs;
    numKVProcessor(1, 12345); //Output: processNumKeyPairs: key = 1, value = 12345
    let strKVProcessor = processStringKeyPairs;
    strKVProcessor(1, 'Bill'); //Output: processStringKeyPairs: key = 1, value = Bill
})(generics || (generics = {}));
//# sourceMappingURL=generics.js.map