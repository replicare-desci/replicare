import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate, useParams } from "react-router-dom";

const steps = [
  "Describe input",
  "Describe code",
  "Diagram builder",
  "Master script",
  "Access display item",
  "Paper level reproducibility",
];

export default function AssessmentStepper({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const { userPaperID } = useParams();
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 3) {
      navigate(`/reproductions/edit/${userPaperID}`);
      // console.log("s");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box>
              <Link to={`/reproductions/edit/${userPaperID}`}>
                <Button variant="contained" sx={{ marginX: 1 }}>
                  return to stages overview
                </Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {" "}
            <Link to={`/reproductions/edit/${userPaperID}`}>
              <Button variant="contained" sx={{ marginX: 1 }}>
                return to stages overview
              </Button>
            </Link>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
              sx={{
                mr: 1,
                backgroundColor: "background.paper",
                color: "primary.light",
                ":hover": {
                  backgroundColor: "background.paper",
                  opacity: 0.7,
                },
              }}
            >
              Previous step
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                backgroundColor: "primary.dark",
                color: "primary.light",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next Step"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
