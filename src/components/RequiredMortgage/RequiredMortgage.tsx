import { Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Utils } from "../../utils/utils";

interface RequiredMortgageProps {
  initDownPaymentPercentage: number;
  askingPrice: number;
  index: number;
  onTotalMortgageUpdate?: (totalMortgage: number, index: number) => void;
}

function RequiredMortgage(props: RequiredMortgageProps) {
  const {
    initDownPaymentPercentage,
    askingPrice,
    index,
    onTotalMortgageUpdate,
  } = props;
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(
    initDownPaymentPercentage
  );
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);
  const [mortgageInsurance, setMortgageInsurance] = useState(0);
  const [totalMortgage, setTotalMortgage] = useState(0);

  useEffect(() => {
    // Update Downpayment
    setDownPaymentAmount(
      getDownPaymentAmount(askingPrice, downPaymentPercentage)
    );
  }, [askingPrice, downPaymentPercentage]);

  // Update Mortgage Insurance
  useEffect(() => {
    const mortgageInsurance = getMortgageInsurance(
      askingPrice,
      downPaymentAmount
    );
    setMortgageInsurance(mortgageInsurance);
  }, [downPaymentAmount]);

  // Update Total Mortgage required
  useEffect(() => {
    const totalMortgage = getTotalMortgage(
      askingPrice,
      downPaymentAmount,
      mortgageInsurance
    );
    if (totalMortgage) {
      setTotalMortgage(totalMortgage);
      onTotalMortgageUpdate && onTotalMortgageUpdate(totalMortgage, index);
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

  const getMortgageInsurance = (askingPrice: number, downPayment: number) => {
    const loanAmount = askingPrice - downPaymentAmount;
    const cmhcPremium = calCmhcPremium(askingPrice, downPayment);
    return Utils.round(loanAmount * cmhcPremium);
  };

  // Caluclations taken from CMHC website
  // Refer https://www.cmhc-schl.gc.ca/en/consumers/home-buying/calculators/mortgage-calculator
  const calCmhcPremium = (askingPrice: number, downPaymentAmount: number) => {
    const loanAmount = askingPrice - downPaymentAmount;
    if (downPaymentAmount >= askingPrice * 0.2) {
      return 0;
    }
    const premiumRate = loanAmount / askingPrice;
    if (premiumRate <= 0.65) {
      return 0.006;
    }
    if (premiumRate <= 0.75) {
      return 0.017;
    }
    if (premiumRate <= 0.8) {
      return 0.024;
    }
    if (premiumRate <= 0.85) {
      return 0.028;
    }
    if (premiumRate <= 0.9) {
      return 0.031;
    }
    if (premiumRate <= 0.95) {
      return 0.04;
    }
    return 0;
  };

  const getTotalMortgage = (
    askingPrice: number,
    downPayment: number,
    insurance: number
  ) => {
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
