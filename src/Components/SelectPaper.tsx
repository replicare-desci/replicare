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
} from "@mui/material";

const SelectPaper = () => {
  // type doiStringProps = {
  //   doi: string,
  //   doiString: string,
  //   doiStringFetch: () => Promise<string>,
  //   doiStringFetchError: () => Promise<string>,
  //   doiStringFetchErrorMessage: string,
  // }
  const [doiString, setDoiString] = useState<string>();
  const [getDoi, setDoi] = useState<boolean>(false);
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
              // dateTime: newResponse.message.license[0].start.dateTime,
              publisher: newResponse.message.publisher,
              nameOfJournal: newResponse.message.shortContainerTitle[0],
              title: newResponse.message.title[0],
              author: `${newResponse.message.author[0].given} ${newResponse.message.author[0].family}`,
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
                Enter the{" "}
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
                    // defaultValue={new Date(doiResponse?.dateTime).getFullYear()}
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
          </List>
        </Grid>
      </Container>
    </div>
  );
};

export default SelectPaper;
