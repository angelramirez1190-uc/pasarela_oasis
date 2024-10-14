import { ControllerProps, ObjectList } from "@/app/interfaces/interfaces";
import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface SelectController extends ControllerProps {
  label?: string;
  options?: ObjectList[];
}

export default function SelectController({
  control,
  required = true,
  name,
  props = {},
  label,
  errors,
  options,
}: SelectController) {
  return (
    <Grid2 size={{ xs: 12 }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
              id={name}
              onChange={(e) => field.onChange(e.target.value)}
              variant="outlined"
              value={field.value}
              size="small"
              {...props}
            >
              {options &&
                options.map((item) => (
                  <MenuItem key={item.id} value={item?.id}>
                    {item?.value}
                  </MenuItem>
                ))}
            </Select>
            {errors[name] && (
              <FormHelperText>{errors[name].message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Grid2>
  );
}
