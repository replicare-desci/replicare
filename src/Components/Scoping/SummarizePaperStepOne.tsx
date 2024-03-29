import React, { useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import {
  Typography,
  Grid,
  List,
  ListItem,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stepper,
} from "@mui/material";

const SummarizePaperStepOne = () => {
  const { store, setStore } = UserContext();
  const [claimTypeOther, setClaimTypeOther] = useState<string>("");
  const [otherTypeChecked, otherTypeSetChecked] = useState<boolean>(false);

  // handle change
  const summerizePaperChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setStore((prev: any) => {
      return {
        ...prev,
        paperData: {
          ...prev.paperData,
          [name]: value,
        },
      };
    });
  };
  console.log(store.paperData);

  return (
    <>
      <Box p={2} my={4} boxShadow={1} border={1}>
        <Typography variant={"h5"} component="h6" p={2} fontWeight={600}>
          Summarize paper
        </Typography>
        <Grid container component="form" noValidate>
          <List component="ol">
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
                  name="project_nickname"
                  value={
                    store?.paperData?.project_nickname
                      ? store?.paperData?.project_nickname
                      : ""
                  }
                  id="project_nickname"
                  onChange={summerizePaperChangeHandler}
                />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.2</b> When did you start this exercise? (The exercise
                  started when you began reviewing candidate papers in stage 0.)
                </FormLabel>
                <TextField
                  type="date"
                  variant="standard"
                  id="start_date"
                  name="start_date"
                  value={
                    store?.paperData?.start_date
                      ? store?.paperData?.start_date
                      : ""
                  }
                  onChange={summerizePaperChangeHandler}
                />
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
                <TextField
                  type="date"
                  variant="standard"
                  name="end_date"
                  id="end_date"
                  value={
                    store?.paperData?.end_date ? store?.paperData?.end_date : ""
                  }
                  onChange={summerizePaperChangeHandler}
                />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.4</b> How many hours in total do you expect to work on
                  this project from start to finish?
                </FormLabel>
                <TextField
                  type="number"
                  variant="standard"
                  name="expected_total_hours"
                  id="expected_total_hours"
                  value={
                    store?.paperData?.expected_total_hours
                      ? store?.paperData?.expected_total_hours
                      : 0
                  }
                  onChange={summerizePaperChangeHandler}
                />
              </FormControl>
            </ListItem>
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.5</b> How would you rate your familiarity with this
                  paper?
                </FormLabel>
                <RadioGroup
                  onChange={summerizePaperChangeHandler}
                  name="familiarity_level"
                  id="familiarity_level"
                  value={
                    store?.paperData?.familiarity_level
                      ? store?.paperData?.familiarity_level
                      : ""
                  }
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
                  <b>1.6</b>How many display items (tables, figures and inline
                  results) are included in the paper's main body?
                </FormLabel>
                <TextField
                  fullWidth
                  type={"number"}
                  required
                  name="num_tables_body"
                  id="num_tables_body"
                  label="# of tables included in the main body"
                  value={
                    store?.paperData?.outputs?.num_tables_body
                      ? store?.paperData?.outputs?.num_tables_body
                      : 0
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStore((prev: any) => {
                      return {
                        ...prev,
                        paperData: {
                          ...prev.paperData,
                          outputs: {
                            ...prev.paperData.outputs,
                            [e.target.name]: e.target.value,
                          },
                        },
                      };
                    })
                  }
                  variant="standard"
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  required
                  type={"number"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStore((prev: any) => {
                      return {
                        ...prev,
                        paperData: {
                          ...prev.paperData,
                          outputs: {
                            ...prev.paperData.outputs,
                            [e.target.name]: e.target.value,
                          },
                        },
                      };
                    })
                  }
                  name="num_figures_body"
                  id="num_figures_body"
                  label="# of figures included in the main body"
                  variant="standard"
                  value={
                    store?.paperData?.outputs?.num_figures_body
                      ? store?.paperData?.outputs?.num_figures_body
                      : 0
                  }
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  name="num_inline_results_body"
                  id="num_inline_results_body"
                  type={"number"}
                  value={
                    store?.paperData?.outputs?.num_inline_results_body
                      ? store?.paperData?.outputs?.num_inline_results_body
                      : 0
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStore((prev: any) => {
                      return {
                        ...prev,
                        paperData: {
                          ...prev.paperData,
                          outputs: {
                            ...prev.paperData.outputs,
                            [e.target.name]: e.target.value,
                          },
                        },
                      };
                    })
                  }
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
                  <b>1.7</b> How many display items (tables and figures) are
                  included in the paper's appendix?
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  name="num_tables_appendix"
                  id="num_tables_appendix"
                  label="# of tables included in appendix"
                  variant="standard"
                  value={
                    store?.paperData?.outputs?.num_tables_appendix
                      ? store?.paperData?.outputs?.num_tables_appendix
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStore((prev: any) => {
                      return {
                        ...prev,
                        paperData: {
                          ...prev.paperData,
                          outputs: {
                            ...prev.paperData.outputs,
                            [e.target.name]: e.target.value,
                          },
                        },
                      };
                    })
                  }
                  sx={{ py: 2 }}
                />
                <TextField
                  fullWidth
                  required
                  name="num_figures_appendix"
                  id="num_figures_appendix"
                  label="# of figures included in appendix"
                  variant="standard"
                  value={
                    store?.paperData?.outputs?.num_figures_appendix
                      ? store?.paperData?.outputs?.num_figures_appendix
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStore((prev: any) => {
                      return {
                        ...prev,
                        paperData: {
                          ...prev.paperData,
                          outputs: {
                            ...prev.paperData.outputs,
                            [e.target.name]: e.target.value,
                          },
                        },
                      };
                    })
                  }
                  sx={{ py: 2 }}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.8</b>Describe the main population that is the focus of
                  the paper as a whole. The population is usually described in
                  the paper's introduction or motivation.
                </FormLabel>
                <TextField
                  fullWidth
                  required
                  type="text"
                  placeholder="e.g. low income households in the US that are below the federal poverty line"
                  variant="standard"
                  sx={{ py: 2 }}
                  name="whole_population"
                  id="whole_population"
                  value={
                    store?.paperData?.whole_population
                      ? store?.paperData?.whole_population
                      : ""
                  }
                  onChange={summerizePaperChangeHandler}
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
                  type="text"
                  placeholder="e.g. low income households around the world"
                  variant="outlined"
                  sx={{ py: 2 }}
                  name="additional_population"
                  id="additional_population"
                  value={
                    store?.paperData?.additional_population
                      ? store?.paperData?.additional_population
                      : ""
                  }
                  onChange={summerizePaperChangeHandler}
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

                <TextField
                  fullWidth
                  sx={{ my: 2 }}
                  required
                  variant="standard"
                  name="num_claims"
                  id="num_claims"
                  type="number"
                  value={
                    store?.paperData?.num_claims
                      ? store?.paperData?.num_claims
                      : 1
                  }
                  onChange={summerizePaperChangeHandler}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.11</b> Would you classify the paper's scientific claims
                  as mainly focused on estimating a causal relationship,
                  estimating/predicting a descriptive statistic of a population,
                  or something else?
                </FormLabel>
                <RadioGroup
                  name="claim_type_other_description"
                  id="claim_type_other_description"
                  value={
                    store?.paperData?.claim_type_other_description
                      ? store?.paperData?.claim_type_other_description
                      : ""
                  }
                  onChange={summerizePaperChangeHandler}
                >
                  <FormControlLabel
                    value="This paper estimates the effect of X on Y for population P, using method M. Example: This paper investigates the impact of bicycle provision (X) on secondary school enrollment (Y) among young women in Bihar/India (P), using a Difference in Difference approach (M)."
                    control={
                      <Radio onChange={() => otherTypeSetChecked(false)} />
                    }
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
                    control={
                      <Radio onChange={() => otherTypeSetChecked(false)} />
                    }
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
                          anomalies in countries' portfolio investment positions
                          (M), I find that around 8% of the global financial
                          wealth of households is held in tax havens (Y) "
                        </Typography>
                      </Box>
                    }
                  />{" "}
                  {/* TODO: This field is not working if clicking both then its working otherwise not
                   */}
                  <FormControlLabel
                    sx={{ my: 1 }}
                    value={claimTypeOther ? claimTypeOther : ""}
                    control={
                      <Radio
                        checked={otherTypeChecked}
                        onChange={() => otherTypeSetChecked(true)}
                      />
                    }
                    label={
                      otherTypeChecked ? (
                        <TextField
                          fullWidth
                          name="claim_type_other_description"
                          onChange={(e) => setClaimTypeOther(e.target.value)}
                          label="Other"
                          variant="outlined"
                        />
                      ) : (
                        "Others"
                      )
                    }
                  />{" "}
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.12</b> Do you plan to investigate the entire paper?
                </FormLabel>
                <RadioGroup
                  name="will_assess_whole_paper"
                  id="will_assess_whole_paper"
                  value={
                    store?.paperData?.will_assess_whole_paper
                      ? store?.paperData?.will_assess_whole_paper
                      : ""
                  }
                  onChange={summerizePaperChangeHandler}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
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
                    What is the author's preferred specification (or yours, if
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
                name="summary"
                id="summary"
                value={
                  store?.paperData?.summary ? store?.paperData?.summary : ""
                }
                onChange={summerizePaperChangeHandler}
                type={"text"}
                variant="outlined"
                fullWidth
                multiline
                rows={10}
              />
            </FormControl>
          </ListItem>
          <Stepper />
        </Grid>
      </Box>
    </>
  );
};

export default SummarizePaperStepOne;
