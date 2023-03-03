import React from "react";
import { TextField } from "@mui/material";
const Search = () => {
  return (
    <div>
      <div className="search">
        <TextField
          id="outlined-basic"
          sx={{ width: "100%" }}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
    </div>
  );
};

export default Search;
