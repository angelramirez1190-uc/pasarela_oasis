"use client";

import { Box, Button, Divider, Grid2, Typography } from "@mui/material";

import { ImagesFranchise, ObjectList } from "../interfaces/interfaces";
import { imagesFranchise } from "./utils/utils";
import { useForm } from "react-hook-form";
import InputController from "./controllers/InputController";
import Image from "next/image";
import { useEffect, useState } from "react";
import DateController from "./controllers/DateController";
import SelectController from "./controllers/SelectController";
import CountryAutoCompelete from "./controllers/CountryAutoCompelete";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Tyc from "./Tyc";

export default function Card({ handlePay, setOptionSelected }) {
  interface FormData {}

  const franchises: ImagesFranchise[] = imagesFranchise.filter(
    (e) => e.showPay
  );

  const schema = yup
    .object({
      name: yup.string().required(),
      credit_card: yup.number().integer().required(),
      expiration: yup.object().required(),
      cvv: yup.number().integer().required(),
      quotes: yup.number().integer().required(),
      document_type: yup.number().required(),
      document_number: yup.number().integer().required(),
      email: yup.string().required(),
      indicative: yup.object().required(),
      phone: yup.number().integer().required(),
      country: yup.object().required(),
      city: yup.string().required(),
      address: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const [creditCard, setCreditCard] = useState<
    ImagesFranchise | undefined | null
  >(null);

  const selectFranchise = (text: string): ImagesFranchise | undefined => {
    return franchises.find((e) =>
      e?.bin?.includes(parseInt(text?.slice(0, 2)))
    );
  };

  useEffect(() => {
    let creditCardValue = watch("credit_card"); // This will now have the correct type
    setCreditCard(selectFranchise(creditCardValue) ?? null); // Handle undefined case here
  }, [watch("credit_card")]);

  const quotes: ObjectList[] = Array.from({ length: 36 }, (x, i) => ({
    id: i + 1,
    value: i + 1,
  }));

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

  const onSubmit = (data: object) => {
    const json = {
      ...data,
      franchise: creditCard?.alt,
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
        <InputController
          errors={errors}
          control={control}
          name="name"
          props={{ label: "Nombre comprador" }}
        />
        <Grid2
          container
          size={{ xs: 10 }}
          justifyContent="space-around"
          m="auto"
          my={2}
        >
          {franchises.map((franchise) => (
            <Image
              alt={franchise?.alt}
              src={franchise?.src}
              width={franchise?.width + 20}
              height={franchise?.height + 10}
              style={{
                filter: `grayscale(${
                  creditCard?.alt == franchise?.alt ? 0 : 1
                })`,
                boxShadow:
                  creditCard?.alt == franchise?.alt
                    ? "0px 0px 2px 0px black"
                    : "inherit",
              }}
            />
          ))}
        </Grid2>
        <InputController
          errors={errors}
          control={control}
          name="credit_card"
          props={{ label: "Numero Tarjeta" }}
        />
        <Grid2
          container
          size={{ xs: 12 }}
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Grid2 container size={{ xs: 4 }}>
            <DateController
              errors={errors}
              control={control}
              name="expiration"
              props={{ label: "Vencimiento" }}
            />
          </Grid2>
          <Grid2 container size={{ xs: 4 }}>
            <InputController
              errors={errors}
              control={control}
              name="cvv"
              props={{ label: "CVV", maxLength: 3, type: "number" }}
            />
          </Grid2>
          <Grid2 container size={{ xs: 2 }}>
            <SelectController
              errors={errors}
              control={control}
              name="quotes"
              label="Cuotas"
              options={quotes}
            />
          </Grid2>
        </Grid2>

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

        <Grid2
          container
          size={{ xs: 12 }}
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Grid2 container size={{ xs: 4 }}>
            <CountryAutoCompelete
              errors={errors}
              control={control}
              name="country"
              label="Pais"
              showFlagAndIndicative={false}
            />
          </Grid2>
          <Grid2 container size={{ xs: 7 }}>
            <InputController
              errors={errors}
              control={control}
              name="city"
              props={{ label: "Ciudad" }}
            />
          </Grid2>
        </Grid2>

        <InputController
          errors={errors}
          control={control}
          name="address"
          props={{ label: "Dirección" }}
        />
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
