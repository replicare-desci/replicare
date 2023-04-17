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
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";

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
  return (
    <div>
      {/* <div>SelectPaperOverview</div> */}
      <Container sx={{ py: 12 }}>
        <Typography variant="h5" component="h1" mb={3}>
          Create a reproduction attempt
        </Typography>

        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>
                Step 1:Declare a paper
                <VisibilityIcon fontSize="medium" />
              </StepLabel>

              <StepContent>
                <Typography>
                  Specify the research paper that you will analyze and provide
                  some basic information about its reproduction package. Please
                  refer to the documentation provided for further assistance.
                </Typography>

                {pageType === "new" ? (
                  <Link
                    to="/reproductions/index/new/select-paper"
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained">Create this section</Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/reproductions/index/edit/select-paper"
                      style={{ textDecoration: "none", marginRight: 10 }}
                    >
                      <Button variant="contained">Edit this section</Button>
                    </Link>

                    <Link
                      to={`/reproductions/index/view/${userPaperID}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">View this section</Button>
                    </Link>
                  </>
                )}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Step 2:Scoping</StepLabel>
              <StepContent>
                <Typography>
                  Focusing on the declared paper from the previous stage, define
                  the scope of your exercise by identifying the display items
                  and claims on which you will focus in the later stages. See
                  detailed guidance here.
                </Typography>
                <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </>
              </StepContent>
            </Step>
            {/* step3 */}
            <Step>
              <StepLabel>Step 3: Assessment</StepLabel>
              <StepContent>
                <Typography>
                  Describe in detail the available reproduction materials and
                  assign a reproducibility score to the display items that you
                  reviewed in the previous stage, as well as the overall paper.
                  See detailed guidance here.
                </Typography>
                <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </>
              </StepContent>
            </Step>
            {/* step4 */}
            <Step>
              <StepLabel>Step 4:Improvement</StepLabel>
              <StepContent>
                <Typography>
                  Record and/or propose ways to improve the reproducibility of
                  individual display items and/or the overall paper. See
                  detailed guidance here
                </Typography>
                <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </>
              </StepContent>
            </Step>
            {/* step5 */}
            <Step>
              <StepLabel>
                Step 5:Robustness
                <VisibilityIcon />
              </StepLabel>
              <StepContent>
                <Typography>
                  Assess the robustness of claims by modifying analytic choices
                  and reporting their subsequent effects on the estimates of
                  interest, i.e. conducting robustness checks. See detailed
                  guidance here.
                </Typography>
                <>
                  <Link
                    to="/reproductions/index/edit/scoping"
                    style={{ textDecoration: "none", marginRight: 10 }}
                  >
                    <Button variant="contained">Edit this section</Button>
                  </Link>
                </>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Container>
    </div>
  );
};

export default SelectPaperOverview;
