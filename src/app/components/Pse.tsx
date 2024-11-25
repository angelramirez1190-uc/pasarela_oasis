import { Box, Button, Grid2, Typography } from "@mui/material";

import { banks } from "./utils/utils";
import { useForm } from "react-hook-form";
import InputController from "./controllers/InputController";

import SelectController from "./controllers/SelectController";
import CountryAutoCompelete from "./controllers/CountryAutoCompelete";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Tyc from "./Tyc";

export interface FormDataPse {
  name: string;
  document_type: number;
  bank: number;
  document_number: number;
  email: string;
  indicative: object;
  phone: number;
  address: string;
  franchise?: string;
  id?: number | string | undefined;
  total_reserva?: number | string | undefined;
  checkin?: string | number | undefined;
  checkout?: string | number | undefined;
}
export interface PseProps {
  handlePay: (arg0: FormDataPse) => void;
  setOptionSelected: (arg0: number) => void;
}

export default function Pse({ handlePay, setOptionSelected }: PseProps) {
  const schema = yup
    .object({
      name: yup.string().required(),
      document_type: yup.number().required(),
      bank: yup.number().required(),
      document_number: yup.number().integer().required(),
      email: yup.string().required(),
      indicative: yup.object().required(),
      phone: yup.number().integer().required(),
      address: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataPse>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const documentType = [
    {
      id: 1,
      value: "CC",
    },
    {
      id: 2,
      value: "CE",
    },
    {
      id: 3,
      value: "PA",
    },
  ];

  const onSubmit = (data: FormDataPse) => {
    const json = {
      ...data,
      franchise: "PSE",
    };
    handlePay(json);
  };

  return (
    <Box>
      <Typography
        onClick={() => setOptionSelected(1)}
        mb={1}
        textAlign="end"
        fontStyle="italic"
        color="#377cac"
        style={{ cursor: "pointer" }}
      >
        Cambiar el metodo de pago
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container size={{ xs: 12 }} mb={2}>
          <SelectController
            control={control}
            name="bank"
            errors={errors}
            options={banks}
            label="Bancos"
          />
        </Grid2>
        <InputController
          errors={errors}
          control={control}
          name="name"
          props={{ label: "Nombre comprador" }}
        />

        <Grid2
          container
          size={{ xs: 12 }}
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Grid2 container size={{ xs: 3 }}>
            <SelectController
              errors={errors}
              control={control}
              name="document_type"
              label="Documento"
              options={documentType}
            />
          </Grid2>
          <Grid2 container size={{ xs: 8 }}>
            <InputController
              errors={errors}
              control={control}
              name="document_number"
              props={{ label: "Numero de Documento" }}
            />
          </Grid2>
        </Grid2>

        <Grid2 container size={{ xs: 12 }} mb={2}>
          <InputController
            errors={errors}
            control={control}
            name="address"
            props={{ label: "Dirección" }}
          />
        </Grid2>

        <InputController
          errors={errors}
          control={control}
          name="email"
          props={{ label: "Correo Electronico", type: "email" }}
        />

        <Grid2
          container
          size={{ xs: 12 }}
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Grid2 container size={{ xs: 5 }}>
            <CountryAutoCompelete
              errors={errors}
              control={control}
              name="indicative"
              label="Indicativo"
            />
          </Grid2>
          <Grid2 container size={{ xs: 7 }}>
            <InputController
              errors={errors}
              control={control}
              name="phone"
              props={{ label: "Telefono", type: "number" }}
            />
          </Grid2>
        </Grid2>
        <Tyc />
        <Grid2 container size={{ xs: 12 }} mt={3}>
          <Button variant="contained" type="submit" fullWidth>
            Pagar
          </Button>
        </Grid2>
      </form>
    </Box>
  );
}
