import { Box, Container, Typography } from "@mui/material";
import React from "react";

const MyWork = () => {
  return (
    <Container>
      <Box boxShadow={4} p={2} my={2}>
        <Typography variant="body2">
          Please enter a title in the Select a paper step.
        </Typography>{" "}
        <Typography variant="body2">Created on: March 14 2023</Typography>
        <Typography variant="body2">
          Paper status: candidate Number of claims assessed: 0
        </Typography>
        <Typography variant="body2">
          Current stage: Selecting a Paper
        </Typography>
        <Typography variant="body2">
          Number of display items assessed: 0
        </Typography>
      </Box>
    </Container>
  );
};

export default MyWork;
