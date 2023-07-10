import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Box from "@mui/material/Box";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
// const columns: GridColDef[] = [
//
// ];

// const rows = [
//   {
//     id: "Name of display item (e.g. Table 1 , Figure S3)",
//   },
//   {
//     id: "Estimate",
//   },
//   {
//     id: "Standard Error",
//   },
//   {
//     id: "Units (e.g. %,$,loh($),elasticity, standard)",
//   },
//   {
//     id: "p-value",
//   },
//   {
//     id: "Confidence interval",
//   },
//   {
//     id: "Other Statistic",
//   },
//   {
//     id: "Page",
//   },
//   {
//     id: "Column",
//   },
//   {
//     id: "Row",
//   },
//   {
//     id: "Inline Paragraph",
//   },
//   {
//     id: "Econometric Method",
//   },
//   {
//     id: "Specify method()if other selected",
//   },
// ];

export default function TableData() {
  const gridRef = useRef<AgGridReact<any>>(null);

  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "firstName",
      headerName: "Preferred Specification",
      width: 170,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Alternative Spec #1",
      width: 150,
      editable: true,
    },
    {
      field: "age01",
      headerName: "Alternative Spec #2",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "age02",
      headerName: "Alternative Spec #3",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "age03",
      headerName: "Alternative Spec #4",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "age04",
      headerName: "Alternative Spec #5",
      type: "number",
      width: 150,
      editable: true,
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 300,
      maxWidth: 200,
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

  return (
    <Box sx={{ width: "100%" }}>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Deselect</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: "100%", height: 300 }}>
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
  );
}
