import React, { useState } from "react";
// import { UserContext } from "../../context/ContextProvider";
import {
  Typography,
  Grid,
  List,
  ListItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Box,
  Stepper,
  Checkbox,
} from "@mui/material";

const ViewPaperLevelReproducbilityStepSix = () => {
  // const { store, setStore } = UserContext();
  type checkBoxOption = {
    label: string;
  };
  const checkBoxOptions: checkBoxOption[] = [
    {
      label: "A readme file",
    },
    {
      label: "Standard/clear file organization",
    },
    {
      label: "Version control software (e.g., Git)",
    },
    {
      label: "Open source software (e.g., R, Python, Julia, etc.)",
    },
    {
      label:
        "Dynamic documentation (e.g., using RMarkdown, Jupyter Notebooks, etc.)",
    },
    {
      label: "Computing capsule (e.g., mybinder.org, codeocean.com., etc.)",
    },
    {
      label: "Other. Describe.",
    },
  ];
  // function checkedStateHandler(status: string, checkedValue: string) {
  //   if (status === "checked") {
  //     setStore((prev: any) => {
  //       return {
  //         ...prev,
  //         paperData: {
  //           ...prev.paperData,
  //           authors_response: [
  //             ...prev.paperData.authors_response,
  //             checkedValue,
  //           ],
  //         },
  //       };
  //     });
  //   } else if (status === "unchecked") {
  //     setStore((prev: any) => {
  //       return {
  //         ...prev,
  //         paperData: {
  //           ...prev.paperData,
  //           authors_response: prev.paperData.authors_response.filter(
  //             (value: string) => value !== checkedValue
  //           ),
  //         },
  //       };
  //     });
  //   }
  // }
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
          Paper level components
        </Typography>
        <Grid container component="form" noValidate>
          <Typography px={2} variant="body1">
            There are many tools and practices that facilitate the overall
            computational reproducibility of a paper, such as using version
            control software, literal programming, open source software, among
            others. In this section, you will detect whether the reproduction
            materials contain any of these tools and practices. See more in the
            Replicare{" "}
            <a
              href="https://docs.replicare.dev"
              target="_blank"
              rel="noreferrer"
            >
              Guide
            </a>
            .
          </Typography>
          <List component="ol">
            <ListItem component="li">
              <FormControl>
                <FormLabel sx={{ my: 1 }}>
                  <b>6.1</b> In addition to the master script, mark which of the
                  following reproducibility tools and practices were used in the
                  original reproduction package.
                </FormLabel>
                {checkBoxOptions.length > 0 &&
                  checkBoxOptions?.map(
                    (item: checkBoxOption, index: number) => {
                      return (
                        <>
                          {/* <FormControlLabel
                            // disabled={
                            //   store?.paperData?.authors_contacted === "" ||
                            //   store?.paperData?.authors_contacted === "false"
                            //     ? true
                            //     : false
                            // }
                            key={index}
                            control={
                              <Checkbox
                                name={item.label}
                                // checked={
                                //   store?.paperData?.authors_response &&
                                //   store?.paperData?.authors_response.length >
                                //     0 &&
                                //   store?.paperData?.authors_response.includes(
                                //     item?.label
                                //   )
                                //     ? true
                                //     : false
                                // }
                                // onChange={(
                                //   event: React.ChangeEvent<HTMLInputElement>
                                // ) => {
                                //   if (event.target.checked) {
                                //     checkedStateHandler(
                                //       "checked",
                                //       event.target.name
                                //     );
                                //   } else {
                                //     checkedStateHandler(
                                //       "unchecked",
                                //       event.target.name
                                //     );
                                //   }
                                // }}
                              />
                            }
                            label={item.label}
                          /> */}
                          <Box
                            p={1}
                            boxShadow={1}
                            py={2}
                            border={1}
                            my={1}
                          ></Box>
                        </>
                      );
                    }
                  )}
              </FormControl>
            </ListItem>
          </List>

          <Stepper />
        </Grid>
      </Box>
    </>
  );
};

export default ViewPaperLevelReproducbilityStepSix;
