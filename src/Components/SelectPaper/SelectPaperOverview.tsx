import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";

import { checkPaperExecutionState } from "../../firebase/firebaseFunctions";

const SelectPaperOverview = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const { pageType, userPaperID } = useParams();

  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const [paperExecutionState, setPaperExecutionState] = useState("");

  useEffect(() => {
    if (
      userPaperID !== undefined &&
      pageType !== undefined &&
      pageType === "edit"
    ) {
      checkPaperExecutionState(userPaperID)
        .then((data) => {
          setPaperExecutionState(data);
          checkPaperState(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [pageType, userPaperID]);

  function checkPaperState(paperExecutionState: string) {
    switch (paperExecutionState) {
      case "candidate":
        setActiveStep(0);
        break;
      case "declared":
        setActiveStep(1);
        break;
      case "scoping":
        setActiveStep(2);
        break;
    }
  }
  return (
    <div>
      {/* <div>SelectPaperOverview</div> */}
      <Container sx={{ py: 12 }}>
        <Typography variant="h5" component="h1" mb={3} fontWeight={500}>
          Create a reproduction attempt
        </Typography>

        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <Box display={"flex"}>
                {" "}
                <StepLabel>
                  <Typography fontWeight={700}>Declare a paper</Typography>
                </StepLabel>
                <Box display={"flex"} mt={1} p={1}>
                  {" "}
                  <Link
                    style={{ color: "#32454D" }}
                    to={`/reproductions/select-paper/view/${userPaperID}`}
                  >
                    <VisibilityIcon fontSize="medium" />
                  </Link>
                </Box>
              </Box>
              <StepContent>
                <Typography my={2}>
                  Specify the research paper that you will analyze and provide
                  some basic information about its reproduction package. Please
                  refer to the documentation provided for further assistance.
                </Typography>

                {pageType === "new" ? (
                  <Link
                    to="/reproductions/select-paper/new"
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Create this section</Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      to={`/reproductions/select-paper/edit/${userPaperID}`}
                      style={{ textDecoration: "none", marginRight: 10 }}
                    >
                      <Button variant="contained">Edit this section</Button>
                    </Link>

                    <Link
                      to={`/reproductions/select-paper/view/${userPaperID}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">View this section</Button>
                    </Link>
                  </>
                )}
              </StepContent>
            </Step>
            <Step>
              <Box display={"flex"}>
                {" "}
                <StepLabel>
                  <Typography fontWeight={700}>Scoping</Typography>
                </StepLabel>
                <Link
                  style={{ display: "inline-block" }}
                  to={`/reproductions/scoping/view/${userPaperID}`}
                >
                  <VisibilityIcon
                    fontSize="medium"
                    sx={{ mt: 1, mx: 1, color: "primary.main" }}
                  />
                </Link>
              </Box>
              <StepContent>
                <Typography>
                  Focusing on the declared paper from the previous stage, define
                  the scope of your exercise by identifying the display items
                  and claims on which you will focus in the later stages. See
                  detailed guidance here.
                </Typography>

                <>
                  <Link
                    to={`/reproductions/scoping/edit/${userPaperID}`}
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>

                  <Link
                    to={`/reproductions/scoping/view/${userPaperID}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">View this section</Button>
                  </Link>
                </>
              </StepContent>
            </Step>
            {/* step3 */}
            <Step>
              <StepLabel>
                <Typography fontWeight={700}>Assessment</Typography>
              </StepLabel>
              {/* <VisibilityIcon /> */}
              <StepContent>
                <Typography>
                  Describe in detail the available reproduction materials and
                  assign a reproducibility score to the display items that you
                  reviewed in the previous stage, as well as the overall paper.
                  See detailed guidance here.
                </Typography>
                {/* <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </> */}
              </StepContent>
            </Step>
            {/* step4 */}
            <Step>
              <StepLabel>
                <Typography fontWeight={700}>Improvement</Typography>
              </StepLabel>
              {/* <VisibilityIcon /> */}
              <StepContent>
                <Typography>
                  Record and/or propose ways to improve the reproducibility of
                  individual display items and/or the overall paper. See
                  detailed guidance here
                </Typography>
                {/* <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </> */}
              </StepContent>
            </Step>
            {/* step5 */}
            <Step>
              <StepLabel>
                <Typography fontWeight={700}>Robustness</Typography>
                {/* <VisibilityIcon /> */}
              </StepLabel>
              <StepContent>
                <Typography>
                  Assess the robustness of claims by modifying analytic choices
                  and reporting their subsequent effects on the estimates of
                  interest, i.e. conducting robustness checks. See detailed
                  guidance here.
                </Typography>
                {/* <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </> */}
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Container>
    </div>
  );
};

export default SelectPaperOverview;
