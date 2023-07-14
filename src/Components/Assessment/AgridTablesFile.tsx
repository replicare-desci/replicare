import React from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS

const AgridTablesFile = ({
  gridRef,
  rowData,
  columnDefs,
  defaultColDef,
  cellClickedListener,
}: {
  gridRef: any;
  rowData: any;
  columnDefs: any;
  defaultColDef: any;
  cellClickedListener: any;
}) => {
  return (
    <div className="ag-theme-material" style={{ width: "100%", height: 300 }}>
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        rowData={rowData} // Row Data for Rows
        suppressExcelExport={true}
        editType="fullRow"
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        onCellClicked={cellClickedListener} // Optional - registering for Grid Event
      />
    </div>
  );
};

export default AgridTablesFile;
