export class Utils {
  // This simple method rounds a number to two decimal places.
  static round(x: number): number {
    return Math.round(x * 100) / 100;
  }
}
