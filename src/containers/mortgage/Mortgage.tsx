import { Grid, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import MortgagePayment from "../../components/MortgagePayment/MortgagePayment";
import RequiredMortgage from "../../components/RequiredMortgage/RequiredMortgage";

interface Mortgages {
  downPaymentPercentage: number;
}

function Mortgage() {
  const [askingPrice, setAskingPrice] = useState(0);
  const [totalMortgageRequired, setTotalMortgageRequired] = useState<number[]>(
    []
  );
  const initDownPaymentPercentages = [6.75, 10, 15, 20];
  const amortizationPeriods = [5, 10, 15, 20, 25, 30];

  const handleAskingPriceChange = (event: ChangeEvent<any>) => {
    setAskingPrice(event.target.value);
  };

  const onTotalMortgageUpdate = (totalMortgage: number, index: number) => {
    totalMortgageRequired[index] = totalMortgage;
    setTotalMortgageRequired(totalMortgageRequired);
  };

  useEffect(() => {
    console.log("totalMortgageRequired", totalMortgageRequired);
  }, [totalMortgageRequired]);

  return (
    <div className="mortgage">
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={2} textAlign={"right"}>
          Asking Price
        </Grid>
        <Grid item xs={10} textAlign={"left"}>
          <TextField value={askingPrice} onChange={handleAskingPriceChange} />
        </Grid>
        {/* Row 1 */}
        <Grid item xs={2}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item></Grid>
            <Grid item>Down Payment</Grid>
            <Grid item></Grid>
            <Grid item></Grid>
            <Grid item>Mortgage Insurance</Grid>
            <Grid item>Total Mortgage Required</Grid>
          </Grid>
        </Grid>
        {initDownPaymentPercentages.map((downPaymentPercentage, index) => (
          <Grid item xs={2.5} key={index}>
            <RequiredMortgage
              initDownPaymentPercentage={downPaymentPercentage}
              askingPrice={askingPrice}
              onTotalMortgageUpdate={onTotalMortgageUpdate}
              index={index}
            />
          </Grid>
        ))}
        {/* Row 1 */}

        {/* Row 2 */}
        <Grid item xs={2}>
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid item></Grid>
            <Grid item>Amortization period</Grid>
            <Grid item></Grid>
            <Grid item>Mortgage rate</Grid>
            <Grid item>Mortgage type</Grid>
            <Grid item>Total Mortgage Payment</Grid>
          </Grid>
        </Grid>
        {initDownPaymentPercentages.map((downPaymentPercentage, index) => (
          <Grid item xs={2.5} key={index}>
            <MortgagePayment
              amortizationPeriods={amortizationPeriods}
              totalMortgage={totalMortgageRequired[index]}
            />
          </Grid>
        ))}
        {/* Row 2 */}
      </Grid>
    </div>
  );
}

export default Mortgage;
