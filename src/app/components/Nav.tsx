import { Grid2, Typography } from "@mui/material";

export default function Nav() {
  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      py={3}
      alignItems="center"
    >
      <Grid2>
        <Typography variant="h5">Hotel Oasis</Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body2">Pasarela de pago</Typography>
      </Grid2>
    </Grid2>
  );
}
