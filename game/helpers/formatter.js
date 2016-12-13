"use strict";
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.prototype.formatTime = function (seconds) {
        var minute = Math.floor(seconds / 60);
        var second = Math.floor(seconds % 60);
        return this.pad(minute) + ":" + this.pad(second);
    };
    Formatter.prototype.pad = function (number, padding) {
        if (padding === void 0) { padding = "00"; }
        var str = number.toString();
        return padding.substring(0, padding.length - str.length) + str;
    };
    return Formatter;
}());
exports.Formatter = Formatter;
