export class RandomGenerator {
    generateRandom(number: number, allowNegative = false) {
        return Math.ceil((Math.random() - (allowNegative ? 0.5 : 0)) * number + 1);
    }
}
