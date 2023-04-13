import { Container, Typography } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import SummarizePaperStepOne from "./SummarizePaperStepOne";

import Stepper from "./Stepper";
const Scoping = () => {
  return (
    <>
      <Container>
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <Typography variant="h4" component={"h1"} textAlign={"center"} py={2}>
          Step 2 : Scoping
        </Typography>
        <Typography variant={"subtitle2"} p={2}>
          Focusing on the declared paper from the previous stage, define the
          scope of your exercise by identifying the display items and claims on
          which you will focus in the later stages. See detailed guidance here.
        </Typography>{" "}
        <Stepper />
        {/* <SummarizePaperStepOne /> */}
      </Container>
    </>
  );
};

export default Scoping;
