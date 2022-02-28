import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

interface MortgagePaymentProps {
  amortizationPeriods: number[];
  totalMortgage: number;
}

function MortgagePayment(props: MortgagePaymentProps) {
  const { amortizationPeriods, totalMortgage } = props;
  const [amortizationPeriod, setAmortizationPeriod] = useState(
    amortizationPeriods[0]
  );
  const [mortgageRate, setMortgageRate] = useState(0);
  const [mortgagePayment, setMortgagePayment] = useState(0);

  useEffect(() => {
    setMortgagePayment(
      getMortgagePayment(totalMortgage, amortizationPeriod, mortgageRate)
    );
  }, [totalMortgage, amortizationPeriod, mortgageRate]);

  const handleAmortizationPeriodChnage = (event: SelectChangeEvent<any>) => {
    setAmortizationPeriod(event.target.value);
  };

  const handleMortgageRateChange = (event: ChangeEvent<any>) => {
    setMortgageRate(event.target.value);
  };

  //   refer https://www.thebalance.com/calculate-mortgage-315668
  const getMortgagePayment = (amount: number, period: number, rate: number) => {
    const totalMonths = period * 12;
    const perMonthPayment = (amount / period) * 12;
    const perMonthPaymentWithInterest =
      perMonthPayment + (perMonthPayment * rate) / 100;
    return perMonthPaymentWithInterest;
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

export default MortgagePayment;
