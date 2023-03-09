import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";

import "../styles/App.css";
import { List, ListItem, ListItemText } from "@mui/material";
import Search from "./Search";
const Main = () => {
  return (
    <div>
      {/* Hero unit */}
      <Container>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          my={10}
        >
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ color: "#80B731" }} component={"p"}>
              Welcome to
            </Typography>
            <Typography variant="h3" component={"p"}>
              Research Reproduction DAO
            </Typography>{" "}
            <Typography variant="h5" sx={{ color: "#19857b" }} component={"p"}>
              We allows its users to increase the reproducibility of published
              work by guiding reproducers through a five-stage process.
            </Typography>
          </Grid>
          <Grid item xs={8} my={10}>
            <Search />
          </Grid>
        </Grid>
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
              color="primary"
              gutterBottom
            >
              Introduction
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              RRDAO is a platform to improve the computational reproducibility
              of published empirical research by crowdsourcing and sharing
              reproductions that are conducted but may otherwise go unpublished.
              Computational reproducibility is the ability to reproduce the
              results, tables, and other figures found in research articles
              using the data, code, and materials made available by the authors.
            </Typography>
            <section>
              {" "}
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
                economics research articles prior to 2019 were reproducible.
                This lack of incentives for larger-scale reproduction audits is
                due to a lack of journal publishing. To address these issues
                efficiently, there needs to be a reevaluation on how we perform,
                reward, and communicate results from reproductions.
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
                RRDAO allows its users to increase the reproducibility of
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
                      {" "}
                      2. [Scoping] Define the scope of the exercise by recording
                      the claims, display items, and specifications you will
                      focus on in the remainder of the reproduction{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {" "}
                      3. [Assessment] Review and describe in detail the
                      available reproduction package and assess the current
                      level of computational reproducibility of the selected
                      display items
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {" "}
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
                  Rather than designating entire research articles as
                  reproducible or irreproducible, RRDAO allows for a more
                  nuanced approach to reproducibility, where reproducers analyse
                  individual claims and their associated display items, and take
                  concrete steps to improve their reproducibility. Reproduction
                  reports are transparent and publicly document their analyses
                  to support collaboration, discussion, and reuse. These reports
                  can be anonymously shared.
                </Typography>
              </Typography>
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
    </div>
  );
};

export default Main;
