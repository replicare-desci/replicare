import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TableData from "./TableData";

const OutlineClaimsStepThree = () => {
  const [isClaims, setClaims] = useState(1);

  const setTotalClaims = () => {
    setClaims(2);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <Container>
      <Button onClick={setTotalClaims}>claims2</Button>
      <Typography variant="h6">Outline claims</Typography>
      <Box my={1}>
        <Typography>
          These are the claims you will assess as part of this reproduction
          attempt. The number of claims here depend on your answers to questions
          1.10 and 1.12.
        </Typography>
      </Box>
      {isClaims === 1 ? (
        <>
          {" "}
          <Box my={2}>
            <Typography>
              This reproduction attempt doesn't have any claims associated with
              it yet. Answer questions 1.10 and 1.12 to set the number of claims
              you will assess here.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Box boxShadow={1} p={2}>
              <FormControl fullWidth>
                <FormLabel>
                  <b>3.1.1. </b>Provide a one-sentence summary of the claim you
                  will be assessing.
                </FormLabel>
                <Typography variant="caption" my={2}>
                  Structure your summary as follows: "The paper tested the
                  effect of X on Y for population P, using method M. The main
                  results show an effect of magnitude E (specify units and
                  standard errors)" or "The paper estimated the value of Y
                  (estimated or predicted) for population P under dimensions X
                  using method M. The main results presented an estimate of of
                  magnitude E (specify units and standard errors)". Make sure to
                  use the same units of measurement for all of the scientific
                  claims that you will analyze as part of the entire exercise.
                </Typography>
                <TextField placeholder="Summary" />
              </FormControl>
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>
                  <b>3.1.2. </b>Provide your own short title for the claim.
                </FormLabel>
                <TextField
                  placeholder="e.g. effects of wages"
                  label="Short title of the claim"
                  sx={{ my: 1 }}
                />
              </FormControl>{" "}
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>
                  <b>3.1.3. </b>For this claim: describe the population for
                  which the estimates apply.
                </FormLabel>
                <TextField
                  placeholder="e.g. low income households in oregen below the poverty line , that apply for and make use of a specific benefit"
                  sx={{ my: 1 }}
                />
              </FormControl>{" "}
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>
                  <b>3.1.4. </b>Did the author(s) identify a preferred
                  analytical specification, i.e., a specific regression model
                  estimated for this claim you will be assessing?
                </FormLabel>
                <RadioGroup>
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />{" "}
                  <FormControlLabel value="No" control={<Radio />} label="No" />{" "}
                  <FormControlLabel
                    value="I'm not sure"
                    control={<Radio />}
                    label="I'm not sure"
                  />
                </RadioGroup>
              </FormControl>{" "}
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>
                  <b>3.1.5. </b>In addition to the preferred specification,
                  choose up to five additional specifications of the estimate
                  for this claim you will be assessing and report them below. If
                  there is no clear preferred specification by the authors, then
                  choose one yourself.
                </FormLabel>
                <Typography variant="body1" fontWeight={"500"} mt={1}>
                  For the Name field, you must use the exact name from the
                  paper. This name is significant for the assessment stage.
                </Typography>{" "}
                <Typography variant="body1" fontWeight={"500"} mt={1}>
                  Do not include the caption e.g. if the full label is "Table 2
                  — Railroads and Trade Costs: Step 1", only use the name "Table
                  2".
                </Typography>{" "}
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
                  additional rows or change the variable names in the first
                  column.
                </Typography>
                <TableData />
              </FormControl>{" "}
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel>
                  <b>3.1.6. </b>How confident are you in your categorization of
                  the primary econometric method above?
                </FormLabel>
                <Box display={"flex"} m={2}>
                  <Typography>Low Confidence</Typography>
                  <Slider
                    aria-label="Confidence level"
                    defaultValue={3}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                    step={1}
                    sx={{ width: "70%", mx: 5 }}
                    marks
                    min={1}
                    max={5}
                  />{" "}
                  <Typography>High Confidence</Typography>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default OutlineClaimsStepThree;
