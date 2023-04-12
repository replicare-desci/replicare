import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";

import SaveIcon from "@mui/icons-material/Save";
import Stepper from "./Stepper";
const Scoping = () => {
  return (
    <>
      <Container>
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <Typography variant="h4" component={"h1"} textAlign={"center"} py={2}>
          Step 2 : Scoping
        </Typography>
        <Typography variant={"subtitle2"} p={2}>
          Focusing on the declared paper from the previous stage, define the
          scope of your exercise by identifying the display items and claims on
          which you will focus in the later stages. See detailed guidance here.
        </Typography>{" "}
        <Stepper />
        <Typography variant={"h5"} component="h6" p={2}>
          Summarize paper
        </Typography>
        <Grid container component="form" noValidate>
          <List component="ol">
            {" "}
            <ListItem component="li">
              <FormControl>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.1</b> Please give your reproduction attempt a nickname
                  that you can use for identification on the "My Work" page and
                  the database of reproductions. We recommend using the
                  convention of "Reproduction of '[Paper Title]'" or
                  "Reproduction of [Author LastName, (YYYY)]."
                </FormLabel>
                <TextField
                  label="e.g. Railroads of the Rah Attempt #1- Jan 2021"
                  type={"text"}
                  variant="standard"
                  fullWidth
                  required
                />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.2</b> When did you start this exercise? (The exercise
                  started when you began reviewing candidate papers in stage 0.)
                </FormLabel>
                <TextField type="date" variant="standard" />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.3</b> When do you expect to complete this exercise? This
                  includes your work on all stages of the activity, including
                  Scoping, Assessment, Improvements, and (optionally)
                  Robustness.
                </FormLabel>
                <TextField type="date" variant="standard" />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.4</b> How many hours in total do you expect to work on
                  this project from start to finish?
                </FormLabel>
                <TextField type="number" variant="standard" />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.5</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <RadioGroup
                  defaultValue=""
                  // onChange={formDataHandler}
                  name="buildFromScratch"
                >
                  <FormControlLabel
                    value="I have never read the paper, nor attempted to reproduce any of the analyses."
                    control={<Radio />}
                    label="I have never read the paper, nor attempted to reproduce any of the analyses."
                  />
                  <FormControlLabel
                    value="I have read the paper, but have not attempted to reproduce any of the analyses."
                    control={<Radio />}
                    label="I have read the paper, but have not attempted to reproduce any of the analyses."
                  />{" "}
                  <FormControlLabel
                    value="I have read the paper and have attempted to reproduce some of the analyses."
                    control={<Radio />}
                    label="I have read the paper and have attempted to reproduce some of the analyses."
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.6</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  label="# of tables included in the main body
"
                  variant="standard"
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  required
                  label="# of figures included in the main body
"
                  variant="standard"
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  required
                  label="# of inline results are included in the main body"
                  variant="standard"
                  sx={{ py: 2 }}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.7</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  label="# of tables included in appendix"
                  variant="standard"
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  required
                  label="# of figures included in appendix"
                  variant="standard"
                  sx={{ py: 2 }}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.8</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  placeholder="e.g. low income households in the US that are below the federal poverty line"
                  variant="standard"
                  sx={{ py: 2 }}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.9</b> To which other populations do you think that the
                  results of the paper can be applied (generalized)?
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  placeholder="e.g. low income households around the world"
                  variant="outlined"
                  sx={{ py: 2 }}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.10</b> According to your reading of the paper, how many
                  scientific claims (descriptive or causal) are investigated in
                  the paper?
                </FormLabel>
                <Typography sx={{ fontSize: 14 }} variant="body1">
                  A research claim is a single major finding from a published
                  study (for example, a journal article), as well as details of
                  the methods and results that support this finding. A research
                  claim is not equivalent to an entire article and sometimes the
                  claim as described in the abstract does not exactly match the
                  claim that is tested. Identifying them may require some
                  subjective judgment on your part. For reference, scientific
                  claims are typically structured as the following: "This paper
                  estimates the effect of X on Y for population P, using method
                  F" or "This paper estimates the value of Y (estimated or
                  predicted) for population P under condition X using method M."
                </Typography>
                <Typography variant="body2" my={2}>
                  ⚠️ This number (minimum value of 1) may affect the number of
                  claims in step 3 - Outline Claims. If you change this value
                  after editing that section, you risk data loss. Exercise
                  caution ⚠️
                </Typography>
                <TextField fullWidth required variant="standard" />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.11</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <RadioGroup
                  defaultValue=""
                  // onChange={formDataHandler}
                  name="buildFromScratch"
                >
                  <FormControlLabel
                    value="This paper estimates the effect of X on Y for population P, using method M. Example: This paper investigates the impact of bicycle provision (X) on secondary school enrollment (Y) among young women in Bihar/India (P), using a Difference in Difference approach (M)."
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={"600"}
                          sx={{ my: 1 }}
                        >
                          Causal claim
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                          This paper estimates the effect of X on Y for
                          population P, using method M. Example: "This paper
                          investigates the impact of bicycle provision (X) on
                          secondary school enrollment (Y) among young women in
                          Bihar/India (P), using a Difference in Difference
                          approach (M)."
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="This paper estimates the value of Y (estimated or predicted) for population P under conditions X (optional) using method M. Example: Drawing on a unique Swiss data set (P) and exploiting systematic anomalies in countries portfolio investment positions (M), I find that around 8% of the global financial wealth of households is held in tax havens (Y) 

                    "
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={"600"}
                          sx={{ my: 1 }}
                        >
                          Descriptive/predictive claim
                        </Typography>
                        <Typography variant="body2" sx={{ my: 1 }}>
                          This paper estimates the value of Y (estimated or
                          predicted) for population P under conditions X
                          (optional) using method M. Example: "Drawing on a
                          unique Swiss data set (P) and exploiting systematic
                          anomalies in countries’ portfolio investment positions
                          (M), I find that around 8% of the global financial
                          wealth of households is held in tax havens (Y) "
                        </Typography>
                      </Box>
                    }
                  />{" "}
                  <FormControl component="fieldset">
                    <RadioGroup
                    // value={value} onChange={handleChange}
                    >
                      <FormControlLabel
                        sx={{ my: 1 }}
                        value="option1"
                        control={<Radio />}
                        label={
                          <TextField
                            fullWidth
                            id="Other"
                            label="Other"
                            variant="outlined"
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.12</b> If there are no reproduction packages, are you
                  willing to build a reproduction package from scratch?
                </FormLabel>
                <RadioGroup
                  defaultValue=""
                  // onChange={formDataHandler}
                  name="buildFromScratch"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />{" "}
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
          </List>
          <ListItem component="li">
            <FormControl required fullWidth>
              <FormLabel sx={{ my: 1 }}>
                <b>1.13 Optional:</b>We recommend writing a short summary of the
                paper since that can help you identify the key elements of the
                paper and allow you to demonstrate your understanding of the
                paper. In your summary, try to address the following:
              </FormLabel>{" "}
              <List
                component="ol"
                sx={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
              >
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    How many scientific claims (descriptive or causal) are
                    investigated in the paper?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What is the population for which the estimates apply?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What is the population that is the focus of the paper as a
                    whole?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What are the main data sources used in the paper?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    How many display items are there in the paper (tables,
                    figures, and inline results)?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What is the main statistical or econometric method used to
                    examine each claim?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What is the author’s preferred specification (or yours, if
                    the authors are not clear)?
                  </Typography>
                </ListItem>{" "}
                <ListItem component="li">
                  <Typography sx={{ display: "list-item" }}>
                    What are some robustness checks for the preferred
                    specification?"
                  </Typography>
                </ListItem>
              </List>
              <Typography variant="body1">
                {" "}
                See more in the{" "}
                <span>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#3234df",
                    }}
                    href="https://docs.replicare.dev"
                  >
                    docs
                  </a>
                </span>
              </Typography>
              <Typography variant="overline">
                Please limit your write-up to 1,000 words or less in a plaintext
                format. We recommend you draft your summary in another editor
                and paste the contents here afterwards.
              </Typography>
              <TextField
                sx={{ my: 1 }}
                label="Summary"
                type={"text"}
                variant="outlined"
                fullWidth
                multiline
                rows={10}
              />
            </FormControl>
          </ListItem>
          <Stepper />

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
        </Grid>
      </Container>
    </>
  );
};

export default Scoping;
