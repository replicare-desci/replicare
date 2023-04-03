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
import { Link, useParams } from "react-router-dom";
// const steps = [
//   {
//     label: "Select campaign settings",
//     description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//   },
//   {
//     label: "Create an ad group",
//     description:
//       "An ad group contains one or more ads which target a shared set of keywords.",
//   },
//   {
//     label: "Create an ad",
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];
const SelectAPaper = () => {
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
      {/* <div>SelectAPaper</div> */}
      <Container>
        {/* <Box sx={{ maxWidth: 400 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box> */}
        <Grid container py={12}>
          <Typography variant="h5" component="h1">
            Create a reproduction attempt
          </Typography>
          <Grid item xs={12} xl={12} p={2}>
            <Typography variant="body1" p={1}>
              Step 1: Declare a paper
            </Typography>
            <Typography variant="body2" p={1}>
              Specify the research paper that you will analyze and provide some
              basic information about its reproduction package. Please refer to
              the documentation provided for further assistance.
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SelectAPaper;
