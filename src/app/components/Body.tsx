"use client";

import { Grid2 } from "@mui/material";
import Option from "./Option";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import { FormDataPse } from "./Pse";
import { FormDataCard } from "./Card";
import { useSearchParams } from "next/navigation";
import { selectReservation } from "@/utils/serverActions";

interface ListOption {
  id: number;
  name: string;
  disabled?: object;
}

export default function Body() {
  const [optionSelected, setOptionSelected] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [reservation, setReservation] = useState(null);
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
  const searchParams = useSearchParams() ?? "";

  const handleSelect = async () => {
    try {
      const reserva = searchParams.get("reserva") ?? "";
      const reservationData = await selectReservation(reserva);

      if (reservationData) {
        const calculate = () => {
          const values = [
            { name: "individual", value: 50000 },
            { name: "deluxe", value: 85000 },
            { name: "suite", value: 100000 },
          ];

          const getValue = values.find(
            (index) => index.name === reservationData?.habitacion
          );

          const differenceInDays = Math.abs(
            reservationData?.checkin - reservationData?.checkout
          );
          const days = differenceInDays / (1000 * 60 * 60 * 24);

          reservationData.total_reserva = Math.abs(
            reservationData?.adultos * days * (getValue?.value ?? 1)
          );
        };
        calculate();
        setReservation(reservationData);
      }
    } catch (error) {
      console.error("Error handling reservation:", error);
    }
  };

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

  useEffect(() => {
    handleSelect();
  }, []);

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
          reservation={reservation}
        />
      </Grid2>
    </Grid2>
  );
}
