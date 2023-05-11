import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color=" gray" align="center">
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "gray" }} to={"/"}>
        Replicare
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
        sx={{ bgcolor: "primary.main", p: 6, color: "#ffffff" }}
        component="footer"
      >
        <Grid container>
          <Grid item md={3} xs={12}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "primary.light",
              }}
            >
              <Typography
                variant="h2"
                component={"h1"}
                sx={{
                  textDecoration: "none",
                  color: "primary.light",
                  ":hover": {
                    color: "background.paper",
                  },
                }}
              >
                Replicare
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Home
                </Typography>
              </Link>
            </Box>

            <Box>
              <Link
                to="https://docs.replicare.dev/"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Documentation
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "#222629" }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  About
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link
                to="mailto:info@replicare.dev"
                style={{ textDecoration: "none", color: "#222629" }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.light",
                    // textTransform: "unset",
                    ":hover": {
                      color: "background.paper",
                    },
                  }}
                >
                  Contact us
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} xl={3} sm={3} md={3}>
            <Box>
              <Box>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#222629" }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.light",
                      ":hover": {
                        color: "background.paper",
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
                    to="https://github.com/replicare-desci/replicare"
                    target={"_blank"}
                    style={{ textDecoration: "none", color: "#222629" }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "primary.light",
                        ":hover": {
                          color: "background.paper",
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
                        color: "primary.light",
                        ":hover": {
                          color: "background.paper",
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
          <Grid item xs={6} xl={3} sm={3} md={3}></Grid>
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
