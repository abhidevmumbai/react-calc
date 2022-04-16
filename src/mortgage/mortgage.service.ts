import { MortgageFrequency } from "./types";

export default class MortgageService {
  static getPaymentFrequency(frequency: MortgageFrequency) {
    switch (frequency) {
      case MortgageFrequency.MONTHLY:
        return 12;
      case MortgageFrequency.BI_WEEKLY:
        return 26;
      case MortgageFrequency.WEEKLY:
      default:
        return 52;
    }
  }
}
