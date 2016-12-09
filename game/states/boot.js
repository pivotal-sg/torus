"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.apply(this, arguments);
        this.fontsLoaded = false;
    }
    Boot.prototype.init = function () {
        var _this = this;
        window['WebFontConfig'] = {
            active: function () { return _this.fontsLoaded = true; },
            google: { families: ['VT323'] }
        };
    };
    Boot.prototype.preload = function () {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    };
    Boot.prototype.create = function () {
        var fontStyle = {
            font: '12px Courier',
            fill: '#7edcfc'
        };
        this.preLoadingText = this.add.text(this.world.centerX, this.world.centerY, 'Loading fonts...', fontStyle);
        this.preLoadingText.anchor.setTo(0.5);
        this.game.input.maxPointers = 1;
        this.game.antialias = false;
        this.stage.disableVisibilityChange = false;
        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
        }
    };
    Boot.prototype.update = function () {
        if (this.fontsLoaded) {
            this.game.state.start('Loading');
        }
    };
    return Boot;
}(Phaser.State));
exports.Boot = Boot;
