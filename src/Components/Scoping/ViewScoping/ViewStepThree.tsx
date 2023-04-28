import {
  Box,
  Button,
  Container,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { paperData } from "../../../types/index.d";
function ViewStepThree({
  userPaperData,
  setUserPaperData,
}: {
  userPaperData: paperData;
  setUserPaperData: any;
}) {
  return (
    <Container>
      {/* <Button>claims2</Button> */}
      <Typography variant="h6" my={2}>
        Outline claims
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <Box>
          <Box>
            <Typography>
              <b>3.1.1. </b>Provide a one-sentence summary of the claim you will
              be assessing.
            </Typography>
            <Typography variant="caption" my={2}>
              Structure your summary as follows: "The paper tested the effect of
              X on Y for population P, using method M. The main results show an
              effect of magnitude E (specify units and standard errors)" or "The
              paper estimated the value of Y (estimated or predicted) for
              population P under dimensions X using method M. The main results
              presented an estimate of of magnitude E (specify units and
              standard errors)". Make sure to use the same units of measurement
              for all of the scientific claims that you will analyze as part of
              the entire exercise.
            </Typography>
            <TextField placeholder="Summary" />
          </Box>
          <Box>
            <Typography>
              <b>3.1.2. </b>Provide your own short title for the claim.
            </Typography>
            <TextField
              placeholder="e.g. effects of wages"
              label="Short title of the claim"
              sx={{ my: 1 }}
            />
          </Box>
          <Box>
            <Typography>
              <b>3.1.3. </b>For this claim: describe the population for which
              the estimates apply.
            </Typography>
            <TextField
              placeholder="e.g. low income households in oregen below the poverty line , that apply for and make use of a specific benefit"
              sx={{ my: 1 }}
            />
          </Box>
          <Box>
            <Typography>
              <b>3.1.4. </b>Did the author(s) identify a preferred analytical
              specification, i.e., a specific regression model estimated for
              this claim you will be assessing?
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>3.1.5. </b>In addition to the preferred specification, choose
              up to five additional specifications of the estimate for this
              claim you will be assessing and report them below. If there is no
              clear preferred specification by the authors, then choose one
              yourself.
            </Typography>
            <Typography variant="body1" fontWeight={"500"} mt={1}>
              For the Name field, you must use the exact name from the paper.
              This name is significant for the assessment stage.
            </Typography>
            <Typography variant="body1" fontWeight={"500"} mt={1}>
              Do not include the caption e.g. if the full label is "Table 2 —
              Railroads and Trade Costs: Step 1", only use the name "Table 2".
            </Typography>
            <Typography variant="body1" fontWeight={"500"} mt={1}>
              For econometric method below, IV=instrumental variables,
              DD=difference in differences, PSM=propensity score matching,
              RCT=randomized controlled trial, RDD=regression discontinuity
              design, OLS=ordinary least squares.
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"500"}
              mt={4}
              color={"background.paper"}
            >
              Note that the data inputted doesn't save automatically. Please
              remember to save your work often or download the template .csv
              files, populate them locally on your computer, and then upload
              them accordingly. When editing the .csv file, do not add
              additional rows or change the variable names in the first column.
            </Typography>
          </Box>
          <Box>
            <Typography>
              <b>3.1.6. </b>How confident are you in your categorization of the
              primary econometric method above?
            </Typography>
            <Box display={"flex"} m={2}>
              <Typography>Low Confidence</Typography>

              <Typography>High Confidence</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ViewStepThree;
