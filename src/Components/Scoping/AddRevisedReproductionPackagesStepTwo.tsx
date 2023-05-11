import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../context/ContextProvider";

const AddRevisedReproductionPackagesStepTwo = () => {
  const { store, setStore } = UserContext();

  const addRevisedPackageChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setStore((prev: any) => ({
      ...prev,
      paperData: {
        ...prev.paperData,
        revised_reproduction_packages: {
          ...prev.paperData.revised_reproduction_packages,
          [name]: value,
        },
      },
    }));
  };

  return (
    <div>
      <Box boxShadow={1} border={1} my={4} p={2}>
        {" "}
        <Typography variant="h5" fontWeight={600} m={2}>
          Add revised reproduction packages
        </Typography>
        <ListItem>
          <FormControl required fullWidth sx={{ py: 1 }}>
            <FormLabel
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              Record the main repository that stores the code for the
              reproduction package provided by the authors.
            </FormLabel>
            <FormHelperText
              sx={{
                fontSize: "0.8rem",
              }}
            >
              Contents of reproduction package
            </FormHelperText>
            <TextField
              variant="standard"
              sx={{
                my: 1,
              }}
              type={"text"}
              value={
                store?.paperData?.revised_reproduction_packages &&
                store?.paperData?.revised_reproduction_packages?.name
              }
              onChange={addRevisedPackageChangeHandler}
              name="name"
              placeholder="e.g. Main code repository with data"
            ></TextField>
            <TextField
              type={"text"}
              sx={{
                my: 2,
              }}
              value={
                store?.paperData?.revised_reproduction_packages &&
                store?.paperData?.revised_reproduction_packages?.url
              }
              variant="standard"
              onChange={addRevisedPackageChangeHandler}
              name="url"
              placeholder="e.g. https://github.com/paper/paper"
            ></TextField>
          </FormControl>
        </ListItem>
      </Box>
    </div>
  );
};

export default AddRevisedReproductionPackagesStepTwo;
