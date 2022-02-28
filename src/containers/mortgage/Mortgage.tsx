import { Grid, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import RequiredMortgage from "../../components/RequiredMortgage/RequiredMortgage";

function Mortgage() {
  const [askingPrice, setAskingPrice] = useState(0);
  const initDownPaymentPercentages = [6.75, 10, 15, 20];

  const handleAskingPriceChange = (event: ChangeEvent<any>) => {
    setAskingPrice(event.target.value);
  };

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
            <Grid item>Totoal Mortgage Required</Grid>
          </Grid>
        </Grid>
        {initDownPaymentPercentages.map((downPaymentPercentage) => (
          <Grid item xs={2.5} key={downPaymentPercentage}>
            <RequiredMortgage
              initDownPaymentPercentage={downPaymentPercentage}
              askingPrice={askingPrice}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Mortgage;
