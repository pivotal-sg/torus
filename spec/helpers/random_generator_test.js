/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
"use strict";
var chai_1 = require('chai');
var app_1 = require('../../src/ts/app');
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('Hello function', function () {
    it('should return hello world', function () {
        var result = "Hello World!";
        chai_1.expect(result).to.equal('Hello World!');
        var game = new app_1.App();
        chai_1.expect(game).to.not.equal(null);
    });
});
