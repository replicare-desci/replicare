import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../../context/ContextProvider";
import React, { useState } from "react";
import TableData from "./TableData";

const OutlineClaimsStepThree = () => {
  const { store, setStore } = UserContext();

  // handle change
  const OutlineClaimsChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    console.log(name, value);

    setStore((prevState: any) => {
      return {
        ...prevState,

        paperData: {
          ...prevState?.paperData,
          claims: {
            ...prevState?.paperData?.claims,
            [name]: value,
          },
        },
      };
    });
  };

  return (
    <Box boxShadow={1} border={1} p={2} my={4}>
      <Typography variant="h5" fontWeight={600}>
        Outline claims
      </Typography>
      <Box my={1}>
        <Typography>
          These are the claims you will assess as part of this reproduction
          attempt. The number of claims here depend on your answers to questions
          1.10 and 1.12.
        </Typography>
      </Box>
      <Box my={4}>
        {" "}
        <FormControl fullWidth>
          <FormLabel>
            <b>3.1.1. </b>Provide a one-sentence summary of the claim you will
            be assessing.
          </FormLabel>
          <Typography variant="caption" my={2}>
            Structure your summary as follows: "The paper tested the effect of X
            on Y for population P, using method M. The main results show an
            effect of magnitude E (specify units and standard errors)" or "The
            paper estimated the value of Y (estimated or predicted) for
            population P under dimensions X using method M. The main results
            presented an estimate of of magnitude E (specify units and standard
            errors)". Make sure to use the same units of measurement for all of
            the scientific claims that you will analyze as part of the entire
            exercise.
          </Typography>
          <TextField
            placeholder="Summary"
            name="claimSummary"
            id="claimSummary"
            required
            value={
              store?.paperData?.claims?.claimSummary
                ? store?.paperData?.claims?.claimSummary
                : ""
            }
            type="text"
            onChange={OutlineClaimsChangeHandler}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormLabel>
            <b>3.1.2. </b>Provide your own short title for the claim.
          </FormLabel>
          <TextField
            placeholder="e.g. effects of wages"
            type="text"
            required
            name="short_description"
            id="short_description"
            label="Short title of the claim"
            onChange={OutlineClaimsChangeHandler}
            value={
              store?.paperData?.claims?.short_description
                ? store?.paperData?.claims?.short_description
                : ""
            }
            sx={{ my: 1 }}
          />
        </FormControl>{" "}
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormLabel>
            <b>3.1.3. </b>For this claim: describe the population for which the
            estimates apply.
          </FormLabel>
          <TextField
            placeholder="e.g. low income households in oregen below the poverty line , that apply for and make use of a specific benefit"
            type="text"
            required
            onChange={OutlineClaimsChangeHandler}
            name="focused_population"
            value={
              store?.paperData?.claims?.focused_population
                ? store?.paperData?.claims?.focused_population
                : ""
            }
            sx={{ my: 1 }}
          />
        </FormControl>{" "}
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormLabel>
            <b>3.1.4. </b>Did the author(s) identify a preferred analytical
            specification, i.e., a specific regression model estimated for this
            claim you will be assessing?
          </FormLabel>
          <RadioGroup
            name="identified_preferred_specification"
            id="identified_preferred_specification"
            onChange={OutlineClaimsChangeHandler}
            value={
              store?.paperData?.claims?.identified_preferred_specification
                ? store?.paperData?.claims?.identified_preferred_specification
                : ""
            }
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
            <FormControlLabel
              value="I'm not sure"
              control={<Radio />}
              label="I'm not sure"
            />
          </RadioGroup>
        </FormControl>{" "}
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormLabel>
            <b>3.1.5. </b>In addition to the preferred specification, choose up
            to five additional specifications of the estimate for this claim you
            will be assessing and report them below. If there is no clear
            preferred specification by the authors, then choose one yourself.
          </FormLabel>
          <Typography variant="body1" fontWeight={"500"} mt={1}>
            For the Name field, you must use the exact name from the paper. This
            name is significant for the assessment stage.
          </Typography>{" "}
          <Typography variant="body1" fontWeight={"500"} mt={1}>
            Do not include the caption e.g. if the full label is "Table 2 —
            Railroads and Trade Costs: Step 1", only use the name "Table 2".
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
            files, populate them locally on your computer, and then upload them
            accordingly. When editing the .csv file, do not add additional rows
            or change the variable names in the first column.
          </Typography>
          <TableData />
        </FormControl>{" "}
        <FormControl fullWidth sx={{ my: 2 }}>
          <FormLabel>
            <b>3.1.6. </b>How confident are you in your categorization of the
            primary econometric method above?
          </FormLabel>
          <Box display={"flex"} m={2}>
            <Typography>Low Confidence</Typography>
            <Slider
              aria-label="Confidence level"
              name="econometric_categorization_confidence"
              id="econometric_categorization_confidence"
              // FIXME: not working

              defaultValue={
                store?.paperData?.claims?.econometric_categorization_confidence
                  ? store?.paperData?.claims
                      ?.econometric_categorization_confidence
                  : 3
              }
              onClick={() => OutlineClaimsChangeHandler}
              valueLabelDisplay="on"
              step={1}
              sx={{ width: "70%", mx: 5 }}
              marks
              min={1}
              max={5}
            />
            <Typography>High Confidence</Typography>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default OutlineClaimsStepThree;
