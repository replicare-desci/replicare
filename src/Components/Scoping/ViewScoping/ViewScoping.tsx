import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import Stepper from "../Stepper";
import ViewStepOne from "./ViewStepOne";
import ViewStepFour from "./ViewStepFour";
import ViewStepThree from "./ViewStepThree";
import ViewStepTwo from "./ViewStepTwo";
import { useParams } from "react-router-dom";
import { getSelectUserPaperData } from "../../../firebase/firebaseFunctions";
import { paperData } from "../../../types/index.d";
const ViewScoping = () => {
  // fetch scoping data start
  const [userPaperData, setUserPaperData] = useState<paperData>();
  const { userPaperID } = useParams();
  useEffect(() => {
    getSelectUserPaperData(userPaperID as string)
      .then((data) => {
        setUserPaperData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userPaperID]);
  // fetch scoping data end

  const [activeStep, setActiveStep] = useState<number>(0);
  function scopeStepRender(activeStep: number) {
    if (userPaperData !== undefined) {
      switch (activeStep) {
        case 0:
          return (
            <ViewStepOne
              userPaperData={userPaperData}
              setUserPaperData={setUserPaperData}
            />
          );
        case 1:
          return (
            <ViewStepTwo
              userPaperData={userPaperData}
              setUserPaperData={setUserPaperData}
            />
          );
        case 2:
          return (
            <ViewStepThree
              userPaperData={userPaperData}
              setUserPaperData={setUserPaperData}
            />
          );
        case 3:
          return (
            <ViewStepFour
              userPaperData={userPaperData}
              setUserPaperData={setUserPaperData}
            />
          );
        // default:
        //   return <Typography>This component does not exists</Typography>;
      }
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
      </Container>
    </>
  );
};

export default ViewScoping;
