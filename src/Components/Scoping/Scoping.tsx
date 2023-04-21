import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SummarizePaperStepOne from "./SummarizePaperStepOne";
import {
  DeclareRobustnessChecks,
  AddRevisedReproductionPackage,
  SummarizePaper,
} from "../../types/context.d";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import { paperData } from "../../types/index.d";

import Stepper from "./Stepper";
import AddRevisedReproductionPackagesStepTwo from "./AddRevisedReproductionPackagesStepTwo";
import OutlineClaimsStepThree from "./OutlineClaimsStepThree/OutlineClaimsStepThree";
import DeclareRobustnessChecksStepFour from "./DeclareRobustnessChecksStepFour";
import { appendUserPaperData } from "../../firebase/firebaseFunctions";

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

  // global state for scoping
  const [scopingData, setScopingData] = useState({
    // step 1 data start
    project_nickname: "",
    revised_reproduction_packages: [],
    start_date: "",
    end_date: "",
    expected_total_hours: 1,
    familiarity_level: "",
    outputs: [],
    whole_population: "",
    additional_population: "",
    num_claims: 1,
    claim_type_other_description: "",
    will_access_whole_paper: false, //wil investigate
    num_claims_will_assess: 1,
    summary: "",

    // step 1 data end

    // step 2 data start
    revised_reproduction_data: [],
    // step 2 data end

    // step 3 data start

    // step 3 data end
  });
  const { userPaperID } = useParams();
  function saveScopingData() {
    if (typeof userPaperID != "undefined") {
      appendUserPaperData(userPaperID, scopingData)
        .then((res) => {
          if (res.id) {
            console.log("data saved", res.id);
          }
        })
        .catch((err) => {
          console.log("error saving data", err);
        });
    }
  }
  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <SummarizePaperStepOne
            scopingData={scopingData}
            setScopingData={setScopingData}
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
        <Grid xs={12} justifyContent={"flex-end"} display={"flex"} mb={10}>
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
