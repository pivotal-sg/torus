import {expect} from 'chai';
import {Formatter} from "../../src/ts/helpers/formatter";

describe('Formatter', () => {
    let formatter: Formatter;

    beforeEach(() => {
        formatter = new Formatter();
    });

    describe('given time as seconds', () => {
        it('format time as mm:ss', () => {
            expect(formatter.formatTime(33)).to.equal('00:33');
            expect(formatter.formatTime(33.33)).to.equal('00:33');
            expect(formatter.formatTime(93)).to.equal('01:33');
            expect(formatter.formatTime(6000)).to.equal('100:00');
        })
    })
});
