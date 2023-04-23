import { Box, Container, FormHelperText, Typography } from "@mui/material";
import React from "react";

const ViewStepTwo = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography>
          <strong>2.1 </strong>Download the original reproduction package,
          upload it to a new repository, and record it below. This will be the
          revised reproduction package and will store any improvements that you
          will implement as part of this project. See detailed guidance here{" "}
          <span>
            <a
              style={{
                textDecoration: "none",
                color: "#3234df",
              }}
              href="https://docs.replicare.dev"
            >
              docs.
            </a>
          </span>
        </Typography>
        {/* <FormHelperText>Contents of reproduction package</FormHelperText> */}
        <Box p={1} boxShadow={1} py={3} my={3} border={1}>
          <Typography sx={{ fontWeight: 600 }}>Package Name : </Typography>
          <Typography sx={{ fontWeight: 600 }}>Package URL : </Typography>
        </Box>
        {/* <Typography>
          Are there additional data in different repositories? Use the button
          below to add links to these as well.
        </Typography>{" "} */}
      </Box>
    </Container>
  );
};

export default ViewStepTwo;
