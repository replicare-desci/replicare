import { UserContext } from "../../context/ContextProvider";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

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

const DescribeCodeStepTwo = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  // const columns: GridColDef[] = [

  // ];

  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 200,
      maxWidth: 130,
      autoHeight: false,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e: any) => {
    if (gridRef.current) {
      gridRef.current.api.deselectAll();
    }
  }, []);
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fileName",
      headerName: "File Name",
      width: 150,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      // type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "inputs",
      headerName: "Inputs",
      width: 150,
      editable: true,
    },
    {
      field: "outputs",
      headerName: "Outputs",
      // type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "description",
      headerName: "Description",
      // type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "primaryType",
      headerName: "Primary Type",
      width: 110,
      editable: true,
    },

    { field: "delete", headerName: "Delete", width: 110, editable: true },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.fileName || ""} ${params.row.inputs || ""}`,
    // },
  ]);

  const rows = [
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
    {
      id: "",
      inputs: "",
      fileName: "",
      outputs: "",
      location: "",
      description: "",
      primaryType: "",

      delete: "",
    },
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
              Code scripts
            </Typography>
            <ListItem component="li">
              <FormControl>
                <FormLabel sx={{ my: 1 }}>
                  <b>2.1</b>
                </FormLabel>
                <Box>
                  <Typography variant="body1" component={"p"} my={1}>
                    You will enter data about code in the reproduction package
                    and their inputs and outputs. In combination with the
                    <b> diagram builder</b> in the next section, this will help
                    you judge the reproducibility as well as identify missing
                    files which can help you when following up with authors.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    First, identify all <b>code files</b> in the reproduction
                    package and record their names in the file_name column in
                    the mapping tool.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    Second, record the <b>location</b> of each code file
                    relative to the main folder of the reproduction package in
                    the location column.
                  </Typography>
                  <Typography variant="body1" component={"p"} my={1}>
                    Third, review the beginning and end of each code file to
                    identify the <b>inputs</b> required to successfully run the
                    file and the outputs produced. Examples of inputs are data
                    sets or other code scripts that are typically found at the
                    beginning of the script (e.g., load, read, source, run, do
                    ). Examples of outputs are other data sets, or plain text
                    files that are typically at the end of a script (e.g., save,
                    write, export). Record this in the inputs and outputs
                    columns
                  </Typography>{" "}
                  <Typography variant="body1" component={"p"} my={1}>
                    Fourth, provide a <b>brief description of the function</b>{" "}
                    produced by the code file (e.g., "produces table 1") in the
                    description column.
                  </Typography>{" "}
                  <Typography variant="body1" component={"p"} my={1}>
                    Finally, <b>classify</b> each data file as analysis or
                    cleaning and/or construction code based on its primary
                    function.
                  </Typography>{" "}
                  <Typography variant="body1" component={"p"} my={1}>
                    Sometimes the reproduction package will not produce display
                    items as final outputs. In this situation, the final code
                    script will generate some type of output (e.g.,
                    "results1.log", "results2.csv") that will require manual
                    copying and pasting to reproduce a desired display item
                    (e.g. "Table 1"). In this case, we recommend adding one
                    auxiliary line to the spreadsheet linking the final output
                    to the desired display item (e.g., File Name: aux1, Inputs:
                    "results1.log; results2.csv", Outputs: "Table 1").
                  </Typography>{" "}
                  <Typography variant="body1" component={"p"} my={1}>
                    Note: If you notice that some files iterate between each
                    other (eg, file1.do calls data1.csv to generate data2.csv,
                    and file2.R calls data2.csv to generate data1.csv) please
                    look within the files to identify the one that contains some
                    stopping criteria (eg, stop when SSR is minimized), and
                    rename only in the tree one output as final (eg, if file2.R
                    contains the stopping criteria rename, only in the tree and
                    not it the actual script, its output to data1_final.csv)
                  </Typography>
                </Box>
                <Box sx={{ height: 400, width: "100%" }}>
                  {/* Example using Grid's API */}
                  <button onClick={buttonListener}>Push Me</button>

                  {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                  <div
                    className="ag-theme-alpine"
                    style={{ width: "100%", height: 300 }}
                  >
                    <AgGridReact
                      ref={gridRef} // Ref for accessing Grid's API
                      rowData={rowData} // Row Data for Rows
                      editType="fullRow"
                      columnDefs={columnDefs} // Column Defs for Columns
                      defaultColDef={defaultColDef} // Default Column Properties
                      animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                      rowSelection="multiple" // Options - allows click selection of rows
                      onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                    />
                  </div>
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

export default DescribeCodeStepTwo;
