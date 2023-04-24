import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { paperData } from "../../../types/index.d";
const ViewStepFour = ({
  userPaperData,
  setUserPaperData,
}: {
  userPaperData: paperData;
  setUserPaperData: any;
}) => {
  return (
    <Container>
      <Typography variant="h6" my={2}>
        Declare possible robustness checks{" "}
      </Typography>
      <Box p={1}>
        {" "}
        <strong>4.1 </strong>
        After reading the paper, you may wonder what the results would look like
        under a specific robustness check. If you think that such analysis could
        have been done within the same methodology and using the same data
        (e.g., by including or excluding a subset of the data like “high-school
        dropouts” or “women”), please specify a robustness test that you would
        like to conduct as part of this project.
      </Box>
      <Box p={4} m={1} border={1} boxShadow={1} mb={4}></Box>
    </Container>
  );
};

export default ViewStepFour;
