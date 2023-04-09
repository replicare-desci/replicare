import { Link } from "react-router-dom";

import "../styles/App.css";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import Search from "./Search";
import ConnectWalletPopUp from "./ConnectWalletPopUp";
import ConnectionWallet from "../ConnectionWallet";
const Main = () => {
  const walletAddress = sessionStorage.getItem("walletAddress");
  return (
    <Container>
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        display={"flex"}
        my={10}
      >
        <Grid item xs={8}>
          <Typography variant="h5" sx={{ color: "#" }} component={"p"}>
            Welcome to
          </Typography>
          <Typography variant="h3" component={"p"}>
            Replicare
          </Typography>
          <Typography variant="h5" sx={{ color: "#222629" }} component={"p"}>
            A decentralized platform to assess and improve the computational
            reproducibility of published empirical research
          </Typography>
        </Grid>
        <Grid item xs={8} my={10}>
          <Search />
        </Grid>
        <Grid item xs={8} justifyContent={"center"}>
          {walletAddress ? (
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
                <Button variant="contained">+ Start a reproduction</Button>
              </Box>
            </Link>
          ) : (
            <Box justifyContent={"center"} display={"flex"}>
              <ConnectWalletPopUp />
              {/* <Box>To start</Box> */}
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
        {/* <Container maxWidth="xl">
          // <Typography component="h1" variant="h2" color="" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Replicare is a platform to improve the computational reproducibility
            of published empirical research by crowdsourcing and sharing
            reproductions that are conducted but may otherwise go unpublished.
            Computational reproducibility is the ability to reproduce the
            results, tables, and other figures found in research articles using
            the data, code, and materials made available by the authors.
          </Typography>
          <section>
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
            >
              Our Motivation
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Empirical research has surprisingly low rates of computational
              reproducibility. For instance, fewer than half of published
              economics research articles prior to 2019 were reproducible. This
              lack of incentives for larger-scale reproduction audits is due to
              a lack of journal publishing. To address these issues efficiently,
              there needs to be a reevaluation on how we perform, reward, and
              communicate results from reproductions.
            </Typography>
          </section>
          <section>
            <Typography
              component="h1"
              variant="h2"
              color="primary"
              gutterBottom
            >
              Our Solution
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Replicare allows its users to increase the reproducibility of
              published work by guiding reproducers through a five-stage
              process.
              <List>
                <ListItem>
                  <ListItemText>
                    1. [Select Paper] Select a candidate paper
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    2. [Scoping] Define the scope of the exercise by recording
                    the claims, display items, and specifications you will focus
                    on in the remainder of the reproduction{" "}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    3. [Assessment] Review and describe in detail the available
                    reproduction package and assess the current level of
                    computational reproducibility of the selected display items
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    4. [Improvements] Making modifications (e.g., debugging
                    code, acquiring required data files) to increase
                    reproducibility
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    5. [Robustness] Verify the validity of the results with
                    alternative analysis parameters.
                  </ListItemText>
                </ListItem>
              </List>
              <Typography variant="h6" component={"p"}>
                Rather than designating entire research articles as reproducible
                or irreproducible, Replicare allows for a more nuanced approach
                to reproducibility, where reproducers analyse individual claims
                and their associated display items, and take concrete steps to
                improve their reproducibility. Reproduction reports are
                transparent and publicly document their analyses to support
                collaboration, discussion, and reuse. These reports can be
                anonymously shared.
              </Typography>
            </Typography>
          </section>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container> */}
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
            {/* <List>
              <ListItem>
                <ListItemText>
                  1. [Select Paper] Select a candidate paper
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  2. [Scoping] Define the scope of the exercise by recording the
                  claims, display items, and specifications you will focus on in
                  the remainder of the reproduction{" "}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  3. [Assessment] Review and describe in detail the available
                  reproduction package and assess the current level of
                  computational reproducibility of the selected display items
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  4. [Improvements] Making modifications (e.g., debugging code,
                  acquiring required data files) to increase reproducibility
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  5. [Robustness] Verify the validity of the results with
                  alternative analysis parameters.
                </ListItemText>
              </ListItem>
            </List> */}
            {/* <Typography variant="h6" component={"p"}>
              Rather than designating entire research articles as reproducible
              or irreproducible, Replicare allows for a more nuanced approach to
              reproducibility, where reproducers analyse individual claims and
              their associated display items, and take concrete steps to improve
              their reproducibility. Reproduction reports are transparent and
              publicly document their analyses to support collaboration,
              discussion, and reuse. These reports can be anonymously shared.
            </Typography> */}
          </section>

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
    </Container>
  );
};

export default Main;
