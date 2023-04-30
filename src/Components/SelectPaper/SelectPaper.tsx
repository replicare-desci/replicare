import React, { useState, useEffect } from "react";
import { fetchDoi } from "../../api/fetchDOI";
import { camelizeKeys } from "../../utils/changeCase";
import AdditionalInfo from "../AdditionalInfo";
import {
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import {
  paperData,
  DoiData,
  original_reproduction_packages,
} from "../../types/index.d";

import {
  TextField,
  Button,
  Container,
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

type checkBoxOption = {
  label: string;
};

const userID: string = sessionStorage.getItem("id") as string;

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

  const [isError, setError] = useState<boolean>(false);

  // DOI response state
  const [doiResponse, setDoiResponse] = useState<DoiData>({
    title: "",
    author: "",
    doi: "",
    publication_name: "",
    publication_year: "",
    journal_name: "",
  });
  const [checkedState, setCheckedState] = useState<string[]>([]);

  const [originalPackages, setOriginalPackages] = useState<
    original_reproduction_packages[]
  >([
    {
      name: "",
      url: "",
      stage: "original",
      content_type: "code",
    },
  ]);

  // TODO: add type
  const [formData, setFormData] = useState<paperData>({
    id: userPaperID as string,
    userID: userID,
    reproduction_package_available: "",
    authors_contacted: "",
    authors_available: false,
    reproduction_package_from_scratch: "",
    original_reproduction_packages: [
      {
        content_type: "code",
        name: "",
        stage: "revised",
        url: "",
      },
    ],
    revised_reproduction_packages: [
      {
        content_type: "code",
        name: "",
        stage: "revised",
        url: "",
      },
    ],
    authors_response: [],
    // userID: "",
    paper: doiResponse ? doiResponse : null,
    paper_type: "candidate",
    workflow_stage: "select_paper",
    start_date: "",
    shareable_link: false,
    is_author: true,
    is_creator: true,
    claim_type: "",
    claim_type_other_description: "",
    familiarity_level: "",
    expected_total_hours: 1,
  });

  useEffect(() => {
    if (userPaperID !== undefined && pageType !== undefined) {
      getSelectUserPaperData(userPaperID)
        .then((paperResponse: paperData) => {
          if (paperResponse !== undefined) {
            setFormData(paperResponse);
            if (
              paperResponse?.paper &&
              Object.keys(paperResponse?.paper).length > 0
            ) {
              setDoiResponse(paperResponse?.paper);
              setDoi(true);
            }

            if (
              paperResponse?.authors_response !== undefined &&
              paperResponse?.authors_response?.length > 0
            ) {
              setCheckedState(paperResponse?.authors_response);
            }

            if (
              paperResponse?.original_reproduction_packages !== undefined &&
              paperResponse?.original_reproduction_packages.length > 0
            ) {
              setOriginalPackages(
                paperResponse?.original_reproduction_packages
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("something is wrong about this code");
          setDoi(false);
        });
    }
  }, [userPaperID, pageType]);

  const formDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitSelectPaperData = (event: React.FormEvent<HTMLFormElement>) => {
    // send form data to fireStore database on button click
    event.preventDefault();

    setFormData((prev: any) => {
      return {
        ...prev,
        userID: userID,
        paper: doiResponse,
        start_date: new Date().toString(),
        shareable_link: false,
        is_author: true,
        is_creator: true,
        expected_total_hours: 1,
        claim_type: "",
        claim_type_other_description: "",
        familiarity_level: "",
        authors_response: checkedState,
        project_nickname: "",
        authors_response_other: "",
        summary: "",
        whole_population: "",
        additional_population: "",
        original_reproduction_packages: originalPackages,
      };
    });

    if (
      (originalPackages && originalPackages.length > 0) ||
      checkedState.length > 0
    ) {
      console.log("execute");

      if (userPaperID !== undefined && pageType !== undefined) {
        console.log(formData);

        appendUserPaperData(userPaperID, formData)
          .then(() => {
            toast.success("Data Save successfully");
          })
          .catch((err) => {
            console.log("err", err);
            toast.error("Error submitting data");
          });
      } else {
        toast.error("Edit mode undefined");
      }
    } else {
      toast.error("Please fill all the required fields");
    }
  };

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

          setFormData((prev) => {
            return {
              ...prev,
              paper: {
                ...prev.paper,
                publication_year: newResponse.message?.created?.dateTime,
                publication_name: newResponse.message?.publisher,
                title: newResponse.message?.title[0],
                journal_name: newResponse.message?.shortContainerTitle[0],
                author: `${newResponse.message?.author
                  .map((author: any) => `${author?.given} ${author?.family}`)
                  .join(", ")}`,

                doi: newResponse.message?.doi,
              },
            };
          });
          setDoi(true);
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

  function changeWorkFlowStage(userPaperID: string) {
    if (userPaperID && typeof userPaperID !== "undefined") {
      setFormData((prev: any) => {
        return {
          ...prev,
          workflow_stage: "scoping",
          paper_type: "declared",
        };
      });

      const response: boolean = window.confirm(
        "Are you sure you want to declare? Changes can't be allowed after this step"
      );

      if (
        formData?.paper_type === "declared" &&
        formData?.workflow_stage === "scoping" &&
        response
      ) {
        setFormData((prev: any) => {
          return {
            ...prev,
            userID: userID,
            paper: doiResponse,
            start_date: new Date().toString(),
            shareable_link: false,
            is_author: true,
            is_creator: true,
            expected_total_hours: 1,
            claim_type: "",
            claim_type_other_description: "",
            familiarity_level: "",
            authors_response: checkedState,
            project_nickname: "",
            authors_response_other: "",
            summary: "",
            whole_population: "",
            additional_population: "",
            original_reproduction_packages: originalPackages,
          };
        });

        appendUserPaperData(userPaperID, formData)
          .then(() => {
            toast.success("Paper declared successfully");

            navigate(`/reproductions/edit/${userPaperID}`);
          })
          .catch((err) => {
            console.log("Error submitting data", err);
          });
      } else {
        toast.error("Save before declaring");
      }
    } else {
      toast.error("ID not defined");
      console.log("userPaperID not defined");
    }
  }

  return (
    <Container>
      <Typography variant="h4" component={"h1"} textAlign={"center"} py={2}>
        Step 1: Declare a paper
      </Typography>
      <Typography variant={"subtitle1"} p={2}>
        Specify the research paper that you will analyze and provide some basic
        information about its reproduction package. Please refer to the
        documentation provided for further assistance
      </Typography>{" "}
      <Typography variant={"h5"} component="h6" p={2}>
        Basic information
      </Typography>
      <Typography variant={"subtitle1"} px={2}>
        At this point, you are not expected to review the reproduction materials
        in detail, as you will dedicate most of your time to this in later
        stages of the exercise. If materials are available, you will declare
        this paper as your target to reproduce. Only then you will be asked to
        read the paper and define the scope of the reproduction exercise.
      </Typography>
      <Box
        sx={{
          paddingTop: 3,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Button variant="contained" onClick={() => navigate(-1)}>
          Return to stages overview
        </Button>
      </Box>
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
              for the paper that you have chosen to reproduce for this activity
              and we will fetch some basic information. Please use the
              prefix/suffix notation, e.g. 10.1257/aer.20101199.
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
          </ListItem>
          <p style={{ color: "red", textAlign: "center" }}>
            {isError ? "Please enter DOI " : null}
          </p>
          {getDoi && doiResponse && Object.keys(doiResponse).length > 0 ? (
            <>
              <ListItem>
                <TextField
                  label="Title of the paper"
                  type={"text"}
                  value={doiResponse?.title ? doiResponse?.title : ""}
                  variant="standard"
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Name of the journal or publication"
                  type={"text"}
                  value={
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
                  value={doiResponse?.doi ? doiResponse?.doi : ""}
                  variant="standard"
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Year of Publication"
                  type={"text"}
                  value={
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
                  value={doiResponse?.author ? doiResponse?.author : ""}
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
                value={
                  formData?.reproduction_package_available
                    ? formData?.reproduction_package_available
                    : null
                }
                onChange={formDataHandler}
                name="reproduction_package_available"
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="true"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="false"
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              required
              disabled={
                formData?.reproduction_package_available === "" ||
                formData?.reproduction_package_available === "true"
                  ? true
                  : false
              }
            >
              <FormLabel id="authors_contacted">
                1.3 Have you contacted the authors for a reproduction package?
                Consult the{" "}
                <span>
                  <a href="https://docs.replicare.dev">docs</a>
                </span>{" "}
                for recommendations on contacting authors.
              </FormLabel>
              <RadioGroup
                aria-labelledby="authors_contacted"
                value={
                  formData?.authors_contacted
                    ? formData?.authors_contacted
                    : null
                }
                name="authors_contacted"
                onChange={formDataHandler}
              >
                <FormControlLabel
                  value="true"
                  disabled={
                    formData?.reproduction_package_available === "" ||
                    formData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                  control={<Radio />}
                  label="true"
                />
                <FormControlLabel
                  value="false"
                  disabled={
                    formData?.reproduction_package_available === "" ||
                    formData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                  control={<Radio />}
                  label="false"
                />
              </RadioGroup>
            </FormControl>
            <FormHelperText>
              *Wait a few weeks for the authors to reply, then summarize your
              interaction below.
            </FormHelperText>
          </ListItem>
          <ListItem>
            <FormControl
              required
              disabled={
                formData?.authors_contacted === "" ||
                formData?.authors_contacted === "true"
                  ? true
                  : false
              }
            >
              <FormLabel>
                1.4 How did the authors respond? Select all that apply.
              </FormLabel>
              {checkBoxOptions.length > 0 &&
                checkBoxOptions?.map((item: checkBoxOption, index: number) => {
                  return (
                    <>
                      <FormControlLabel
                        disabled={
                          formData?.authors_contacted === "" ||
                          formData?.authors_contacted === "true"
                            ? true
                            : false
                        }
                        key={index}
                        control={
                          <Checkbox
                            name={item.label}
                            checked={
                              checkedState?.length > 0 &&
                              typeof item?.label === "string"
                                ? !!checkedState.includes(item?.label)
                                : false
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (event.target.checked) {
                                setCheckedState((prevState: string[]) => [
                                  ...prevState,
                                  event.target.name,
                                ]);
                              } else {
                                setCheckedState((prevState: string[]) =>
                                  prevState.filter(
                                    (item: string) => item !== event.target.name
                                  )
                                );
                              }
                            }}
                          />
                        }
                        label={item.label}
                      />
                    </>
                  );
                })}
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl
              required
              disabled={
                formData?.reproduction_package_available === "" ||
                formData?.reproduction_package_available === "true"
                  ? true
                  : false
              }
            >
              <FormLabel id="permission">
                1.5 If there are no reproduction packages, are you willing to
                build a reproduction package from scratch?
              </FormLabel>
              <RadioGroup
                value={
                  formData?.reproduction_package_from_scratch
                    ? formData?.reproduction_package_from_scratch
                    : null
                }
                onChange={formDataHandler}
                name="reproduction_package_from_scratch"
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="true"
                  disabled={
                    formData?.reproduction_package_available === "" ||
                    formData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="false"
                  disabled={
                    formData?.reproduction_package_available === "" ||
                    formData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                />
              </RadioGroup>
            </FormControl>
          </ListItem>

          {formData?.reproduction_package_available === "true" &&
          formData?.original_reproduction_packages !== undefined ? (
            <AdditionalInfo
              originalPackages={originalPackages}
              setOriginalPackages={setOriginalPackages}
            />
          ) : null}

          {formData?.reproduction_package_from_scratch === "true" ? (
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
  );
};

export default SelectPaper;

// TODO: 1.3 and 1.4 mai by default false check lgana hai
