import React from "react";
import { Typography, Grid, List, Box, Stepper, Button } from "@mui/material";

import { paperData } from "../../../types/index.d";
import SaveIcon from "@mui/icons-material/Save";

// TODO: need to update fields

const ViewStepOne = ({
  userPaperData,
  setUserPaperData,
}: {
  userPaperData: paperData;
  setUserPaperData: any;
}) => {
  return (
    <>
      <Typography variant={"h5"} component="h6" p={2}>
        Summarize paper
      </Typography>
      <Grid container>
        <List component="ol">
          <Box>
            <Typography sx={{ my: 1 }}>
              <b>1.1</b> Please give your reproduction attempt a nickname that
              you can use for identification on the "My Work" page and the
              database of reproductions. We recommend using the convention of
              "Reproduction of '[Paper Title]'" or "Reproduction of [Author
              LastName, (YYYY)]."
            </Typography>
            <Box p={1} boxShadow={1} py={2} border={1}>
              {userPaperData?.project_nickname ? (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {userPaperData?.project_nickname}
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  N/A
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.2</b> When did you start this exercise? (The exercise
                started when you began reviewing candidate papers in stage 0.)
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.start_date ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.start_date}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.3</b> When do you expect to complete this exercise? This
                includes your work on all stages of the activity, including
                Scoping, Assessment, Improvements, and (optionally) Robustness.
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.end_date ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.end_date}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.4</b> How many hours in total do you expect to work on this
                project from start to finish?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.expected_total_hours ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.expected_total_hours}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.5</b> How would you rate your familiarity with this paper?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.familiarity_level ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.familiarity_level}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.6</b>How many display items (tables, figures and inline
                results) are included in the paper's main body?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.outputs.num_tables_body ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.outputs.num_tables_body}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.7</b> How many display items (tables and figures) are
                included in the paper's appendix?
              </Typography>

              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.outputs.num_tables_appendix ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.project_nickname}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.8</b>Describe the main population that is the focus of the
                paper as a whole. The population is usually described in the
                paper's introduction or motivation.
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.whole_population ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.whole_population}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.9</b> To which other populations do you think that the
                results of the paper can be applied (generalized)?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.additional_population ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.additional_population}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.10</b> According to your reading of the paper, how many
                scientific claims (descriptive or causal) are investigated in
                the paper?
              </Typography>
              <Typography sx={{ fontSize: 14 }} variant="body1">
                A research claim is a single major finding from a published
                study (for example, a journal article), as well as details of
                the methods and results that support this finding. A research
                claim is not equivalent to an entire article and sometimes the
                claim as described in the abstract does not exactly match the
                claim that is tested. Identifying them may require some
                subjective judgment on your part. For reference, scientific
                claims are typically structured as the following: "This paper
                estimates the effect of X on Y for population P, using method F"
                or "This paper estimates the value of Y (estimated or predicted)
                for population P under condition X using method M."
              </Typography>
              <Typography variant="body2" my={2}>
                ⚠️ This number (minimum value of 1) may affect the number of
                claims in step 3 - Outline Claims. If you change this value
                after editing that section, you risk data loss. Exercise caution
                ⚠️
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.num_claims ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.num_claims}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.11</b> Would you classify the paper's scientific claims as
                mainly focused on estimating a causal relationship,
                estimating/predicting a descriptive statistic of a population,
                or something else?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.claim_type_other_description ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.claim_type_other_description}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                <b>1.12</b> Do you plan to investigate the entire paper?
              </Typography>
              <Box p={1} boxShadow={1} py={2} border={1}>
                {userPaperData?.num_claims_will_assess ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {userPaperData?.num_claims_will_assess}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    N/A
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </List>
        <Box>
          <Box>
            <Typography sx={{ my: 1 }}>
              <b>1.13 Optional:</b>We recommend writing a short summary of the
              paper since that can help you identify the key elements of the
              paper and allow you to demonstrate your understanding of the
              paper. In your summary, try to address the following:
            </Typography>
            <List
              component="ol"
              sx={{
                listStyleType: "disc",
                listStylePosition: "inside",
              }}
            >
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  How many scientific claims (descriptive or causal) are
                  investigated in the paper?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What is the population for which the estimates apply?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What is the population that is the focus of the paper as a
                  whole?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What are the main data sources used in the paper?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  How many display items are there in the paper (tables,
                  figures, and inline results)?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What is the main statistical or econometric method used to
                  examine each claim?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What is the author’s preferred specification (or yours, if the
                  authors are not clear)?
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ display: "list-item" }}>
                  What are some robustness checks for the preferred
                  specification?"
                </Typography>
              </Box>
            </List>
            <Typography variant="body1">
              See more in the
              <span>
                <a
                  style={{
                    textDecoration: "none",
                    color: "#3234df",
                  }}
                  href="https://docs.replicare.dev"
                >
                  &nbsp;docs
                </a>
              </span>
            </Typography>
            <Typography variant="overline">
              Please limit your write-up to 1,000 words or less in a plaintext
              format. We recommend you draft your summary in another editor and
              paste the contents here afterwards.
            </Typography>
            <Box sx={{ my: 1 }} />
          </Box>
          <Box p={1} boxShadow={1} py={6} mb={6} border={1}>
            {userPaperData?.summary ? (
              <Typography variant="body1" sx={{ mb: 1 }}>
                {userPaperData?.summary}
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ mb: 1 }}>
                N/A
              </Typography>
            )}
          </Box>
        </Box>
        <Stepper />
      </Grid>
    </>
  );
};

export default ViewStepOne;
