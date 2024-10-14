import { Checkbox, FormControlLabel, Grid2 } from "@mui/material";

export default function Tyc() {
  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      py={3}
      alignItems="center"
    >
      <FormControlLabel
        value="end"
        control={<Checkbox />}
        label="Acepto terminos y condiciones del servicio"
        labelPlacement="end"
      />
      <FormControlLabel
        value="end"
        control={<Checkbox />}
        label="Autorizo el tratamiento de mis datos personales"
        labelPlacement="end"
      />
    </Grid2>
  );
}
