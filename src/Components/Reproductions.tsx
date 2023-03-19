import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MyWork from "./MyWork";

const Reproductions = () => {
  return (
    <div>
      {/* <div>Reproductions</div> */}
      <Container>
        <Grid container mt={5} mb={22}>
          <Typography variant="h3" component="h1" my={5}>
            My work
          </Typography>
          <Grid item xs={12} xl={12}>
            <Link to="/reproductions/index" style={{ textDecoration: "none" }}>
              <Button variant="contained">+ Start a reproduction</Button>
            </Link>
          </Grid>
        </Grid>
        <MyWork />
      </Container>
    </div>
  );
};

export default Reproductions;
