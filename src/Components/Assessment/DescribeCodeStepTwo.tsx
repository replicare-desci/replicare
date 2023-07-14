import React, { useState, useRef, useMemo, useCallback } from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import AgridTablesFile from "./AgridTablesFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Input } from "@mui/material";import Papa from "papaparse";
import {
  Typography,
  Grid,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Box,
  Button,
} from "@mui/material";
import { UserContext } from "../../context/ContextProvider";
type codeScriptDataType = {
  id: number;
  description: string;
  file_name: string;
  location: string;
  primary_types: string;
  inputs: string;
  outputs: string;
};
const DescribeCodeStepTwo = () => {
  const { store, setStore } = UserContext();
  const codeScriptGridRef = useRef<AgGridReact<any>>(null);
  // const columns: GridColDef[] = [

  // ];

  const [codeScriptRowData, setCodeScriptRowData] = useState<
    codeScriptDataType[]
  >([]);

  // DefaultColDef sets props common to all Columns
  const codeScriptColDef = useMemo(
    () => ({
      // sortable: true,
      // filter: true,
      resizable: true,
      flex: 1,
      // minWidth: 200,
      // maxWidth: 135,
      autoHeight: false,
    }),
    []
  );
  const codeScriptCellClickedListener = useCallback(
    (params: any) => {
      console.log("click listener data:", params.data);

      const fieldId = params.data?.id;
      console.log("row id:", fieldId);

      setStore((prev: any) => {
        // Ensure paperData and code_scripts_rows exist
        const paperData = prev?.paperData || {};
        let code_scripts_rows = paperData?.code_scripts_rows || [];

        // Check if the row already exists
        const existingRow = code_scripts_rows.find(
          (item: any) => item.id === fieldId
        );

        if (existingRow) {
          code_scripts_rows = code_scripts_rows.map((item: any) => {
            if (item.id === fieldId) {
              return params.data;
            } else {
              return item;
            }
          });
        } else {
          code_scripts_rows.push(params.data);
        }

        return {
          ...prev,
          paperData: {
            ...paperData,
            code_scripts_rows: code_scripts_rows,
          },
        };
      });
    },
    [setStore]
  );

  function codeScriptAddRowToGrid() {
    let maxId: number =
      codeScriptRowData.length > 0
        ? Math.max(...codeScriptRowData.map((row) => row.id))
        : 0;

    let newId: number = maxId + 1;

    const codeScriptNewRow = {
      id: newId,
      description: "",
      file_name: "",
      location: "",
      primary_types: "",
      inputs: "",
      outputs: "",
    };

    setCodeScriptRowData((prev: any) => {
      return [...prev, codeScriptNewRow];
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const code_scripts_rows = paperData?.code_scripts_rows || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          code_scripts_rows: [...code_scripts_rows, codeScriptNewRow],
        },
      };
    });
  }

  // // Example using Grid's API
  // const buttonListener = useCallback((e: any) => {
  //   if (gridRef.current) {
  //     gridRef.current.api.deselectAll();
  //   }
  // }, []);
  // Each Column Definition results in one Column.
  function codeScriptDeleteRow(id: number) {
    setCodeScriptRowData((prev) => {
      return prev.filter((row) => row.id !== id);
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const code_scripts_rows =
        paperData?.code_scripts_rows.filter((row: any) => row.id !== id) || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          code_scripts_rows: code_scripts_rows,
        },
      };
    });
  }
  const [codeScriptColumnDefs, setCodeScriptColumnDefs] = useState([
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

    {
      headerName: "Delete",
      field: "delete",
      cellRenderer: function (params: any) {
        return (
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              codeScriptDeleteRow(params.data.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 100,
    },
  ]);
  const onBtnExport = useCallback(() => {
    if (codeScriptGridRef.current !== null) {
      codeScriptGridRef.current.api.exportDataAsCsv();
    }
  }, []);
  const onFileUpload = (event: any) => {
    let file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results: any) {
        setCodeScriptRowData(results.data);
      },
    });
  };
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
                  {/* <button onClick={buttonListener}>Deselect</button> */}

                  {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                  <div
                    className="ag-theme-material"
                    style={{ width: "100%", height: 300 }}
                  >
                    {" "}
                    <Box my={2}>
                      {" "}
                      <Button
                        sx={{ my: 2 }}
                        variant="contained"
                        onClick={codeScriptAddRowToGrid}
                      >
                        add row
                      </Button>
                      {/* <button onClick={onBtnUpdate}>
                    Show CSV export content text
                  </button> */}
                      <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        onClick={onBtnExport}
                      >
                        Export CSV
                      </Button>
                      <Input type="file" onChange={onFileUpload} />
                    </Box>
                    <AgridTablesFile
                      gridRef={codeScriptGridRef}
                      rowData={codeScriptRowData}
                      columnDefs={codeScriptColumnDefs}
                      defaultColDef={codeScriptColDef}
                      cellClickedListener={codeScriptCellClickedListener}
                    />
                  </div>
                </Box>
              </FormControl>
            </ListItem>{" "}
          </List>

          {/* <Stepper /> */}
        </Grid>
      </Box>
    </>
  );
};

export default DescribeCodeStepTwo;
