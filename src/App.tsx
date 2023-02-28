import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import Footer from "./Components/Footer";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            RRDAO
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="xl">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="primary"
              gutterBottom
            >
              Introduction
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              RRDAO is a platform to improve the computational reproducibility
              of published empirical research by crowdsourcing and sharing
              reproductions that are conducted but may otherwise go unpublished.
              Computational reproducibility is the ability to reproduce the
              results, tables, and other figures found in research articles
              using the data, code, and materials made available by the authors.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
