import { UserContext } from "../../context/ContextProvider";

import React, { useState, useRef, useMemo, useCallback } from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import AgridTablesFile from "./AgridTablesFile";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import Papa from "papaparse";

import {
  Typography,
  Grid,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Box,
  Button,
  IconButton,
  Input,
} from "@mui/material";
export type dataSourceType = {
  id: number;
  dataSource: string;
  page: string;
  dataFiles: string;
  location: string;
  notes: string;
  provided: boolean;
  cited: boolean;
};
export type analyticDataType = {
  id: number;
  analytic_data: string;
  description: string;

  location: string;
};

const DeleteCellRenderer = (props: any) => {
  const { api, node } = props;
  const editingCells = api.getEditingCells();
  const isCurrentRowEditing = editingCells.some(
    (cell: any) => cell.rowIndex === node.rowIndex
  );

  if (isCurrentRowEditing) {
    return (
      <div>
        <button className="action-button update" data-action="update">
          Update
        </button>
        <button className="action-button cancel" data-action="cancel">
          Cancel
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button className="action-button delete" data-action="delete">
          Delete
        </button>
      </div>
    );
  }
};

const DescribeInputStepOne = () => {
  // const onRowEditingStarted = (params: any) => {
  //   params.api.refreshCells({
  //     columns: ["delete"],
  //     rowNodes: [params.node],
  //     force: true,
  //   });

  //   console.log("row editing started: ", params.data);
  // };

  // const onRowEditingStopped = (params: any) => {
  //   params.api.refreshCells({
  //     columns: ["delete"],
  //     rowNodes: [params.node],
  //     force: true,
  //   });
  // };

  const dataSourceGridRef = useRef<AgGridReact<any>>(null);
  const analyticDataGridRef = useRef<AgGridReact<any>>(null);

  const [dataSourceRowData, setDataSourceRowData] = useState<dataSourceType[]>(
    []
  ); // Set rowData to Array of Objects, one Object per Row
  const [analyticRowData, setAnalyticRowData] = useState<analyticDataType[]>(
    []
  ); // Set rowData to Array of Objects, one Object per Row
  const onFileUpload = (event: any) => {
    let file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results: any) {
        setDataSourceRowData(results.data);
      },
    });
  };

  const dataSourceColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
      // minWidth: 110,
      // maxWidth: 130,
      autoHeight: false,
    }),
    []
  );

  const analyticDataColDef = useMemo(
    () => ({
      resizable: true,
      flex: 1,
      // minWidth: 200,
      // maxWidth: 240,
      autoHeight: false,
    }),
    []
  );

  const { store, setStore } = UserContext();
  // Example of consuming Grid Event
  const dataSourceCellClickedListener = useCallback(
    (params: any) => {
      console.log("click listener data:", params.data);

      const fieldId = params.data?.id;
      console.log("row id:", fieldId);

      setStore((prev: any) => {
        // Ensure paperData and data_source_rows exist
        const paperData = prev?.paperData || {};
        let data_source_rows = paperData?.data_source_rows || [];

        // Check if the row already exists
        const existingRow = data_source_rows.find(
          (item: any) => item.id === fieldId
        );

        if (existingRow) {
          data_source_rows = data_source_rows.map((item: any) => {
            if (item.id === fieldId) {
              return params.data;
            } else {
              return item;
            }
          });
        } else {
          data_source_rows.push(params.data);
        }

        return {
          ...prev,
          paperData: {
            ...paperData,
            data_source_rows: data_source_rows,
          },
        };
      });
    },
    [setStore]
  );
  const analyticDataCellClickedListener = useCallback(
    (params: any) => {
      console.log("Analytic data click listener data:", params.data);

      const fieldId = params.data?.id;
      console.log("row id:", fieldId);

      setStore((prev: any) => {
        // Ensure paperData and data_source_rows exist
        const paperData = prev?.paperData || {};
        let analytic_data_rows = paperData?.analytic_data_rows || [];

        // Check if the row already exists
        const existingRow = analytic_data_rows.find(
          (item: any) => item.id === fieldId
        );

        if (existingRow) {
          analytic_data_rows = analytic_data_rows.map((item: any) => {
            if (item.id === fieldId) {
              return params.data;
            } else {
              return item;
            }
          });
        } else {
          analytic_data_rows.push(params.data);
        }

        return {
          ...prev,
          paperData: {
            ...paperData,
            analytic_data_rows: analytic_data_rows,
          },
        };
      });
    },
    [setStore]
  );
  function addRowToGridDataSource() {
    let maxId: number =
      dataSourceRowData.length > 0
        ? Math.max(...dataSourceRowData.map((row) => row.id))
        : 0;

    let newId: number = maxId + 1;

    const dataSourcenewRow = {
      id: newId,
      dataSource: "",
      page: "",
      dataFiles: "",
      location: "",
      notes: "",
      provided: false,
      cited: false,
    };

    setDataSourceRowData((prev: any) => {
      return [...prev, dataSourcenewRow];
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const data_source_rows = paperData?.data_source_rows || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          data_source_rows: [...data_source_rows, dataSourcenewRow],
        },
      };
    });
  }
  function addRowToGridAnalyticData() {
    let maxId: number =
      analyticRowData.length > 0
        ? Math.max(...analyticRowData.map((row) => row.id))
        : 0;

    let newId: number = maxId + 1;

    const analyticDataNewRow = {
      id: newId,
      dataSource: "",
      page: "",
      dataFiles: "",
      location: "",
      notes: "",
      provided: false,
      cited: false,
    };

    setAnalyticRowData((prev: any) => {
      return [...prev, analyticDataNewRow];
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const analytic_data_rows = paperData?.data_source_rows || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          data_source_rows: [...analytic_data_rows, analyticDataNewRow],
        },
      };
    });
  }

  function dataSourceDeleteRow(id: number) {
    setDataSourceRowData((prev) => {
      return prev.filter((row) => row.id !== id);
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const data_source_rows =
        paperData?.data_source_rows.filter((row: any) => row.id !== id) || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          data_source_rows: data_source_rows,
        },
      };
    });
  }
  function analyticDataDeleteRow(id: number) {
    setAnalyticRowData((prev) => {
      return prev.filter((row) => row.id !== id);
    });

    setStore((prev: any) => {
      const paperData = prev?.paperData || {};
      const analytic_data_rows =
        paperData?.analytic_data_rows.filter((row: any) => row.id !== id) || [];

      return {
        ...prev,
        paperData: {
          ...paperData,
          analytic_data_rows: analytic_data_rows,
        },
      };
    });
  }

  // TODO: update column
  const [dataSourceColumnDefs, setDataSourceColumnDefs] = useState([
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dataSource",
      headerName: "Data Source",

      editable: true,
    },
    {
      field: "page",
      headerName: "Page",

      editable: true,
    },
    {
      field: "dataFiles",
      headerName: "Data Files",
      type: "number",

      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      type: "string",

      editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      type: "string",

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
      type: "singleSelect",
    },
    {
      headerName: "Delete",
      field: "delete",
      cellRenderer: function (params: any) {
        return (
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              dataSourceDeleteRow(params.data.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 100,
    },
  ]);
  const [analyticDataColumnDefs, setAnalyticDataColumnDefs] = useState([
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "analyticData",
      headerName: "Analytic Data",

      editable: true,
    },

    {
      field: "location",
      headerName: "Location",
      type: "string",

      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",

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
              analyticDataDeleteRow(params.data.id);
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
    if (dataSourceGridRef.current !== null) {
      dataSourceGridRef.current.api.exportDataAsCsv();
    }
  }, []);

  // const onBtnUpdate = useCallback(() => {
  //   if (Object !== null) {
  //     document.querySelector("#csvResult").value =
  //       gridRef.current.api.getDataAsCsv();
  //   }
  // }, []);

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

                  <Box my={2}>
                    {" "}
                    <Button
                      sx={{ mx: 1 }}
                      variant="contained"
                      onClick={addRowToGridDataSource}
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
                  {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                  <AgridTablesFile
                    gridRef={dataSourceGridRef}
                    rowData={dataSourceRowData}
                    columnDefs={dataSourceColumnDefs}
                    defaultColDef={dataSourceColDef}
                    cellClickedListener={dataSourceCellClickedListener}
                  />
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
                  <Box mb={2}>
                    {" "}
                    <Button
                      variant="contained"
                      onClick={addRowToGridAnalyticData}
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

                  {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                  <div
                    className="ag-theme-material"
                    style={{ width: "100%", height: 300 }}
                  >
                    <AgridTablesFile
                      gridRef={analyticDataGridRef}
                      rowData={analyticRowData}
                      defaultColDef={analyticDataColDef}
                      cellClickedListener={analyticDataCellClickedListener}
                      columnDefs={analyticDataColumnDefs} // Column Defs for Columns
                    />
                  </div>
                </Box>
              </FormControl>
            </ListItem>
          </List>
        </Grid>
      </Box>
    </>
  );
};

export default DescribeInputStepOne;
