"use strict";
let userInput;
let userName; // username = userInput Not valid.
if (typeof userInput === 'string') {
    userName = userInput;
}
function thowError(message, code) {
    throw { message: message, errorCode: code };
}
thowError('error', 3);
//# sourceMappingURL=specialTypes.js.map