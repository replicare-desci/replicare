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
  Button,
  Box,
  Stepper,
} from "@mui/material";

const AccessDisplayItemStepFive = () => {
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
          Assess reproducibility of display items
        </Typography>
        <Grid container component="form" noValidate>
          <List component="ol">
            <ListItem component="li">
              <FormControl>
                <Typography variant="body1" sx={{ my: 1 }}>
                  In this section, you will assess the level of reproducibility
                  of all of the display items that contain estimates related to
                  your claims of interest. You will begin by identifying all the
                  files required to reproduce a display item, then you will
                  verify the availability of those files and then assess
                  computation. By the end of this process you will be presented
                  with a 10 point scale to assign a reproducibility score to
                  each display item.
                </Typography>
                <Typography variant="body1">
                  Note that you can add additional display items that you did
                  not specified in the scoping section, the only difference
                  between these two is that the scores aggregated in the SSRP
                  will distinguish between those display items that were
                  pre-specify and those that were not.
                </Typography>
              </FormControl>
            </ListItem>
          </List>

          <Box>
            {" "}
            <Button variant="contained" sx={{ m: 2 }}>
              Add additional display item
            </Button>
          </Box>
          <Stepper />
        </Grid>
      </Box>
    </>
  );
};

export default AccessDisplayItemStepFive;
