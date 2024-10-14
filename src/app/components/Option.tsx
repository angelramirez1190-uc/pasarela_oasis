import { Grid2, Typography } from "@mui/material";

interface ListOptionProp {
  id: number;
  name: string;
  disabled?: any;
}

type OptionProps = Readonly<{
  setOptionSelected: (option: number) => void;
  optionSelected: number;
  option: ListOptionProp;
}>;

export default function Option({
  option,
  optionSelected,
  setOptionSelected,
}: OptionProps) {
  return (
    <Grid2
      container
      size={{ xs: 10, md: 2 }}
      justifyContent="space-around"
      alignItems="center"
      py={1}
      onClick={() => {
        if (!option?.disabled?.ref) {
          return;
        }
        setOptionSelected(option?.id);
      }}
    >
      <Grid2
        bgcolor={optionSelected == option?.id ? "#377cac" : "#a3a3a3"}
        color={"#FFF"}
        size={{ xs: 2 }}
        borderRadius="10rem"
      >
        <Typography variant="h5" textAlign="center" fontWeight={701}>
          {option?.id}
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body2">{option?.name}</Typography>
      </Grid2>
    </Grid2>
  );
}
