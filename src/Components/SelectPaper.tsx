import React, { useState } from "react";
import { fetchDoi } from "../api/fetchDOI";
import { camelizeKeys } from "../utils/changeCase";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
  Checkbox,
} from "@mui/material";

const SelectPaper = () => {
  // type doiStringProps = {
  //   doi: string,
  //   doiString: string,
  //   doiStringFetch: () => Promise<string>,
  //   doiStringFetchError: () => Promise<string>,
  //   doiStringFetchErrorMessage: string,
  // }

  const [isReproductionPackageAvailable, setReproductionPackageAvailable] =
    useState<boolean>(false);
  const [doiString, setDoiString] = useState<string>();
  const [getDoi, setDoi] = useState<boolean>(false);
  const [isDisabled12, setDisabled12] = useState<boolean>(false);
  const [isDisabled13, setDisabled13] = useState<boolean>(false);
  const [isDisabled16, setDisabled16] = useState<boolean>(false);
  const [isChecked141, setChecked141] = useState<boolean>(false);
  const disableClick = (toggle: boolean, count: string) => {
    if (count === "1.2") {
      setDisabled12(toggle);
    } else if (count === "1.3") {
      setDisabled13(toggle);
    } else if (count === "1.6") {
      setDisabled16(toggle);
    } else if (count === "1.41") {
      setChecked141(toggle);
    }
    // event.preventDefault();
  };

  const [doiResponse, setDoiResponse] = useState({
    dateTime: "",
    publisher: "",
    title: "",
    author: "",
    doi: "",
    nameOfJournal: "",
  });
  const [isError, setError] = useState<boolean>(false);
  function submitHandler(event: any) {
    event.preventDefault();

    if (
      typeof doiString !== "undefined" &&
      doiString !== null &&
      doiString.length > 0
    ) {
      fetchDoi(doiString)
        .then(function (response: any) {
          setError(false);
          console.log("fetchDoi", response);
          setDoi((prev) => !prev);
          const newResponse = camelizeKeys(response);
          setDoiResponse((prev: any) => {
            return {
              ...prev,
              dateTime: newResponse.message.created.dateTime,
              publisher: newResponse.message.publisher,
              nameOfJournal: newResponse.message.shortContainerTitle[0],
              title: newResponse.message.title[0],
              author: `${newResponse.message.author
                .map((author: any) => `${author.given} ${author.family}`)
                .join(", ")}`,

              doi: newResponse.message.doi,
            };
          });
        })
        .catch(function (error: any) {
          setError(true);
          console.log("fetchDoi error", error);
        });
    } else {
      setError(true);
    }

    // message->indexed->date-time
    // publisher
    // short-container-title
    // doi
    // title [0]
    // autour[0] -> given , family
  }
  console.log(doiResponse);

  return (
    <div>
      <Container>
        <Typography variant="h3" component={"h1"} textAlign={"center"} py={2}>
          Select a paper
        </Typography>
        <Typography variant={"subtitle1"}>
          Declare the paper that you will analyze in the remainder of the
          exercise and record other "candidate" papers for which you were unable
          to obtain access to a reproduction package. See detailed guidance
          here.
        </Typography>{" "}
        <Typography variant={"h6"} component="h6">
          Basic information
        </Typography>
        <Typography variant={"subtitle1"}>
          At this point, you are not expected to review the reproduction
          materials in detail, as you will dedicate most of your time to this in
          later stages of the exercise. If materials are available, you will
          declare this paper as your target to reproduce. Only then you will be
          asked to read the paper and define the scope of the reproduction
          exercise.
        </Typography>
        <Grid container my={12}>
          <List>
            <ListItem>
              <ListItemText>
                1.1 Enter the{" "}
                <span>
                  <a
                    href="https://en.wikipedia.org/wiki/Digital_object_identifier"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    DOI
                  </a>
                </span>{" "}
                for the paper that you have chosen to reproduce for this
                activity and we will fetch some basic information. Please use
                the prefix/suffix notation, e.g. 10.1257/aer.20101199.
              </ListItemText>
            </ListItem>
            <ListItem>
              <form
                method="post"
                onSubmit={submitHandler}
                style={{ width: "100%" }}
              >
                <TextField
                  label="Digital Object Identifier (or URL if no DOI available)"
                  variant="standard"
                  fullWidth
                  id="doi"
                  name="doi"
                  onChange={(e: any) => setDoiString(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: "20%" }}
                      >
                        Search DOI
                      </Button>
                    ),
                  }}
                />
              </form>
            </ListItem>{" "}
            <p style={{ color: "red", textAlign: "center" }}>
              {isError ? "Please enter DOI " : null}
            </p>
            {getDoi && Object.keys(doiResponse).length > 0 ? (
              <>
                <ListItem>
                  <TextField
                    label="Title of the paper
"
                    defaultValue={doiResponse?.title}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>{" "}
                <ListItem>
                  <TextField
                    label="Name of the journal or publication
"
                    defaultValue={doiResponse?.nameOfJournal}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>{" "}
                <ListItem>
                  <TextField
                    label="Digital Object Identifier (or URL if no DOI available)
"
                    defaultValue={doiResponse?.doi}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Year of Publication
"
                    defaultValue={new Date(doiResponse?.dateTime).getFullYear()}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Authors
"
                    defaultValue={doiResponse?.author}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>
              </>
            ) : null}
            {/* doi fetch ends here  */}
          </List>
          <List>
            <ListItem>
              <FormControl>
                <FormLabel id="reproduction-package-available?">
                  1.2 is a reproduction package available for this paper?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    onClick={() => {
                      setReproductionPackageAvailable(() => true);
                      disableClick(true, "1.2");
                    }}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    onClick={() => {
                      setReproductionPackageAvailable(() => false);
                      disableClick(false, "1.2");
                    }}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl disabled={isDisabled12}>
                <FormLabel id="permission">
                  1.3 Have you contacted the authors for a reproduction package?
                  Consult the ACRe Guide for recommendations on contacting
                  authors.
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    onClick={() => {
                      disableClick(false, "1.3");
                    }}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    onClick={() => {
                      disableClick(true, "1.3");
                    }}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormHelperText>
                *Wait a few weeks for the authors to reply, then summarize your
                interaction below.
              </FormHelperText>
            </ListItem>
            <ListItem>
              <FormControl disabled={isDisabled12 || isDisabled13}>
                <FormLabel>
                  1.4 How did the authors respond? Select all that apply.
                </FormLabel>
                <FormControlLabel
                  control={<Checkbox />}
                  onClick={() => setDisabled16(true)}
                  label="Provided reproduction package."
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Declined to share reproduction package, citing legal or ethical reasons."
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Declined to share reproduction package but did not provide a reason.
"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Declined to share the missing materials, citing not ready to share. Record date when you estimate that the authors may be ready to share the missing materials:

"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Author(s) state that they no longer have access to the data.
"
                />{" "}
                <FormControlLabel
                  control={<Checkbox />}
                  label="Shared detailed instructions on how to access the data (for restricted access only).

"
                />{" "}
                <FormControlLabel
                  control={<Checkbox />}
                  label="Did not respond. As of:"
                />
                <FormControlLabel control={<Checkbox />} label="Other " />
                <TextField placeholder="(Explain Briefly)" />
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl disabled={isDisabled12 || isDisabled13}>
                <FormLabel id="permission">
                  1.5 Are the authors available for further questions for ACRe
                  reproductions?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl disabled={isDisabled12}>
                <FormLabel id="permission">
                  1.6 If there are no reproduction packages, are you willing to
                  build a reproduction package from scratch?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="yes"
                    onClick={() => setDisabled16(true)}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="no"
                    onClick={() => setDisabled16(false)}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
            {isDisabled16 ? (
              <ListItem>
                <Button variant="contained">
                  You can declare this paper and continue the scoping portion of
                  the exercise.
                </Button>
              </ListItem>
            ) : null}
            {isReproductionPackageAvailable ? (
              <ListItem sx={{ boxShadow: 1 }}>
                <FormControl fullWidth sx={{ py: 1 }}>
                  <FormLabel>
                    {" "}
                    Record the main repository that stores the code for the
                    reproduction package provided by the authors.
                  </FormLabel>
                  <FormHelperText>
                    Contents of reproduction package
                  </FormHelperText>
                  <TextField
                    variant="standard"
                    placeholder="e.g. Main code repository with data"
                  ></TextField>
                  <TextField
                    variant="standard"
                    placeholder="e.g. https://github.com/paper/paper"
                  ></TextField>
                  <FormLabel>
                    Are there additional data in different repositories? Use the
                    button below to add links to these as well.
                  </FormLabel>{" "}
                  <Button variant="contained">
                    + Add additional reproduction packages for data
                  </Button>
                </FormControl>
              </ListItem>
            ) : null}
          </List>
        </Grid>
      </Container>
    </div>
  );
};

export default SelectPaper;
