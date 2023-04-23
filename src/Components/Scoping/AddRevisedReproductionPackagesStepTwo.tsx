import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItem,
  TextField,
} from "@mui/material";
import React from "react";
import AdditionalInfo from "../AdditionalInfo";

const AddRevisedReproductionPackagesStepTwo = () => {
  const [count, setCount] = React.useState(0);
  const renderAdditional = () => {
    setCount(count + 1);
  };
  // const renderedComponents = Array.from({ length: count }, (_, index) => (
  //   <AdditionalInfo key={index} />
  // ));
  return (
    <div>
      <Box boxShadow={4} my={4}>
        <ListItem>
          <FormControl required fullWidth sx={{ py: 1 }}>
            <FormLabel>
              Record the main repository that stores the code for the
              reproduction package provided by the authors.
            </FormLabel>
            <FormHelperText>Contents of reproduction package</FormHelperText>
            <TextField
              variant="standard"
              // onChange={formDataHandler}
              name="reproductionData1"
              type={"text"}
              placeholder="e.g. Main code repository with data"
            ></TextField>
            <TextField
              type={"text"}
              variant="standard"
              // onChange={formDataHandler}
              name="reproductionData2"
              placeholder="e.g. https://github.com/paper/paper"
            ></TextField>
            <FormLabel>
              Are there additional data in different repositories? Use the
              button below to add links to these as well.
            </FormLabel>{" "}
            {/* {renderedComponents} */}
            <Button variant="contained" onClick={renderAdditional}>
              + Add additional reproduction packages for data
            </Button>
          </FormControl>
        </ListItem>
      </Box>
    </div>
  );
};

export default AddRevisedReproductionPackagesStepTwo;
