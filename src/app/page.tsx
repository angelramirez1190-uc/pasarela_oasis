import { Grid2 } from "@mui/material";
import Nav from "./components/Nav";
import Body from "./components/Body";

export default function Home() {
  return (
    <Grid2 container size={{ xs: 12 }}>
      <Nav />
      <Grid2 size={{ xs: 12, md: 10 }} py="5" m="auto">
        <Body />
      </Grid2>
    </Grid2>
  );
}
