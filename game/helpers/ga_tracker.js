"use strict";
exports.gaNewElem = {};
exports.gaElems = {};
var GATracker = (function () {
    function GATracker() {
        this.gaInit();
        ga('create', 'UA-88964747-1', 'auto');
    }
    GATracker.prototype.sendPageView = function () {
        ga('send', 'pageview');
    };
    GATracker.prototype.gaInit = function () {
        var currdate = new Date();
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * currdate;
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga', exports.gaNewElem, exports.gaElems);
    };
    return GATracker;
}());
exports.GATracker = GATracker;
