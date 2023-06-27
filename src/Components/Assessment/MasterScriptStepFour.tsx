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
  Checkbox,
} from "@mui/material";

const MasterScriptStepFour = () => {
  const { store, setStore } = UserContext();
  type checkBoxOption = {
    label: string;
  };
  const checkBoxOptions: checkBoxOption[] = [
    {
      label:
        "I don't have the necessary software or version of the software installed. Specify the required software and the required version.",
    },
    {
      label: "Files are missing.",
    },
    {
      label: "There are path/directory errors.",
    },
    {
      label: "I need to install additional packages, libraries, or updates.",
    },
    {
      label: "Other errors. Explain.",
    },
  ];
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
  // const { store, setStore } = UserContext();
  // const [claimTypeOther, setClaimTypeOther] = useState<string>("");
  // const [otherTypeChecked, otherTypeSetChecked] = useState<boolean>(false);

  // // handle change
  // const summerizePaperChangeHandler = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = event.target;

  //   setStore((prev: any) => {
  //     return {
  //       ...prev,
  //       paperData: {
  //         ...prev.paperData,
  //         [name]: value,
  //       },
  //     };
  //   });
  // };
  // console.log(store.paperData);

  return (
    <>
      <Box p={2} my={4} boxShadow={1} border={1}>
        <Typography variant={"h5"} component="h6" p={2} fontWeight={600}>
          Master script
        </Typography>
        <Typography variant="body1" px={2}>
          A master script is a code script that runs in defined order all of the
          code files necessary to reproduce the paper. Use this section to
          assess its reproducibility.
        </Typography>
        <Grid container component="form" noValidate>
          <List component="ol">
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>4.1</b> Is there a master file that runs all components of
                  the reproduction package in their required order?
                </FormLabel>
                <RadioGroup
                  // onChange={summerizePaperChangeHandler}
                  name="familiarity_level"
                  id="familiarity_level"
                  // value={
                  //   store?.paperData?.familiarity_level
                  //     ? store?.paperData?.familiarity_level
                  //     : ""
                  // }
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
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>4.2</b> Did the master file run with one click?
                </FormLabel>
                <RadioGroup
                  // onChange={summerizePaperChangeHandler}
                  name="familiarity_level"
                  id="familiarity_level"
                  // value={
                  //   store?.paperData?.familiarity_level
                  //     ? store?.paperData?.familiarity_level
                  //     : ""
                  // }
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
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>4.3</b> Why didn't the master file run with one click?
                </FormLabel>
                {checkBoxOptions.length > 0 &&
                  checkBoxOptions?.map(
                    (item: checkBoxOption, index: number) => {
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
                                  store?.paperData?.authors_response.length >
                                    0 &&
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
                    }
                  )}
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>4.4</b> Is there a master file that runs all components of
                  the reproduction package in their required order?
                </FormLabel>

                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent installing additional packages , libraries, updates"
                />
                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent changing directory paths and/or moving files"
                />
                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent doing other minor collections"
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>4.5</b> After making minor corrections, did the master file
                  run?
                </FormLabel>
                <RadioGroup
                  // onChange={summerizePaperChangeHandler}
                  name="familiarity_level"
                  id="familiarity_level"
                  // value={
                  //   store?.paperData?.familiarity_level
                  //     ? store?.paperData?.familiarity_level
                  //     : ""
                  // }
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

          <Stepper />
        </Grid>
        ``
      </Box>
    </>
  );
};

export default MasterScriptStepFour;
