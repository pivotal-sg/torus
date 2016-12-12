import {expect} from 'chai';
import {RandomGenerator} from '../../src/ts/helpers/random_generator';

describe('Random Generator', () => {
    it('generates a different number each time', () => {
        const generator = new RandomGenerator();
        expect(generator.generateRandom(100)).not.equal(generator.generateRandom(100));
    });
});