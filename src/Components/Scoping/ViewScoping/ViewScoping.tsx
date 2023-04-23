import { Container, Typography } from "@mui/material";
import React, { useState } from "react";

import Stepper from "../Stepper";
import ViewStepOne from "./ViewStepOne";
import ViewStepFour from "./ViewStepFour";
import ViewStepThree from "./ViewStepThree";
import ViewStepTwo from "./ViewStepTwo";

const ViewScoping = () => {
  const [oneTen, setOneTen] = useState<number>(-1);
  const [oneTwelve, setOneTwelve] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <ViewStepOne
          // scopingDataStep1={scopingDataStep1}
          // setScopingDataStep1={setScopingDataStep1}
          />
        );
      case 1:
        return <ViewStepTwo />;
      case 2:
        return <ViewStepThree />;
      case 3:
        return <ViewStepFour />;
      default:
        return <Typography>This component does not exists</Typography>;
    }
  }
  return (
    <>
      <Container>
        <Typography variant="h4" component={"h1"} textAlign={"center"} py={2}>
          Step 2 : Scoping
        </Typography>
        <Typography variant={"subtitle2"} p={2}>
          Focusing on the declared paper from the previous stage, define the
          scope of your exercise by identifying the display items and claims on
          which you will focus in the later stages. See detailed guidance here.
        </Typography>{" "}
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
        {scopeStepRender(activeStep)}
        {/* <SummarizePaperStepOne /> */}
      </Container>
    </>
  );
};

export default ViewScoping;
