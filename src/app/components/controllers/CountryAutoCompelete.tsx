import { Autocomplete, Box, Grid2, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { countries } from "../utils/countryList"; // Ensure this is correctly populated
import { ControllerProps } from "@/app/interfaces/interfaces";

interface AutoCompleteCountryProps extends ControllerProps {
  showFlagAndIndicative?: boolean;
  label?: string;
}

export default function CountryAutoCompelete({
  control,
  required = true,
  name,
  label,
  errors,
  props = {},
  showFlagAndIndicative = true,
}: AutoCompleteCountryProps) {
  return (
    <Grid2 container size={{ xs: 12 }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, value, ...field } }) => (
          <Autocomplete
            {...field}
            {...props}
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            size="small"
            getOptionLabel={(option) =>
              option
                ? showFlagAndIndicative
                  ? `${option.label} (+${option.phone})`
                  : option.label
                : ""
            }
            isOptionEqualToValue={(option, value) =>
              option.label === value?.label
            }
            onChange={(e, newValue) => onChange(newValue)}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                {showFlagAndIndicative && (
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                )}
                {option.label}
                {showFlagAndIndicative && ` (${option.code}) +${option.phone}`}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputProps={{
                  ...params.inputProps,
                }}
                // Display selected flag and indicative in the input when a country is selected
                InputProps={{
                  ...params.InputProps,
                  startAdornment:
                    value && showFlagAndIndicative ? (
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${value.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${value.code.toLowerCase()}.png`}
                        alt={value.label}
                        style={{ marginRight: 8 }}
                      />
                    ) : null,
                }}
                error={!!errors?.[name]}
                helperText={errors?.[name]?.message}
              />
            )}
            value={value || null}
          />
        )}
      />
    </Grid2>
  );
}
