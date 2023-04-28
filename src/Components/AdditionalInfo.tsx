import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";

import { original_reproduction_packages } from "../types/index.d";

interface Props {
  originalPackages: original_reproduction_packages[];
  setOriginalPackages: React.Dispatch<
    React.SetStateAction<original_reproduction_packages[]>
  >;
}

function AdditionalInfo({
  originalPackages,
  setOriginalPackages,
}: Props): JSX.Element {
  const addIntoSystem = () => {};

  function fillIntoDefaultFields(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setOriginalPackages((prevState: original_reproduction_packages[]) => {
      return [
        {
          ...prevState[0],
          [name]: value,
        },
      ];
    });

    console.log(originalPackages);
  }

  return (
    <>
      {/* {isDelete ? (
        <div>
          <Box py={2} boxShadow={1} my={1} width={"100%"}>
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
      ) : null} */}

      {/* {formData.original_reproduction_packages.length > 1 &&
        formData.original_reproduction_packages.map(
          (item: any, index: number) => {
            return (
              <div key={index}>
                <Box py={2} boxShadow={1} my={1} px={3} mx={2}>
                  <FormHelperText>
                    Contents of reproduction package
                  </FormHelperText>
                  <div>
                    {" "}
                    <TextField
                      required
                      fullWidth
                      variant="standard"
                      name="name"
                      type={"text"}
                      defaultValue={item.name}
                      placeholder="e.g. Main code repository with data"
                      onChange={(event: any) => {
                        if (event.target.value.length > 0) {
                          setOriginalPackage({
                            ...originalPackage,
                            name: event.target.value,
                          });
                        }
                      }}
                    ></TextField>
                  </div>
                  <div>
                    {" "}
                    <TextField
                      required
                      type={"text"}
                      fullWidth
                      variant="standard"
                      name="url"
                      defaultValue={item.url}
                      placeholder="e.g. https://github.com/paper/paper"
                      onChange={(event: any) => {
                        // required validation
                        if (event.target.value.length > 0) {
                          setOriginalPackage({
                            ...originalPackage,
                            url: event.target.value,
                          });
                        }
                      }}
                    ></TextField>
                  </div>
                </Box>
              </div>
            );
          }
        )} */}

      <FormControl
        sx={{
          p: 2,
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
        }}
      >
        <FormLabel>
          Record the main repository that stores the code for the reproduction
          package provided by the authors.
        </FormLabel>
        <FormHelperText>Contents of reproduction package</FormHelperText>
        <TextField
          variant="standard"
          name="name"
          type={"text"}
          sx={{
            marginBottom: 2,
          }}
          value={
            originalPackages && originalPackages[0]?.name
              ? originalPackages[0]?.name
              : ""
          }
          placeholder="e.g. Main code repository with data"
          onChange={fillIntoDefaultFields}
        />
        <TextField
          type={"text"}
          sx={{
            marginBottom: 2,
          }}
          variant="standard"
          value={
            originalPackages && originalPackages[0]?.url
              ? originalPackages[0]?.url
              : ""
          }
          name="url"
          placeholder="e.g. https://github.com/paper/paper"
          onChange={fillIntoDefaultFields}
        />
        <FormLabel>
          Are there additional data in different repositories? Use the button
          below to add links to these as well.
        </FormLabel>{" "}
        <Button variant="contained" onClick={addIntoSystem}>
          + Add additional reproduction packages for data
        </Button>
      </FormControl>
    </>
  );
}

export default AdditionalInfo;
