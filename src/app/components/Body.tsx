"use client";

import { Grid2 } from "@mui/material";
import Option from "./Option";
import { useState } from "react";
import Payment from "./Payment";
import { FormDataPse } from "./Pse";
import { FormDataCard } from "./Card";

interface ListOption {
  id: number;
  name: string;
  disabled?: object;
}

export default function Body() {
  const [optionSelected, setOptionSelected] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [transactionData, setTransactionData] = useState<
    FormDataCard | FormDataPse
  >({
    name: "",
    document_type: 0,
    bank: 0,
    document_number: 0,
    email: "",
    indicative: {},
    phone: 0,
    address: "",
    franchise: "",
  });

  const options: ListOption[] = [
    {
      id: 1,
      name: "Método de pago",
    },
    {
      id: 2,
      name: "Completar información",
    },
    {
      id: 3,
      name: "Confirmación",
      disabled: transactionData,
    },
  ];
  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid2
        container
        size={{ xs: 12 }}
        justifyContent="space-around"
        alignItems="center"
        border="0.2px solid"
        borderRadius="5px"
        sx={{ boxShadow: 3 }}
      >
        {options.map((option) => (
          <Option
            option={option}
            key={option?.id}
            setOptionSelected={setOptionSelected}
            optionSelected={optionSelected}
          />
        ))}
      </Grid2>
      <Grid2
        container
        size={{ xs: 12 }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Payment
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
        />
      </Grid2>
    </Grid2>
  );
}
