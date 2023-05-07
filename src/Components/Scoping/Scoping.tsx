import { Button, Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummarizePaperStepOne from "./SummarizePaperStepOne";

import SaveIcon from "@mui/icons-material/Save";

import Stepper from "./Stepper";
import AddRevisedReproductionPackagesStepTwo from "./AddRevisedReproductionPackagesStepTwo";
import OutlineClaimsStepThree from "./OutlineClaimsStepThree/OutlineClaimsStepThree";
import DeclareRobustnessChecksStepFour from "./DeclareRobustnessChecksStepFour";
import {
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { claims, paperData } from "../../types/index.d";

const Scoping = () => {
  const { userPaperID, pageType } = useParams();
  const userID: string = sessionStorage.getItem("id") as string;
  const [activeStep, setActiveStep] = useState<number>(0);

  // global state for scoping
  const [scopingData, setScopingData] = useState<paperData>({
    // step 1 data start
    userID: userID,
    id: userPaperID as string,
    project_nickname: "",
    revised_reproduction_packages: [],
    start_date: "",
    end_date: "",
    expected_total_hours: 1,
    familiarity_level: "",
    outputs: {
      num_tables_body: 0,
      num_figures_body: 0,
      num_inline_results_body: 0,
      num_tables_appendix: "",
      num_figures_appendix: "",
    },
    whole_population: "",
    additional_population: "",
    num_claims: 1,
    claim_type_other_description: "",
    will_assess_whole_paper: "", //wil investigate
    num_claims_will_assess: "",
    summary: "",
    // step 4:
    possible_robustness_checks: "",
    // step 3 :
    claims: null,
  });
  // step 3:
  const [claimState, setClaimState] = useState<claims>({
    claimSummary: "",
    econometric_categorization_confidence: 0,
    focused_population: "",
    identified_preferred_specification: "",
    short_description: "",
    estimates: {
      column: "",
      confidence_interval: "",
      econometric_method: "",
      estimate: "",
      inline_paragraph: "",
      name: "",
      other_econometric_method: "",
      other_statistic: "",
      p_value: "",
      page: "",
      row: "",
      standard_error: "",
      units: "",
    },
  });

  function scopeStepRender(activeStep: number) {
    switch (activeStep) {
      case 0:
        return (
          <SummarizePaperStepOne
            scopingData={scopingData}
            setScopingData={setScopingData}
          />
        );
      case 1:
        return (
          <AddRevisedReproductionPackagesStepTwo
            scopingData={scopingData}
            setScopingData={setScopingData}
          />
        );
      case 2:
        return (
          <OutlineClaimsStepThree
            scopingData={scopingData}
            setScopingData={setScopingData}
            claimState={claimState}
            setClaimState={setClaimState}
          />
        );
      case 3:
        return (
          <DeclareRobustnessChecksStepFour
            scopingData={scopingData}
            setScopingData={setScopingData}
          />
        );
      // default:
      //   return <Typography>This component does not exists</Typography>;
    }
  }

  useEffect(() => {
    if (userPaperID !== undefined) {
      getSelectUserPaperData(userPaperID)
        .then((scopeResponse: paperData) => {
          setScopingData(scopeResponse);

          if (
            scopeResponse?.claims !== null &&
            scopeResponse?.claims !== undefined
          ) {
            setClaimState(scopeResponse?.claims);
          }
        })
        .catch((err: any) => console.log(err));
    }
  }, [pageType, userPaperID]);

  // This function saves everything
  function saveScopingData() {
    if (userID !== undefined && userPaperID !== undefined) {
      console.log(scopingData);
      console.log(claimState);

      console.log(userPaperID);

      if (claimState !== undefined && claimState !== null) {
        setScopingData((prev: paperData) => {
          return {
            ...prev,
            claims: claimState,
          };
        });
      } else {
        toast.error("error saving data ");
      }
      appendUserPaperData(userPaperID, scopingData)
        .then(() => {
          console.log("data saved");
          toast.success("Data Saved successfully");
        })
        .catch((err) => {
          console.log("error saving data", err);
        });
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
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
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
