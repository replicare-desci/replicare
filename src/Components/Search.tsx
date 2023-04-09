import { TextField } from "@mui/material";
const Search = () => {
  return (
    <div>
      <div className="search">
        <TextField
          id="outlined-basic"
          sx={{
            width: "100%",
            ":hover": {
              backgroundColor: "background.paper",
            },
          }}
          placeholder="Search previous reproductions by DOI"
          variant="outlined"
          fullWidth
          // label="Search"
        />
      </div>
    </div>
  );
};

export default Search;
