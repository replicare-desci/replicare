import * as React from "react";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
function Copyright() {
  return (
    <Typography variant="body2" color="text.white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        RRDAO
      </Link>
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
        sx={{ bgcolor: "#222629", p: 6, color: "#ffffff" }}
        component="footer"
      >
        <Grid container>
          <Grid item xl={3}>
            <Typography variant="h2" component={"h1"}>
              RRDAO
            </Typography>
          </Grid>
          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Typography variant="overline" sx={{ color: "#ffffff" }}>
                Home
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" sx={{}}>
                Privacy Policy
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: "#ffffff" }}>
                Contact us
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Typography variant="overline" sx={{}}>
                Terms of use
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: "#ffffff" }}>
                About
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" sx={{}}>
                info@rrdao.com
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Typography variant="overline" sx={{}}>
                Team
              </Typography>
            </Box>
            <Box>
              <Box>
                <Typography variant="overline" sx={{}}>
                  Follow us
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Box>
                  <GitHubIcon />
                </Box>
                <Box mx={1}>
                  <TwitterIcon />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} md={3}></Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Box mt={6}>
            <Copyright />
          </Box>
        </Grid>
      </Box>

      {/* End footer */}
    </div>
  );
};

export default Footer;
