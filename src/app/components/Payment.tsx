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
import Card from "./Card";
import { useState } from "react";
import ResultTransaction from "./ResultTransaction";
import Pse from "./Pse";

interface PaymentProps {
  optionSelected: number;
  setOptionSelected: (arg0: number) => null;
  selectedPayment: string;
  setSelectedPayment: (arg0: string) => null;
}

export default function Payment({
  optionSelected,
  setOptionSelected,
  selectedPayment,
  setSelectedPayment,
  transactionData,
  setTransactionData,
}: PaymentProps) {
  const [transactionProgress, setTransactionProgress] = useState(false);
  const [transactionResult, setTransactionResult] = useState([]);

  const handleSelectPayment = (type: string) => {
    setSelectedPayment(type);
    setOptionSelected(2);
    return type;
  };

  const handlePay = (data: object) => {
    setTransactionProgress(true);
    setTransactionData(data);
    handleSimulatePay();
  };

  const handleSimulatePay = () => {
    setTimeout(() => {
      const random = Math.random() * 10;
      const status = parseInt(random) % 2 == 0;

      setTransactionResult({
        ref: parseInt(Math.random() * 1000000),
        status,
      });

      setTransactionProgress(false);
      setOptionSelected(3);
    }, 5000);
  };

  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      alignContent="center"
      py={1}
      // height="50vh"
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
        {optionSelected == 3 && (
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
              Hotel Oasis Reserva N.1234 desde el 2024-10-12 hasta el 2024-10-13
            </Typography>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography>Total</Typography>
              <Typography fontWeight={701}>$714,000.00 COP</Typography>
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
          <Grid2>
            <CircularProgress color="white" />
            <Typography color="white" textAlign={"center"}>
              Transaccion en proceso
            </Typography>
          </Grid2>
        </Backdrop>
      )}
    </Grid2>
  );
}
