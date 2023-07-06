import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Typography,
  Grid,
  List,
  ListItem,
  FormControl,
  Box,
} from "@mui/material";

const ViewDiagramBuilderStepThree = () => {
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
        <Grid container component="form" noValidate>
          <List component="ol">
            {" "}
            <Typography variant={"h5"} component="h6" p={2} fontWeight={600}>
              Replicare Diagram Builder
            </Typography>
            <ListItem component="li">
              <FormControl>
                {/* <FormLabel sx={{ my: 1 }}>
                  <b>2.1</b>
                </FormLabel> */}
                <Box>
                  <Typography variant="body1" component={"p"} my={1}>
                    This page shows a diagram mapping input files through code
                    to outputs based on the Code Scripts table in question 1.3.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    If you notice trees are fragmented when they shouldn't be,
                    you may need to amend the table with placeholders.{" "}
                    <a href="https://docs.replicare.dev">
                      See the replicare Guide for more information.
                    </a>
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    Even if the tree is fragmented, you can still go on to the
                    next step of the reproduction.
                  </Typography>
                  {/* TODO:  */}
                </Box>
                <Box>
                  <Typography variant="h6">Unused data sources:</Typography>
                  <Typography variant="h6">Unused analytic data:</Typography>
                </Box>

                {/* <TextField
                  label="e.g. Railroads of the Rah Attempt #1- Jan 2021"
                  type={"text"}
                  variant="standard"
                  fullWidth
                  required
                  name="project_nickname"
                  id="project_nickname"
                  // onChange={summerizePaperChangeHandler}
                /> */}
              </FormControl>
            </ListItem>{" "}
          </List>

          {/* <Stepper /> */}
        </Grid>
        ``
      </Box>
    </>
  );
};

export default ViewDiagramBuilderStepThree;
