import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import { FormDataPse } from "./Pse";
import { FormDataCard } from "./Card";
import { TransactionResult } from "./Payment";

interface ResultTransactionInterface {
  transactionResult: TransactionResult;
  transactionData: FormDataCard | FormDataPse;
  setOptionSelected: (arg0: number) => void;
}

export default function ResultTransaction({
  transactionResult,
  transactionData,
  setOptionSelected,
}: ResultTransactionInterface) {
  const getDate = () => {
    const date = new Date();
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const days = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${days}-${month}-${date.getFullYear()} ${hour}:${minutes}`;
  };

  const getLastFourNumbers = () => {
    if ("credit_card" in transactionData) {
      const creditCard = transactionData?.credit_card?.toString();
      return creditCard?.slice(creditCard?.length - 4, creditCard?.length);
    }
    return null;
  };

  const successIcon = (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12L9 18L21 6"
        stroke="green"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const errorIcon = (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
        stroke="red"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9V13"
        stroke="red"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 17.0195V17"
        stroke="red"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const handleContinue = () => {
    if (transactionResult?.status) {
      console.log("Angeel");
    }
    if (!transactionResult?.status) {
      setOptionSelected(2);
    }
  };

  return (
    <Grid2
      container
      size={{ xs: 12 }}
      justifyContent="space-around"
      py={3}
      alignItems="center"
    >
      <Grid2 container size={{ xs: 12 }}>
        <Grid2 container size={{ xs: 12 }}>
          <Box display="flex" justifyContent="center" width="100%">
            {transactionResult.status ? successIcon : errorIcon}
          </Box>
          <Typography width="100%" textAlign="center">
            Hotel Oasis
          </Typography>
          <Typography width="100%" variant="h5" textAlign="center" mb={2}>
            Tu pago ha sido
            {transactionResult.status ? " aprobado" : " rechazado"}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }} m="auto">
          <Divider />
        </Grid2>
        <Grid2 size={{ xs: 12 }} m="auto">
          <Divider />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={1}
        >
          <Typography>Ref: </Typography>
          <Typography>{transactionResult?.ref}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }} m="auto">
          <Divider />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={0.5}
        >
          <Typography>Metodo de pago</Typography>
          <Typography>
            {transactionData?.franchise} ****{getLastFourNumbers()}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={0.5}
        >
          <Typography>Fecha</Typography>
          <Typography>{getDate()}</Typography>
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={0.5}
        >
          <Typography>Respuesta</Typography>
          <Typography>
            {transactionResult.status ? "Aprobado" : "Rechazado"}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={0.5}
        >
          <Typography>Referencia</Typography>
          <Typography>{transactionResult?.ref}</Typography>
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          m="auto"
          container
          justifyContent="space-around"
          my={0.5}
        >
          <Typography variant="h6" fontWeight={701}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={701}>
            {transactionResult?.ref}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 8 }} m="auto" mt={3}>
        <Button onClick={handleContinue} variant="contained" fullWidth>
          {transactionResult.status ? "Aceptar" : "Intentar Nuevamente"}
        </Button>
      </Grid2>
    </Grid2>
  );
}
