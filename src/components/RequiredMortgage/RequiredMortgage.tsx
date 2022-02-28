import { Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

interface RequiredMortgageProps {
  initDownPaymentPercentage: number;
  askingPrice: number;
  onTotalMortgageUpdate?: (totalMortgage: number) => void;
}

function RequiredMortgage(props: RequiredMortgageProps) {
  const { initDownPaymentPercentage, askingPrice, onTotalMortgageUpdate } =
    props;
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(
    initDownPaymentPercentage
  );
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);
  const [mortgageInsurance, setMortgageInsurance] = useState(0);
  const [totalMortgage, setTotalMortgage] = useState(0);

  useEffect(() => {
    setDownPaymentAmount(
      getDownPaymentAmount(askingPrice, downPaymentPercentage)
    );
  }, [askingPrice, downPaymentPercentage]);

  useEffect(() => {
    setMortgageInsurance(
      getMortgageInsurance(
        askingPrice,
        downPaymentAmount,
        downPaymentPercentage
      )
    );
  }, [downPaymentAmount]);

  useEffect(() => {
    const totalMortgage = getTotalMortgage(
      askingPrice,
      downPaymentAmount,
      mortgageInsurance
    );
    if (totalMortgage) {
      setTotalMortgage(totalMortgage);
      onTotalMortgageUpdate && onTotalMortgageUpdate(totalMortgage);
    }
  }, [mortgageInsurance]);

  const handleDownPaymentPercentageChange = (event: ChangeEvent<any>) => {
    setDownPaymentPercentage(event.target.value);
  };

  const getDownPaymentAmount = (
    askingPrice: number,
    percentage: number
  ): number => {
    return (askingPrice * percentage) / 100;
  };

  const getMortgageInsurance = (
    askingPrice: number,
    downPayment: number,
    percentage: number
  ) => {
    if (percentage >= 5 && percentage < 10) {
      return ((askingPrice - downPayment) * 4) / 100;
    }
    if (percentage >= 10 && percentage < 15) {
      return ((askingPrice - downPayment) * 3.1) / 100;
    }
    if (percentage >= 15 && percentage < 20) {
      return ((askingPrice - downPayment) * 2.8) / 100;
    }
    return 0;
  };

  const getTotalMortgage = (
    askingPrice: number,
    downPayment: number,
    insurance: number
  ) => {
    console.log(askingPrice, downPayment, insurance);
    return askingPrice - downPayment + insurance;
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
        <TextField
          value={downPaymentPercentage}
          onChange={handleDownPaymentPercentageChange}
        />
      </Grid>
      <Grid item>{downPaymentAmount}</Grid>
      <Grid item>{mortgageInsurance}</Grid>
      <Grid item>{totalMortgage}</Grid>
    </Grid>
  );
}

export default RequiredMortgage;
