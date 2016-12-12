"use strict";
var RandomGenerator = (function () {
    function RandomGenerator() {
    }
    RandomGenerator.prototype.generateRandom = function (number, allowNegative) {
        if (allowNegative === void 0) { allowNegative = false; }
        return Math.ceil((Math.random() - (allowNegative ? 0.5 : 0)) * number + 1);
    };
    return RandomGenerator;
}());
exports.RandomGenerator = RandomGenerator;
