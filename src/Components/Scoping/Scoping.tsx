import { Button, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
import SummarizePaperStepOne from "./SummarizePaperStepOne";

import SaveIcon from "@mui/icons-material/Save";

import ScopingStepper from "./ScopingStepper";
import AddRevisedReproductionPackagesStepTwo from "./AddRevisedReproductionPackagesStepTwo";
import OutlineClaimsStepThree from "./OutlineClaimsStepThree/OutlineClaimsStepThree";
import DeclareRobustnessChecksStepFour from "./DeclareRobustnessChecksStepFour";
import {
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { paperData } from "../../types/index.d";
import { ContextType } from "../../types/context";

const Scoping = () => {
  const { store, setStore } = UserContext();
  const { userPaperID } = useParams();
  const userID = sessionStorage.getItem("id") || "";

  const [activeStep, setActiveStep] = useState<number>(0);

  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <SummarizePaperStepOne />;
      case 1:
        return <AddRevisedReproductionPackagesStepTwo />;
      case 2:
        return <OutlineClaimsStepThree />;
      case 3:
        return <DeclareRobustnessChecksStepFour />;
    }
  }

  useEffect(() => {
    if (userPaperID !== undefined) {
      getSelectUserPaperData(userPaperID)
        .then((paperResponse: paperData) => {
          if (paperResponse !== undefined) {
            setStore((prev: ContextType) => {
              return {
                ...prev,
                paperData: { ...paperResponse },
              };
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong with this code");
        });
    }
  }, [userPaperID, setStore]);
  console.log(store.paperData);

  // This function saves everything
  function saveScopingData() {
    if (
      userID !== undefined &&
      userPaperID !== undefined &&
      userID !== "" &&
      userPaperID !== ""
    ) {
      appendUserPaperData(userPaperID, store?.paperData)
        .then(() => {
          console.log("data saved");
          toast.success("Data Saved successfully");
        })
        .catch((err) => {
          console.log("error saving data", err);
        });
    } else {
      toast.error("something is wrong about this code..");
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
        <ScopingStepper activeStep={activeStep} setActiveStep={setActiveStep} />
        {scopeStepRender(activeStep)}
        <ScopingStepper activeStep={activeStep} setActiveStep={setActiveStep} />
        {<strong>*Please save before going to next step* </strong>}
        {/* <SummarizePaperStepOne /> */}
        <Grid justifyContent={"flex-end"} display={"flex"} mb={10}>
          {" "}
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: 2,
              borderRadius: 10,
              px: 3,
            }}
            onClick={saveScopingData}
          >
            <SaveIcon
              sx={{
                mr: 1,
              }}
            />
            <Typography
              variant="button"
              sx={{
                // fontWeight: 600,
                fontSize: 16,
              }}
            >
              Save
            </Typography>
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Scoping;
