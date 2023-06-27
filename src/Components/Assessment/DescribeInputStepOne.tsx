import React, { useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
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
} from "@mui/material";

const DescribeInputStepOne = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

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
              Data sources and raw data
            </Typography>
            <ListItem component="li">
              <FormControl>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.1</b>
                </FormLabel>
                <Box>
                  <Typography variant="body1" component={"p"} my={1}>
                    First, find references to all <b>data sources </b>used in
                    the analysis. A data source is usually described in
                    narrative form in the body of the text, e.g., "for earnings
                    in 2018, we use the Current Population Survey" – in this
                    example, the data source is the 2018 Current Population
                    Survey. It is mentioned for the first time on page 1 of the
                    appendix, so its location should be recorded as “A1” in the
                    page column. Do this for all the data sources mentioned in
                    the paper. Each row represents a unique data source.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    Second, map the data sources mentioned in the paper to the
                    relevant data files in the reproduction package. Data
                    sources are not the same as <b>data files</b>. Whenever a
                    data source contains multiple files, enter them on the same
                    cell, separated by a semicolon (;).
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    In the <b>Location</b> column, record the folder location of
                    each data file relative to the main folder of the original
                    reproduction package or a new folder, if you need to create
                    a new reproduction package from scratch.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    Finally, in the <b>Notes</b> column, add comments to help
                    the interpretation of the data source you entered, including
                    in cases when you've identified data sources that were not
                    referenced in the paper, but were used in the analysis.
                  </Typography>
                </Box>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
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
            <Typography
              variant={"h5"}
              // mb={2}
              component="h6"
              p={2}
              fontWeight={600}
            >
              Analytic data
            </Typography>
            <ListItem component="li">
              {" "}
              <FormControl required>
                <FormLabel sx={{ my: 1 }}>
                  <b>1.2</b>
                  <Box>
                    <Typography variant="body1" component={"p"} my={1}>
                      First, identify all <b>analytic data files</b> in the
                      reproduction package and record their names in the
                      analytic_data column in the mapping tool. You will
                      recognize analytic data files based on the documentation,
                      their location folder, or if they are produced by a code
                      file.
                    </Typography>
                    <Typography variant="body1" component={"p"} my={1}>
                      Second, record the <b>location</b> of each analytic data
                      file relative to the main folder of the reproduction
                      package in the location column.
                    </Typography>
                    <Typography variant="body1" component={"p"} my={1}>
                      Finally, provide a <b>short description</b> of each file
                      in the description column. This may be difficult at first
                      glance, but as you progress through the exercise, it will
                      become easier to return to the mapping tool to add a
                      one-line description of the main content in each file
                      (e.g., all_waves.csv is described as "data for
                      region-level analysis").
                    </Typography>
                  </Box>
                </FormLabel>{" "}
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </Box>
                {/* <TextField
                  type="date"
                  variant="standard"
                  id="start_date"
                  name="start_date"
                  // value={
                  //   store?.paperData?.start_date
                  //     ? store?.paperData?.start_date
                  //     : ""
                  // }
                  // onChange={summerizePaperChangeHandler}
                /> */}
              </FormControl>
            </ListItem>
          </List>

          {/* <Stepper /> */}
        </Grid>
        ``
      </Box>
    </>
  );
};

export default DescribeInputStepOne;
