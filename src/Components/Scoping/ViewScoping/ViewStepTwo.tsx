import { Box, Container, FormHelperText, Typography } from "@mui/material";
import React from "react";

const ViewStepTwo = () => {
  return (
    <Container>
      <Box boxShadow={4} my={4}>
        <Typography>
          Record the main repository that stores the code for the reproduction
          package provided by the authors.
        </Typography>
        <FormHelperText>Contents of reproduction package</FormHelperText>
        <Box p={1} boxShadow={1} py={2} border={1} />
        {/* <Typography>
          Are there additional data in different repositories? Use the button
          below to add links to these as well.
        </Typography>{" "} */}
      </Box>
    </Container>
  );
};

export default ViewStepTwo;
