import * as React from "react";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="text.white" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "#ffffff" }} to={"/"}>
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
        sx={{ bgcolor: "#222629", p: 6, color: "#ffffff" }}
        component="footer"
      >
        <Grid container>
          <Grid item xl={3}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              <Typography
                variant="h2"
                component={"h1"}
                sx={{
                  ":hover": {
                    color: "primary.main",
                  },
                }}
              >
                RRDAO
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Home
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Privacy Policy
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Contact Us
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Terms of use
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  About
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  info@rrdao.com
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} xl={3} md={3}>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "#ffffff",
                    ":hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Team
                </Typography>
              </Link>
            </Box>
            <Box>
              <Box>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#222629" }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "#ffffff",
                      ":hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    Follow us
                  </Typography>
                </Link>
              </Box>
              <Box display={"flex"}>
                <Box>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#222629" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#ffffff",
                        ":hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <GitHubIcon />
                    </Typography>
                  </Link>
                </Box>
                <Box mx={1}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#222629" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "#ffffff",
                        ":hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <TwitterIcon />
                    </Typography>
                  </Link>
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
