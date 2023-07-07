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

  // const [disabled, setDisabled] = useState<boolean>(true);
  // const [disabledSecond, setDisabledSecond] = useState<boolean>(true);

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
  const formDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setStore((prev: any) => ({
      ...prev,
      paperData: {
        ...prev.paperData,
        [name]: value,
      },
    }));
  };

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
                  onChange={formDataHandler}
                  name="master_file_exists"
                  id="master_file_exists"
                  value={
                    store?.paperData?.master_file_exists
                      ? store?.paperData?.master_file_exists
                      : ""
                  }
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
                  />{" "}
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl
                required
                disabled={
                  store?.paperData?.master_file_exists === "" ||
                  store?.paperData?.master_file_exists === "false"
                    ? true
                    : false
                }
              >
                <FormLabel sx={{ my: 1 }}>
                  <b>4.2</b> Did the master file run with one click?
                </FormLabel>
                <RadioGroup
                  onChange={formDataHandler}
                  name="master_file_one_click"
                  id="master_file_one_click"
                  value={
                    store?.paperData?.master_file_one_click
                      ? store?.paperData?.master_file_one_click
                      : ""
                  }
                >
                  <FormControlLabel
                    // disabled={
                    //   store?.paperData?.master_file_one_click === "" ||
                    //   store?.paperData?.master_file_one_click === "false"
                    //     ? true
                    //     : false
                    // }
                    disabled={
                      store?.paperData?.master_file_exists === "" ||
                      store?.paperData?.master_file_exists === "false"
                        ? true
                        : false
                    }
                    value="true"
                    control={<Radio />}
                    label="true"
                  />
                  <FormControlLabel
                    disabled={
                      store?.paperData?.master_file_exists === "" ||
                      store?.paperData?.master_file_exists === "false"
                        ? true
                        : false
                    }
                    value="false"
                    control={<Radio />}
                    label="false"
                  />{" "}
                </RadioGroup>
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl
                required
                disabled={
                  store?.paperData?.master_file_exists === "" ||
                  store?.paperData?.master_file_exists === "false"
                    ? true
                    : false
                }
              >
                <FormLabel sx={{ my: 1 }}>
                  <b>4.3</b> Why didn't the master file run with one click?
                </FormLabel>
                {checkBoxOptions.length > 0 &&
                  checkBoxOptions?.map(
                    (item: checkBoxOption, index: number) => {
                      return (
                        <>
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                name={item.label}
                                disabled={
                                  store?.paperData?.master_file_exists === "" ||
                                  store?.paperData?.master_file_exists ===
                                    "false"
                                    ? true
                                    : false
                                }
                                // disableRipple={
                                //   store?.paperData?.master_file_exists === "" ||
                                //   store?.paperData?.master_file_exists ===
                                //     "false"
                                //     ? true
                                //     : false
                                // }
                                checked={
                                  store?.paperData
                                    ?.master_file_no_one_click_reasons &&
                                  store?.paperData
                                    ?.master_file_no_one_click_reasons.length >
                                    0 &&
                                  store?.paperData?.master_file_no_one_click_reasons.includes(
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
              <FormControl
                required
                disabled={
                  store?.paperData?.master_file_exists === "" ||
                  store?.paperData?.master_file_exists === "false"
                    ? true
                    : false
                }
              >
                <FormLabel sx={{ my: 1 }}>
                  <b>4.4</b> Is there a master file that runs all components of
                  the reproduction package in their required order?
                </FormLabel>

                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent installing additional packages , libraries, updates"
                  name="num_minutes_installing_additional_packages"
                  id="num_minutes_installing_additional_packages"
                  disabled={
                    store?.paperData?.master_file_exists === "" ||
                    store?.paperData?.master_file_exists === "false"
                      ? true
                      : false
                  }
                  value={
                    store?.paperData?.num_minutes_installing_additional_package
                  }
                />
                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent changing directory paths and/or moving files"
                  name="num_minutes_changing_directory_paths"
                  id="num_minutes_changing_directory_paths"
                  disabled={
                    store?.paperData?.master_file_exists === "" ||
                    store?.paperData?.master_file_exists === "false"
                      ? true
                      : false
                  }
                  value={store?.paperData?.num_minutes_changing_directory_paths}
                />
                <TextField
                  placeholder="(in minutes)"
                  variant="standard"
                  sx={{ my: 1 }}
                  label="Time spent doing other minor collections"
                  name="num_minutes_other_improvements"
                  id="num_minutes_other_improvements"
                  disabled={
                    store?.paperData?.master_file_exists === "" ||
                    store?.paperData?.master_file_exists === "false"
                      ? true
                      : false
                  }
                  value={store?.paperData?.num_minutes_other_improvements}
                />
              </FormControl>
            </ListItem>{" "}
            <ListItem component="li">
              <FormControl
                required
                disabled={
                  store?.paperData?.master_file_exists === "" ||
                  store?.paperData?.master_file_exists === "false"
                    ? true
                    : false
                }
              >
                <FormLabel sx={{ my: 1 }}>
                  <b>4.5</b> After making minor corrections, did the master file
                  run?
                </FormLabel>
                <RadioGroup
                  onChange={formDataHandler}
                  name="master_file_run_after_corrections"
                  id="master_file_run_after_corrections"
                  value={
                    store?.paperData?.master_file_run_after_corrections
                      ? store?.paperData?.master_file_run_after_corrections
                      : ""
                  }
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
                  />{" "}
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
