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
  Box,
} from "@mui/material";

const DescribeInputStepOne = () => {
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
      maxWidth: 120,
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
      field: "dataSource",
      headerName: "Data Source",
      width: 150,
      editable: true,
    },
    {
      field: "page",
      headerName: "Page",
      width: 150,
      editable: true,
    },
    {
      field: "dataFiles",
      headerName: "Data Files",
      // type: "number",

      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      // type: "number",

      editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      // type: "number",

      editable: true,
    },
    {
      field: "provided",
      headerName: "Provided",

      editable: true,
    },
    {
      field: "cited",
      headerName: "Cited",

      editable: true,
      // type: "singleSelect",
    },
    { field: "delete", headerName: "Delete", width: 110, editable: true },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.dataSource || ""} ${params.row.page || ""}`,
    // },
  ]);

  const { store, setStore } = UserContext();
  // const [claimTypeOther, setClaimTypeOther] = useState<string>("");
  // const [otherTypeChecked, otherTypeSetChecked] = useState<boolean>(false);

  // // handle change
  // const DescribeInputStepOneChangeHandler = (
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
              </FormControl>
            </ListItem>
          </List>
        </Grid>
        ``
      </Box>
    </>
  );
};

export default DescribeInputStepOne;
