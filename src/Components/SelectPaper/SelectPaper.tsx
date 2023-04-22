import React, { useState, useEffect } from "react";
import { fetchDoi } from "../../api/fetchDOI";
import { camelizeKeys } from "../../utils/changeCase";
import AdditionalInfo from "../AdditionalInfo";
import {
  addUserPaperData,
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
  Box,
} from "@mui/material";
import { doiData } from "../../types/index.d";
import { type } from "@testing-library/user-event/dist/type";

type checkBoxOption = {
  label: string;
};

const SelectPaper = () => {
  const { pageType, userPaperID } = useParams();

  const navigate = useNavigate();
  const checkBoxOptions: checkBoxOption[] = [
    {
      label: "Provided reproduction package.",
    },
    {
      label:
        "Declined to share reproduction package, citing legal or ethical reasons.",
    },
    {
      label:
        "Declined to share reproduction package but did not provide a reason.",
    },
    {
      label:
        "Declined to share the missing materials, citing not ready to share. Record date when you estimate that the authors may be ready to share the missing materials:",
    },
    {
      label: "Author(s) state that they no longer have access to the data.",
    },
    {
      label:
        "Shared detailed instructions on how to access the data (for restricted access only).",
    },
    {
      label: "Did not respond. As of:",
    },
  ];
  const [doiString, setDoiString] = useState<string>();
  const [getDoi, setDoi] = useState<boolean>(false);
  const [isDisabled12, setDisabled12] = useState<boolean>(false);
  const [isDisabled13, setDisabled13] = useState<boolean>(false);
  const [isDisabled16, setDisabled16] = useState<boolean>(false);
  const [isChecked141, setChecked141] = useState<boolean>(false);

  const [isReproductionPackageAvailable, setReproductionPackageAvailable] =
    useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  // DOI response state
  const [doiResponse, setDoiResponse] = useState<doiData>({
    title: "",
    author: "",
    doi: "",
    publication_name: "",
    publication_year: "",
    journal_name: "",
  });
  const [checkedState, setCheckedState] = useState<string[]>([]);

  // TODO: add type
  const [formData, setFormData] = useState({
    reproduction_package_available: "no",
    authors_contacted: "yes",
    authors_available: false,
    reproduction_package_from_scratch: "yes",
    original_reproduction_packages: [],
    authors_response: [],
  });

  useEffect(() => {
    if (
      userPaperID !== undefined &&
      pageType !== undefined &&
      pageType === "edit"
    ) {
      getSelectUserPaperData(userPaperID)
        .then((paperResponse) => {
          setFormData((prev) => {
            return {
              ...prev,
              ...paperResponse,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userPaperID, pageType]);

  const formDataHandler = (event: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });

    // console.log("formData", formData);
  };

  const userID: string = sessionStorage.getItem("id") as string;
  const submitSelectPaperData = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // send form data to fireStore database on button click
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    // console.log("data", data);

    // console.log(116, formData);

    setFormData((prev: any) => {
      return {
        ...prev,
        paper_type: "candidate",
        workflow_stage: "select_paper",
        start_date: new Date().toString(),
        shareable_link: false,
        is_author: true,
        is_creator: true,
        expected_total_hours: 1,
        claim_type: "",
        claim_type_other_description: "",
        familiarity_level: "",
        authors_response: checkedState,
      };
    });
    // send data to firebase

    addUserPaperData(formData, userID, doiResponse)
      .then((res) => {
        console.log("res", res);
        if (typeof res !== "undefined") {
          if (res.success) {
            toast.success("Data submitted");
            navigate(`/reproductions/edit/${res?.userPaperID}`);
          } else {
            toast.error("Error submitting data");
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
        // toast.error("Error submitting data");
      });

    console.log(formData, userID, doiResponse);

    // setSelectPaperData("submitted");
  };

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
  };

  const handleCheckBoxData = (position: number) => {
    checkBoxOptions?.forEach((item: checkBoxOption, index: number) => {
      if (index === position) {
        setCheckedState((prev) => [...prev, item.label]);
      }
    });
  };

  // console.log(checkedState);

  // This function will fetch the DOI data from the DOI API
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
          setDoi((prev) => !prev);
          const newResponse = camelizeKeys(response);
          setDoiResponse((prev: any) => {
            return {
              ...prev,
              publication_year: newResponse.message?.created?.dateTime,
              publication_name: newResponse.message?.publisher,
              title: newResponse.message?.title[0],
              journal_name: newResponse.message?.shortContainerTitle[0],
              author: `${newResponse.message?.author
                .map((author: any) => `${author?.given} ${author?.family}`)
                .join(", ")}`,

              doi: newResponse.message?.doi,
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
  // console.log(doiResponse);

  function changeWorkFlowStage(userPaperID: string) {
    if (typeof userPaperID !== "undefined") {
      setFormData((prev: any) => {
        return {
          ...prev,
          workflow_stage: "scoping",
          paper_type: "declared",
        };
      });
      appendUserPaperData(userPaperID, formData)
        .then(() => {
          navigate(`/reproductions/edit/${userPaperID}`);
        })
        .catch((err) => {
          console.log("Error submitting data", err);
        });
    } else {
      console.log("userPaperID not defined");
    }
  }

  return (
    <div>
      <Container>
        <Typography variant="h4" component={"h1"} textAlign={"center"} py={2}>
          Step 1: Declare a paper
        </Typography>
        <Typography variant={"subtitle1"} p={2}>
          Specify the research paper that you will analyze and provide some
          basic information about its reproduction package. Please refer to the
          documentation provided for further assistance
        </Typography>{" "}
        <Typography variant={"h5"} component="h6" p={2}>
          Basic information
        </Typography>
        <Typography variant={"subtitle1"} px={2}>
          At this point, you are not expected to review the reproduction
          materials in detail, as you will dedicate most of your time to this in
          later stages of the exercise. If materials are available, you will
          declare this paper as your target to reproduce. Only then you will be
          asked to read the paper and define the scope of the reproduction
          exercise.
        </Typography>
        <form
          method="post"
          onSubmit={submitSelectPaperData}
          style={{ marginTop: "2rem", marginBottom: "4rem" }}
        >
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
              <TextField
                label="Digital Object Identifier (or URL if no DOI available)"
                variant="standard"
                type={"text"}
                fullWidth
                id="doi"
                name="doi"
                onChange={(e: any) => setDoiString(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button
                      type="button"
                      onClick={submitHandler}
                      variant="contained"
                      sx={{ width: "20%" }}
                    >
                      Search DOI
                    </Button>
                  ),
                }}
              />
            </ListItem>{" "}
            <p style={{ color: "red", textAlign: "center" }}>
              {isError ? "Please enter DOI " : null}
            </p>
            {getDoi && Object.keys(doiResponse).length > 0 ? (
              <>
                <ListItem>
                  <TextField
                    label="Title of the paper"
                    type={"text"}
                    defaultValue={doiResponse?.title ? doiResponse?.title : ""}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>{" "}
                <ListItem>
                  <TextField
                    label="Name of the journal or publication"
                    type={"text"}
                    defaultValue={
                      doiResponse?.publication_name
                        ? doiResponse?.publication_name
                        : ""
                    }
                    variant="standard"
                    fullWidth
                  />
                </ListItem>{" "}
                <ListItem>
                  <TextField
                    label="Digital Object Identifier (or URL if no DOI available)"
                    type={"text"}
                    defaultValue={doiResponse?.doi ? doiResponse?.doi : ""}
                    variant="standard"
                    fullWidth
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Year of Publication"
                    type={"text"}
                    defaultValue={
                      doiResponse?.publication_year
                        ? new Date(doiResponse?.publication_year)
                            .getFullYear()
                            .toString()
                        : "No year"
                    }
                    variant="standard"
                    fullWidth
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    label="Authors"
                    type={"text"}
                    defaultValue={
                      doiResponse?.author ? doiResponse?.author : ""
                    }
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
              <FormControl required>
                <FormLabel id="reproduction-package-available?">
                  1.2 is a reproduction package available for this paper?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue={
                    formData?.reproduction_package_available
                      ? formData?.reproduction_package_available
                      : "no"
                  }
                  onChange={formDataHandler}
                  name="reproduction_package_available"
                >
                  <FormControlLabel
                    value="yes"
                    onClick={(event) => {
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
              <FormControl required disabled={isDisabled12}>
                <FormLabel id="permission">
                  1.3 Have you contacted the authors for a reproduction package?
                  Consult the{" "}
                  <span>
                    <a href="https://docs.replicare.dev">docs</a>
                  </span>{" "}
                  for recommendations on contacting authors.
                </FormLabel>
                <RadioGroup
                  aria-labelledby="is a reproduction package available for this paper?"
                  defaultValue={
                    formData?.authors_contacted
                      ? formData?.authors_contacted
                      : "yes"
                  }
                  name="authors_contacted"
                  onChange={formDataHandler}
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
              <FormControl required disabled={isDisabled12 || isDisabled13}>
                <FormLabel>
                  1.4 How did the authors respond? Select all that apply.
                </FormLabel>
                {checkBoxOptions.map((item: checkBoxOption, index: number) => {
                  return (
                    <>
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            name={item.label}
                            onChange={() => handleCheckBoxData(index)}
                          />
                        }
                        onClick={() => setDisabled16(true)}
                        label={item.label}
                      />
                    </>
                  );
                })}
              </FormControl>
            </ListItem>

            <ListItem>
              <FormControl required disabled={isDisabled12}>
                <FormLabel id="permission">
                  1.5 If there are no reproduction packages, are you willing to
                  build a reproduction package from scratch?
                </FormLabel>
                <RadioGroup
                  defaultValue={
                    formData?.reproduction_package_from_scratch
                      ? formData?.reproduction_package_from_scratch
                      : "yes"
                  }
                  onChange={formDataHandler}
                  name="reproduction_package_from_scratch"
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
                <Button
                  variant="contained"
                  onClick={() =>
                    userPaperID ? changeWorkFlowStage(userPaperID) : null
                  }
                >
                  You can declare this paper and continue the scoping portion of
                  the exercise.
                </Button>
              </ListItem>
            ) : null}
            {isReproductionPackageAvailable ? (
              <AdditionalInfo formData={formData} setFormData={setFormData} />
            ) : null}
          </List>
          <Box sx={{ float: "right" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                padding: 2,
                borderRadius: 10,
                px: 3,
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default SelectPaper;
