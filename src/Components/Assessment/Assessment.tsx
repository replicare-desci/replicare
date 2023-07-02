import { Button, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";
import DescribeInputStepOne from "./DescribeInputStepOne";
import DescribeCodeStepTwo from "./DescribeCodeStepTwo";
import DiagramBuilderStepThree from "./DiagramBuilderStepThree";
import MasterScriptStepFour from "./MasterScriptStepFour";
import AccessDisplayItemStepFive from "./AccessDisplayItemStepFive";
import PaperLevelReproducbilityStepSix from "./PaperLevelReproducbilityStepSix";
import SaveIcon from "@mui/icons-material/Save";
import AssessmentStepper from "./AssessmentStepper";

import {
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { paperData } from "../../types/index.d";
import { ContextType } from "../../types/context";

const Assessment = () => {
  const { store, setStore } = UserContext();
  const { userPaperID } = useParams();
  const userID = sessionStorage.getItem("id") || "";

  const [activeStep, setActiveStep] = useState<number>(0);

  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return <DescribeInputStepOne />;
      case 1:
        return <DescribeCodeStepTwo />;
      case 2:
        return <DiagramBuilderStepThree />;
      case 3:
        return <MasterScriptStepFour />;
      case 4:
        return <AccessDisplayItemStepFive />;
      case 5:
        return <PaperLevelReproducbilityStepSix />;
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
  function saveAssessmentData() {
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
          Step 3 : Assessment
        </Typography>
        <Typography variant={"subtitle2"} p={1}>
          Describe the available reproduction materials and assign a
          reproducibility score to your selected display items and the overall
          paper. See detailed guidance{" "}
          <a href="https://docs.replicare.dev" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </Typography>{" "}
        <Typography variant="body1" sx={{ fontWeight: 500, p: 1 }}>
          Note that the data inputted doesn't save automatically. Please
          remember to save your work often or download the template .csv files,
          populate them locally on your computer, and then upload them
          accordingly.
        </Typography>
        <Typography variant="body1" sx={{ p: 1, mb: 3 }}>
          In this section, you will first provide a detailed description of the
          reproduction package. You will then connect display items with their
          corresponding inputs, such as data and code files. With these elements
          in place, you can score each display item's reproducibility level and
          record various paper-level dimensions of reproducibility.
        </Typography>
        <AssessmentStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {scopeStepRender(activeStep)}
        <AssessmentStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        {
          <Typography variant="body1" sx={{ fontWeight: 700, my: 4, mx: 1 }}>
            {" "}
            *Please save before going to next step{" "}
          </Typography>
        }
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
            onClick={saveAssessmentData}
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

export default Assessment;
