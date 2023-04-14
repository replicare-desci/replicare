import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import SummarizePaperStepOne from "./SummarizePaperStepOne";
import {
  DeclareRobustnessChecks,
  AddRevisedReproductionPackage,
  SummarizePaper,
} from "../../types/context.d";
import Stepper from "./Stepper";
import AddRevisedReproductionPackagesStepTwo from "./AddRevisedReproductionPackagesStepTwo";
import OutlineClaimsStepThree from "./OutlineClaimsStepThree/OutlineClaimsStepThree";
import DeclareRobustnessChecksStepFour from "./DeclareRobustnessChecksStepFour";

const Scoping = () => {
  const [scopingDataStep1, setScopingDataStep1] = useState<SummarizePaper>();
  const [scopingDataStep2, setScopingDataStep2] =
    useState<AddRevisedReproductionPackage>();
  const [scopingDataStep4, setScopingDataStep4] =
    useState<DeclareRobustnessChecks>();
  //TODO: const [scopingDataStep3, setScopingDataStep3] =
  // useState<>();
  const [oneTen, setOneTen] = useState<number>(-1);
  const [oneTwelve, setOneTwelve] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <SummarizePaperStepOne
          // scopingDataStep1={scopingDataStep1}
          // setScopingDataStep1={setScopingDataStep1}
          />
        );
      case 1:
        return <AddRevisedReproductionPackagesStepTwo />;
      case 2:
        return <OutlineClaimsStepThree />;
      case 3:
        return <DeclareRobustnessChecksStepFour />;
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

export default Scoping;
