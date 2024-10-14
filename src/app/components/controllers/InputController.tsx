import { ControllerProps } from "@/app/interfaces/interfaces";
import { Grid2, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputControllerProps extends ControllerProps {
  fullWidth?: boolean;
}

export default function InputController({
  control,
  required = true,
  name,
  props = {},
  errors,
  fullWidth = true,
}: InputControllerProps) {
  return (
    <Grid2 size={{ xs: 12 }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <TextField
            {...field}
            {...props}
            fullWidth={fullWidth}
            size="small"
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </Grid2>
  );
}
