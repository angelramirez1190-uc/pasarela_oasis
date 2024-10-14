import { Box, Grid2, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddCardIcon from "@mui/icons-material/AddCard";
import Image from "next/image";
import { ImagesFranchise } from "../interfaces/interfaces";
import { imagesFranchise } from "./utils/utils";

interface PaymentTypeProps {
  selectedPayment: string;
  handleSelectPayment: (arg0: string) => string;
}

export default function PaymentType({
  selectedPayment,
  handleSelectPayment,
}: PaymentTypeProps) {
  const franchises: ImagesFranchise[] = imagesFranchise;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <EmailIcon />
        <Typography textAlign="center" ml="20px">
          Correo Electronico envio mensajes
        </Typography>
      </Box>
      <Grid2
        container
        size={{ xs: 12 }}
        justifyContent="space-around"
        alignItems="center"
        border={`0.2px solid ${selectedPayment == "card" ? "#377cac" : "#000"}`}
        borderRadius="5px"
        mt={3}
        p={1}
        sx={{ boxShadow: selectedPayment == "card" ? 3 : 1 }}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectPayment("card")}
      >
        <Grid2>
          <AddCardIcon />
        </Grid2>
        <Grid2 container size={{ xs: 6 }} alignItems="center">
          <Typography fontWeight={701} variant="body1" width="100%">
            Tarjeta debito o crédito
          </Typography>
          <Typography variant="body2" width="100%">
            Paga con tu tarjeta debito o crédito
          </Typography>
        </Grid2>
        <Grid2
          container
          alignItems="center"
          justifyContent="space-around"
          size={{ xs: 4 }}
        >
          {franchises.map((franchise) => (
            <Image
              key={franchise?.alt}
              alt={franchise?.alt}
              src={franchise?.src}
              width={franchise?.width}
              height={franchise?.height}
            />
          ))}
        </Grid2>
      </Grid2>

      <Grid2
        container
        size={{ xs: 12 }}
        justifyItems="space-around"
        alignItems="center"
        border={`0.2px solid ${selectedPayment == "pse" ? "#377cac" : "#000"}`}
        borderRadius="5px"
        mt={3}
        p={1}
        sx={{ boxShadow: selectedPayment == "pse" ? 3 : 1 }}
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectPayment("pse")}
      >
        <Grid2 container size={{ xs: 1.2 }}>
          <Image
            src="https://secure.epayco.co/img/standard/pse.png"
            height={50}
            width={50}
            alt="pse"
          />
        </Grid2>
        <Grid2 container size={{ xs: 9 }} alignItems="center" mr={"auto"}>
          <Typography fontWeight={701} variant="body1" width="100%">
            Cuentas bancarias
          </Typography>
          <Typography variant="body2" width="100%">
            {" "}
          </Typography>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12 }} mt={5}>
        <Typography variant="body2" width="100%">
          {/* <Link href="#">Cancel and return to the merchant.</Link> */}
        </Typography>
      </Grid2>
    </Box>
  );
}
