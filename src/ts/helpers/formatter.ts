export class Formatter {
    formatTime(seconds: number) {
        let minute = Math.floor(seconds / 60);
        let second = Math.floor(seconds % 60);
        return `${this.pad(minute)}:${this.pad(second)}`;
    }

    private pad(number, padding="00") {
        let str = number.toString();
        return padding.substring(0, padding.length - str.length) + str;
    }
}