import * as React from "react";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";

function Copyright() {
  return (
    <Typography variant="body2" color="text.white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        RRDAO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <Box
        sx={{ bgcolor: "background", p: 6, color: "#ffffff" }}
        component="footer"
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Copyright />
          </Grid>
          <Grid item>
            <a href="/">
              <Typography variant="button" sx={{ color: "#ffffff" }}>
                Home
              </Typography>
            </a>
          </Grid>
          <Grid item>Contact Us</Grid>
          <Grid item>About</Grid>
          <Grid item>Team</Grid>
          <Grid item>Terms of use</Grid>
          <Fab disabled aria-label="like">
            <FavoriteIcon />
          </Fab>
        </Grid>
        <Grid container>
          <Typography variant="h1" component={"h1"}>
            RRDAO
          </Typography>
        </Grid>
      </Box>
      {/* End footer */}
    </div>
  );
};

export default Footer;
