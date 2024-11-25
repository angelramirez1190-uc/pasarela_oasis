"use client";

import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";

import PaymentType from "./PaymentType";
import Card, { FormDataCard } from "./Card";
import { useState } from "react";
import ResultTransaction from "./ResultTransaction";
import Pse, { FormDataPse } from "./Pse";
import { createReservation } from "@/utils/serverActions";

interface PaymentProps {
  optionSelected: number;
  setOptionSelected: (arg0: number) => void;
  selectedPayment: string;
  setSelectedPayment: (arg0: string) => void;
  transactionData: FormDataCard | FormDataPse;
  setTransactionData: (arg0: FormDataCard | FormDataPse) => void;
  reservation?: FormDataCard | FormDataPse | null;
}

export interface TransactionResult {
  ref: number | string;
  status: boolean;
  total_reserva?: number;
}
export interface TransactionResult {
  ref: number | string;
  status: boolean;
}
export default function Payment({
  optionSelected,
  setOptionSelected,
  selectedPayment,
  setSelectedPayment,
  transactionData,
  setTransactionData,
  reservation,
}: PaymentProps) {
  const [transactionProgress, setTransactionProgress] = useState(false);

  const [transactionResult, setTransactionResult] = useState<
    TransactionResult | undefined | null
  >(undefined);

  const handleSelectPayment = (type: string) => {
    setSelectedPayment(type);
    setOptionSelected(2);
    return type;
  };

  const handlePay = (data: FormDataCard | FormDataPse) => {
    setTransactionProgress(true);
    setTransactionData({ ...data, ...reservation });
    handleSimulatePay();
    return;
  };

  const handleSimulatePay = () => {
    setTimeout(() => {
      const random = Math.random() * 10;
      const status = parseInt(random.toString()) % 2 == 0;
      const ref = (Math.random() * 1000000).toString();
      setTransactionResult({
        ref,
        status,
      });
      createReservation(
        status,
        transactionData?.total_reserva,
        transactionData?.id
      );
      setTransactionProgress(false);
      setOptionSelected(3);
    }, 5000);
  };

  const formatDate = (date?: string | number): string => {
    if (!date) return ""; // Devuelve cadena vacía si no hay fecha
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      alignContent="center"
      py={1}
    >
      <Grid2
        size={{ xs: 11, md: 5.5 }}
        border="0.2px solid"
        borderRadius="5px"
        p={2}
      >
        {optionSelected == 1 && (
          <PaymentType
            selectedPayment={selectedPayment}
            handleSelectPayment={handleSelectPayment}
          />
        )}

        {optionSelected == 2 &&
          (selectedPayment == "pse" ? (
            <Pse handlePay={handlePay} setOptionSelected={setOptionSelected} />
          ) : selectedPayment == "card" ? (
            <Grid2 size={{ xs: 10 }} m="auto">
              <Card
                handlePay={handlePay}
                setOptionSelected={setOptionSelected}
              />
            </Grid2>
          ) : null)}

        {optionSelected == 3 && transactionResult && transactionData && (
          <ResultTransaction
            transactionResult={transactionResult}
            transactionData={transactionData}
            setOptionSelected={setOptionSelected}
          />
        )}
      </Grid2>

      <Grid2
        size={{ xs: 11, md: 5.5 }}
        border="0.2px solid"
        borderRadius="5px"
        p="0"
      >
        <Grid2 size={{ xs: 12 }} m="auto" mt={5}>
          <Grid2 size={{ xs: 10 }} m="auto">
            <Typography variant="h6">TU COMPRA</Typography>
            <Typography my={2}>
              {`Hotel Oasis Reserva N.${reservation?.id ?? ""} desde el ${
                reservation?.checkin ? formatDate(reservation?.checkin) : ""
              } hasta el ${
                reservation?.checkout ? formatDate(reservation?.checkout) : ""
              }`}
            </Typography>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography>Total</Typography>
              <Typography fontWeight={701}>
                ${reservation?.total_reserva ?? 0} COP
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12 }} m="auto">
          <Divider />
        </Grid2>

        <Grid2
          size={{ xs: 12 }}
          m="auto"
          my={1}
          bgcolor="#f1f1f2"
          py={3}
          mb={3}
        >
          <Grid2 size={{ xs: 10 }} m="auto">
            <Typography variant="h6">ALGUNA INQUIETUD</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Comercio:</Typography>
              <Typography>Hotel Oasis</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Llamanos:</Typography>
              <Typography>300 309 1234</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Email:</Typography>
              <Typography>reservas@hoteloasis.com</Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
      {transactionProgress && (
        <Backdrop open={transactionProgress}>
          <Grid2 container justifyContent="center">
            <CircularProgress color="info" />
            <Typography color="white" textAlign={"center"}>
              Transaccion en proceso
            </Typography>
          </Grid2>
        </Backdrop>
      )}
    </Grid2>
  );
}
