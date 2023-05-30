import { Link } from "react-router-dom";
import "../styles/App.css";
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import Search from "./Search";
import AddIcon from "@mui/icons-material/Add";
import RainbowWallet from "../RainbowWallet";

const Main = () => {
  const userID: string = sessionStorage.getItem("id") ?? "";

  const walletAddress: string = sessionStorage.getItem(
    "walletAddress"
  ) as string;
  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        display={"flex"}
        my={10}
      >
        <Grid item xs={12} xl={8} lg={8} sm={10}>
          <Typography
            variant="overline"
            sx={{ color: "primary.dark", fontSize: 25, lineHeight: 0.5 }}
            component={"p"}
          >
            Welcome to
          </Typography>
          <Typography variant="h2" my={1} component={"h1"}>
            Replicare
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "background.paper" }}
            component={"p"}
          >
            A decentralized platform to assess and improve the computational
            reproducibility of published empirical research
          </Typography>
        </Grid>
        <Grid item xs={8} my={10}>
          <Search />
        </Grid>
        <Grid item xs={8} justifyContent={"center"}>
          {walletAddress && userID ? (
            <Link
              to="/reproductions"
              style={{
                textDecoration: "none",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Box display={"flex"} justifyContent={"center"}>
                <Button variant="contained">
                  <AddIcon sx={{ fontSize: 18, mr: 1 }} /> Start a reproduction
                </Button>
              </Box>
            </Link>
          ) : (
            <Box justifyContent={"center"} display={"flex"}>
              {/* <RainbowWallet /> */}

              <Button
                variant="contained"
                sx={{
                  textTransform: "unset",
                }}
              >
                Sign in to start using
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          // bgcolor: "#ffffff",

          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="xl">
          <Typography component="h1" variant="h2" color="primary" gutterBottom>
            Features
          </Typography>

          <section style={{ padding: 10 }}>
            {" "}
            <Grid container justifyContent={"space-around"}>
              {" "}
              <Grid
                item
                xs={12}
                xl={5}
                lg={5}
                mt={2}
                sm={12}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                  boxShadow: 2,
                  p: 5,

                  height: 200,
                }}
              >
                {" "}
                <Typography
                  component="h4"
                  variant="h5"
                  color="#222629"
                  gutterBottom
                >
                  Crowdsourcing
                </Typography>{" "}
                <Typography variant="body1" color="text.secondary" paragraph>
                  Anyone with a Web3 wallet can submit reproduction attempts for
                  a research claim.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                xl={5}
                lg={5}
                mt={2}
                sm={12}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                  boxShadow: 2,
                  p: 5,

                  height: 200,
                }}
              >
                <Typography
                  component="h4"
                  variant="h5"
                  color="#222629"
                  gutterBottom
                >
                  Cataloguing
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Researchers can now systematically explore all prior attempts
                  at reproducing a research claim using our database.
                </Typography>{" "}
              </Grid>
            </Grid>
            <Grid container justifyContent={"space-around"} mt={2}>
              {" "}
              <Grid
                item
                xs={12}
                xl={5}
                lg={5}
                mt={2}
                sm={12}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                  boxShadow: 2,
                  p: 5,

                  height: 200,
                }}
              >
                <Typography
                  component="h4"
                  variant="h5"
                  color="#222629"
                  gutterBottom
                >
                  Assessing
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Describe and assign a reproducibility score to a research
                  claim.
                </Typography>{" "}
              </Grid>
              <Grid
                item
                xs={12}
                xl={5}
                lg={5}
                mt={2}
                sm={12}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                  boxShadow: 2,
                  p: 5,

                  height: 200,
                }}
              >
                {" "}
                <Typography
                  component="h4"
                  variant="h5"
                  color="#222629"
                  gutterBottom
                >
                  Improving
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Analyze, troubleshoot and develop existing reproduction
                  packages for a research claim.
                </Typography>{" "}
              </Grid>
            </Grid>
          </section>

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default Main;
