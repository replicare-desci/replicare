import {
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { paperData, revised_reproduction_packages } from "../../types";
import React from "react";
interface props {
  scopingData: paperData;
  setScopingData: any;
}
const DeclareRobustnessChecksStepFour = ({
  scopingData,
  setScopingData,
}: props) => {
  const DeclareRobustnessChecksHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setScopingData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    console.log(scopingData);
  };
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h6">Declare possible robustness checks</Typography>
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
          name="possible_robustness_checks"
          multiline
          rows={5}
          fullWidth
          placeholder="Possible robustness check"
        />
      </FormControl>
      {/* TODO: need to do this  */}
      {/* <Button variant="contained">Save and move to assessment stage</Button> */}
    </Container>
  );
};

export default DeclareRobustnessChecksStepFour;
