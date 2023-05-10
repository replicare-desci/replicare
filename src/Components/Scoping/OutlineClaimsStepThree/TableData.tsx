import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "", width: 150 },
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
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const rows = [
  // { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  // { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  // { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  // { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  // { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  // { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  // { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  // { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  // { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  {
    id: "Name of display item (e.g. Table 1 , Figure S3)",
  },
  {
    id: "Estimate",
  },
  {
    id: "Standard Error",
  },
  {
    id: "Units (e.g. %,$,loh($),elasticity, standard)",
  },
  {
    id: "p-value",
  },
  {
    id: "Confidence interval",
  },
  {
    id: "Other Statistic",
  },
  {
    id: "Page",
  },
  {
    id: "Column",
  },
  {
    id: "Row",
  },
  {
    id: "Inline Paragraph",
  },
  {
    id: "Econometric Method",
  },
  {
    id: "Specify method()if other selected",
  },
];

export default function TableData() {
  return (
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
        disableRowSelectionOnClick
      />
    </Box>
  );
}
