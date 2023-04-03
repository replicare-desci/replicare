import { TextField, Button, FormControl, Box } from "@mui/material";
import React, { useState } from "react";

function AdditionalInfo(): JSX.Element {
  const [isDelete, setDelete] = useState(true);
  const deleted = () => {
    setDelete(false);
  };
  return (
    <>
      {isDelete ? (
        <div>
          <Box py={2} boxShadow={1} my={1} width={"50%"}>
            <FormControl sx={{ paddingX: 2 }} fullWidth>
              <TextField
                label="Contents of reproduction package"
                fullWidth
                variant="standard"
                placeholder="e.g. Main code repository with data"
              ></TextField>
              <TextField
                variant="standard"
                placeholder="e.g. https://github.com/paper/paper"
              ></TextField>

              <Button
                variant="contained"
                sx={{ width: "10%", my: 2, textTransform: "unset", px: 5 }}
                onClick={deleted}
              >
                Delete
              </Button>
            </FormControl>
          </Box>
        </div>
      ) : null}
    </>
  );
}

export default AdditionalInfo;
