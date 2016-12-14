/// <reference path="../../../node_modules/@types/google.analytics/index.d.ts" />

export var gaNewElem: any = {};
export var gaElems: any = {};

export class GATracker {
    constructor() {
        this.gaInit();
        ga('create', 'UA-88964747-1', 'auto');
    }

    sendPageView() {
        ga('send', 'pageview');
    }

    private gaInit() {
        var currdate: any = new Date();

        /* tslint:disable:no-string-literal */
        /* tslint:disable:semicolon */
        /* tslint:disable:no-unused-expression */
        // This code is from Google, so let's not modify it too much, just add gaNewElem and gaElems:
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * currdate;
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga', gaNewElem, gaElems);
        /* tslint:enable:no-unused-expression */
        /* tslint:enable:semicolon */
        /* tslint:enable:no-string-literal */
    }

}
