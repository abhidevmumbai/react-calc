import { Grid, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

function Mortgage() {
  const [askingPrice, setAskingPrice] = useState(null);

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
          Particulars
        </Grid>
        <Grid item xs={2.5}>
          6.75%
        </Grid>
        <Grid item xs={2.5}>
          10%
        </Grid>
        <Grid item xs={2.5}>
          15%
        </Grid>
        <Grid item xs={2.5}>
          20%
        </Grid>
      </Grid>
    </div>
  );
}

export default Mortgage;
