import React, { useState, useEffect } from "react";
import { UserContext } from "../../context/ContextProvider";
import { fetchDoi } from "../../api/fetchDOI";
import { camelizeKeys } from "../../utils/changeCase";
import AdditionalInfo from "../AdditionalInfo";
import {
  appendUserPaperData,
  getSelectUserPaperData,
} from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { paperData, original_reproduction_packages } from "../../types/index.d";

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
import { ContextType } from "../../types/context";

type checkBoxOption = {
  label: string;
};

const userID: string = sessionStorage.getItem("id") as string;

const SelectPaper = () => {
  const { store, setStore } = UserContext();
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
    // {
    //   label: "Did not respond. As of:",
    // },
  ];
  const [doiString, setDoiString] = useState<string>(); // filling to the state
  const [getDoi, setDoi] = useState<boolean>(false);

  const [isError, setError] = useState<boolean>(false);

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

  // this function will fill all the fields except doi in ui
  const formDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  //
  const submitSelectPaperData = (event: React.FormEvent<HTMLFormElement>) => {
    // send form data to fireStore database on button click
    event.preventDefault();
    setStore((prev: any) => {
      return {
        ...prev,
        paperData: {
          ...prev.paperData,
          userID: userID,
          id: userPaperID,
        },
      };
    });
    if (
      store?.paperData?.original_reproduction_packages &&
      store?.paperData?.original_reproduction_packages.length > 0
    ) {
      console.log("execute");

      if (userPaperID !== undefined && pageType !== undefined) {
        appendUserPaperData(userPaperID, store?.paperData)
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

          setStore((prev: any) => {
            return {
              ...prev,
              paperData: {
                ...prev.paperData,
                paper: {
                  publication_year: newResponse.message?.created?.dateTime,
                  publication_name: newResponse.message?.publisher,
                  title: newResponse.message?.title[0],
                  journal_name: newResponse.message?.shortContainerTitle[0],
                  author: `${newResponse.message?.author
                    .map((author: any) => `${author?.given} ${author?.family}`)
                    .join(", ")}`,

                  doi: newResponse.message?.doi,
                },
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
  }

  function changePaperStage(userPaperID: string) {
    if (userPaperID && typeof userPaperID !== "undefined") {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {
            ...prev.paperData,
            workflow_stage: "abandoned",
            paper_type: "abandoned_candidate",
          },
        };
      });
      const response: boolean = window.confirm(
        "Abandoned papers will be recorded under the public, identified privacy settings. Do you want to record this paper as abandoned?"
      );

      if (
        store?.paperData?.paper_type === "abandoned_candidate" &&
        store?.paperData?.workflow_stage === "abandoned" &&
        response
      ) {
        appendUserPaperData(userPaperID, store?.paperData)
          .then(() => {
            toast.success("Paper abandoned successfully");

            navigate(`/reproductions`);
          })
          .catch((err) => {
            console.log("Error submitting data", err);
          });
      } else {
        toast.error("Error in abandoning paper");
      }
    }
  }
  function changeWorkFlowStage(userPaperID: string) {
    if (userPaperID && typeof userPaperID !== "undefined") {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {
            ...prev.paperData,
            workflow_stage: "scoping",
            paper_type: "declared",
          },
        };
      });
      const response: boolean = window.confirm(
        "Are you sure you want to declare? Changes can't be allowed after this step"
      );

      if (
        store?.paperData?.paper_type === "declared" &&
        store?.paperData?.workflow_stage === "scoping" &&
        response
      ) {
        setStore((prev: any) => {
          return {
            ...prev,
            paperData: {
              ...prev.paperData,
              userID: userID,
              id: userPaperID,
            },
          };
        });

        appendUserPaperData(userPaperID, store?.paperData)
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
  function checkedStateHandler(status: string, checkedValue: string) {
    if (status === "checked") {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {
            ...prev.paperData,
            authors_response: [
              ...prev.paperData.authors_response,
              checkedValue,
            ],
          },
        };
      });
    } else if (status === "unchecked") {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {
            ...prev.paperData,
            authors_response: prev.paperData.authors_response.filter(
              (value: string) => value !== checkedValue
            ),
          },
        };
      });
    }
  }

  useEffect(() => {
    if (userPaperID !== undefined && pageType !== undefined) {
      getSelectUserPaperData(userPaperID)
        .then((paperResponse: paperData) => {
          if (paperResponse !== undefined) {
            setStore((prev: ContextType) => {
              return {
                ...prev,
                paperData: paperResponse,
              };
            });
            setDoi(true);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("something is wrong about this code");
          setDoi(false);
        });
    }
    return () => {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {},
        };
      });
    };
  }, [userPaperID, pageType, setStore]);
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
              value={
                store?.paperData?.paper?.doi
                  ? store?.paperData?.paper?.doi
                  : doiString
              }
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
          {getDoi &&
          store?.paperData?.paper &&
          Object.keys(store?.paperData?.paper).length > 0 ? (
            <>
              <ListItem>
                <TextField
                  label="Title of the paper"
                  type={"text"}
                  value={
                    store?.paperData?.paper?.title
                      ? store?.paperData?.paper?.title
                      : ""
                  }
                  variant="standard"
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Name of the journal or publication"
                  type={"text"}
                  value={
                    store?.paperData?.paper?.publication_name
                      ? store?.paperData?.paper?.publication_name
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
                  value={
                    store?.paperData?.paper?.doi
                      ? store?.paperData?.paper?.doi
                      : ""
                  }
                  variant="standard"
                  fullWidth
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Year of Publication"
                  type={"text"}
                  value={
                    store?.paperData?.paper?.publication_year
                      ? new Date(store?.paperData?.paper?.publication_year)
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
                  value={
                    store?.paperData?.paper?.author
                      ? store?.paperData?.paper?.author
                      : ""
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
                value={
                  store?.paperData?.reproduction_package_available
                    ? store?.paperData?.reproduction_package_available
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
                store?.paperData?.reproduction_package_available === "" ||
                store?.paperData?.reproduction_package_available === "true"
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
                  store?.paperData?.authors_contacted
                    ? store?.paperData?.authors_contacted
                    : null
                }
                name="authors_contacted"
                onChange={formDataHandler}
              >
                <FormControlLabel
                  value="true"
                  disabled={
                    store?.paperData?.reproduction_package_available === "" ||
                    store?.paperData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                  control={<Radio />}
                  label="true"
                />
                <FormControlLabel
                  value="false"
                  disabled={
                    store?.paperData?.reproduction_package_available === "" ||
                    store?.paperData?.reproduction_package_available === "true"
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
                store?.paperData?.authors_contacted === "" ||
                store?.paperData?.authors_contacted === "false"
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
                          store?.paperData?.authors_contacted === "" ||
                          store?.paperData?.authors_contacted === "false"
                            ? true
                            : false
                        }
                        key={index}
                        control={
                          <Checkbox
                            name={item.label}
                            checked={
                              store?.paperData?.authors_response &&
                              store?.paperData?.authors_response.length > 0 &&
                              store?.paperData?.authors_response.includes(
                                item?.label
                              )
                                ? true
                                : false
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (event.target.checked) {
                                checkedStateHandler(
                                  "checked",
                                  event.target.name
                                );
                              } else {
                                checkedStateHandler(
                                  "unchecked",
                                  event.target.name
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
                store?.paperData?.reproduction_package_available === "" ||
                store?.paperData?.reproduction_package_available === "true"
                  ? true
                  : false
              }
            >
              <FormLabel id="permission">
                {/* TODO: DATA IS NOT SAVING EVEN AFTER PRESSING SAVE 2 times */}
                1.5 If there are no reproduction packages, are you willing to
                build a reproduction package from scratch?
              </FormLabel>
              <RadioGroup
                value={
                  store?.paperData?.reproduction_package_from_scratch
                    ? store?.paperData?.reproduction_package_from_scratch
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
                    store?.paperData?.reproduction_package_available === "" ||
                    store?.paperData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                />

                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="false"
                  disabled={
                    store?.paperData?.reproduction_package_available === "" ||
                    store?.paperData?.reproduction_package_available === "true"
                      ? true
                      : false
                  }
                />
              </RadioGroup>
              {store?.paperData?.reproduction_package_from_scratch ===
              "false" ? (
                <Box my={3}>
                  {" "}
                  <Typography>
                    Without a reproduction package, you cannot declare this
                    paper and continue to the next stage of this reproduction.
                    Please record this paper as abandoned if you're unable to
                    locate its reproduction package.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() =>
                      userPaperID ? changePaperStage(userPaperID) : null
                    }
                  >
                    Record this paper as "abandoned"
                  </Button>
                </Box>
              ) : null}
            </FormControl>
          </ListItem>

          {store?.paperData?.reproduction_package_available === "true" &&
          store?.paperData?.original_reproduction_packages !== undefined ? (
            <AdditionalInfo
              originalPackages={originalPackages}
              setOriginalPackages={setOriginalPackages}
            />
          ) : null}

          {store?.paperData?.reproduction_package_from_scratch === "true" ||
          store?.paperData?.reproduction_package_available === "true" ? (
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
