import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Utils } from "../shared";

interface MortgagePaymentProps {
  amortizationPeriods: number[];
  totalMortgage: number;
}

export function MortgagePayment(props: MortgagePaymentProps) {
  const { amortizationPeriods, totalMortgage } = props;
  const [amortizationPeriod, setAmortizationPeriod] = useState(
    amortizationPeriods[4]
  );
  const [mortgageRate, setMortgageRate] = useState<number>(3);
  const [mortgagePayment, setMortgagePayment] = useState(0);

  useEffect(() => {
    setMortgagePayment(
      getMortgagePayment(totalMortgage, amortizationPeriod, mortgageRate)
    );
  }, [totalMortgage, amortizationPeriod, mortgageRate]);

  const handleAmortizationPeriodChnage = (event: SelectChangeEvent<any>) => {
    setAmortizationPeriod(parseInt(event.target.value));
  };

  const handleMortgageRateChange = (event: ChangeEvent<any>) => {
    setMortgageRate(parseInt(event.target.value));
  };

  //   refer https://www.thebalance.com/calculate-mortgage-315668
  const getMortgagePayment = (amount: number, period: number, rate: number) => {
    console.log("getMortgagePayment", amount, period, rate);
    // const totalPayments = 12 * period;
    // const rateOfInterest = rate / 12;
    // const perMonthPayment =
    //   amount *
    //   (rateOfInterest +
    //     (rateOfInterest / Math.pow(1 + rateOfInterest, totalPayments) - 1));
    // return perMonthPayment;
    const paymentsPerYear = 12;
    // var effective_rate = nominal_to_effective(rate, paymentsPerYear);
    // var nominal_rate = effective_to_nominal(effective_rate, paymentsPerYear);
    var totalPayments = paymentsPerYear * period;
    // var perMonthPayment =
    //   amount *
    //   (nominal_rate +
    //     nominal_rate / (Math.pow(1 + nominal_rate, totalPayments) - 1));
    // console.log(
    //   "cal",
    //   nominal_rate,
    //   effective_rate,
    //   amount,
    //   perMonthPayment,
    //   totalPayments
    // );
    // return perMonthPayment;
    // Now compute the monthly payment figure, using esoteric math.
    var x = Math.pow(1 + rate, totalPayments);
    const perMonthPayment = Utils.round((amount * x * rate) / (x - 1));
    const totalLoanPayment = Utils.round(perMonthPayment * totalPayments);
    const totalInterest = Utils.round(perMonthPayment * totalPayments - amount);
    console.log(x, perMonthPayment, totalLoanPayment, totalInterest);
    return perMonthPayment;
  };

  const nominal_to_effective = (
    nominal_rate: number,
    periods_per_year: number
  ) => {
    var effective_rate =
      Math.pow(1 + nominal_rate / periods_per_year, periods_per_year) - 1;

    return effective_rate;
  };

  const effective_to_nominal = (
    effective_rate: number,
    periods_per_year: number
  ) => {
    var nominal_rate =
      periods_per_year *
      (Math.pow(effective_rate + 1, 1 / periods_per_year) - 1);

    return nominal_rate;
  };

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Select
          value={amortizationPeriod}
          onChange={handleAmortizationPeriodChnage}
        >
          {amortizationPeriods.map((period) => (
            <MenuItem value={period} key={period}>
              {period}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <TextField value={mortgageRate} onChange={handleMortgageRateChange} />
      </Grid>
      <Grid item>5 year fixed</Grid>
      <Grid item>{mortgagePayment}</Grid>
    </Grid>
  );
}
