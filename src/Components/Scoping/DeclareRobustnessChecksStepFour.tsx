import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../context/ContextProvider";
import React from "react";

const DeclareRobustnessChecksStepFour = () => {
  const { store, setStore } = UserContext();

  const DeclareRobustnessChecksHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setStore((prev: any) => ({
      ...prev,
      paperData: {
        ...prev.paperData,
        [name]: value,
      },
      // {
      //   ...prev,
      //   [name]: value,
      // }
    }));
  };
  return (
    <Box boxShadow={1} border={1} my={4} p={4}>
      <Typography variant="h5" fontWeight={600}>
        Declare possible robustness checks
      </Typography>
      <FormControl sx={{ my: 3 }}>
        <FormLabel>
          <b>4.1. </b>After reading the paper, you may wonder what the results
          would look like under a specific robustness check. If you think that
          such analysis could have been done within the same methodology and
          using the same data (e.g., by including or excluding a subset of the
          data like “high-school dropouts” or “women”), please specify a
          robustness test that you would like to conduct as part of this
          project.
        </FormLabel>
        <TextField
          sx={{ my: 1 }}
          required
          onChange={DeclareRobustnessChecksHandler}
          value={store?.paperData?.possible_robustness_checks}
          name="possible_robustness_checks"
          multiline
          rows={5}
          fullWidth
          placeholder="Possible robustness check"
        />
      </FormControl>
      {/* TODO: need to do this  */}
      <Button variant="contained">Save and move to assessment stage</Button>
    </Box>
  );
};

export default DeclareRobustnessChecksStepFour;
