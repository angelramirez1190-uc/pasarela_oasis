import { Controller } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { ControllerProps } from "@/app/interfaces/interfaces";
import { FormHelperText, Grid2 } from "@mui/material";

export default function DateController({
  control,
  required = true,
  name,
  errors,
  props = {},
}: ControllerProps) {
  return (
    <Grid2 size={{ xs: 12 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          rules={{ required: required }}
          render={({ field: { onChange, value, ...restField } }) => (
            <DatePicker
              label="Month and Year"
              views={["year", "month"]}
              openTo="year"
              value={value || null}
              onChange={(newValue) => {
                onChange(newValue);
              }}
              {...restField}
              {...props}
            />
          )}
        />
        {errors[name] && (
          <FormHelperText>{errors[name].message}</FormHelperText>
        )}
      </LocalizationProvider>
    </Grid2>
  );
}
