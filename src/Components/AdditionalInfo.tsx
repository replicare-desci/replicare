import {
  TextField,
  Button,
  FormControl,
  Box,
  ListItem,
  FormLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { original_reproduction_packages } from "../types/index.d";

interface Props {
  formData: any;
  setFormData: any;
}

function AdditionalInfo({ formData, setFormData }: Props): JSX.Element {
  const [isDelete, setDelete] = useState(true);

  const [originalPackage, setOriginalPackage] =
    useState<original_reproduction_packages>({
      name: "",
      url: "",
      stage: "original",
      content_type: "code",
    });

  const deleted = () => {
    setDelete(false);
  };

  const addIntoSystem = () => {
    if (originalPackage.name.length > 0 && originalPackage.url.length > 0) {
      setFormData({
        ...formData,
        original_reproduction_packages: [
          ...formData.original_reproduction_packages,
          originalPackage,
        ],
      });
      setOriginalPackage({
        name: "",
        url: "",
        stage: "original",
        content_type: "code",
      });
    } else {
      alert("Please fill the required fields");
    }
  };
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

      {formData.original_reproduction_packages.length > 0 &&
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
        )}

      <ListItem>
        <FormControl required fullWidth sx={{ py: 1 }}>
          <FormLabel>
            Record the main repository that stores the code for the reproduction
            package provided by the authors.
          </FormLabel>
          <FormHelperText>Contents of reproduction package</FormHelperText>
          <TextField
            variant="standard"
            name="name"
            type={"text"}
            value={originalPackage.name}
            defaultValue={originalPackage.name}
            placeholder="e.g. Main code repository with data"
            onChange={(event: any) => {
              setOriginalPackage({
                ...originalPackage,
                name: event.target.value,
              });
            }}
          ></TextField>
          <TextField
            required
            type={"text"}
            variant="standard"
            value={originalPackage.url}
            name="url"
            defaultValue={originalPackage.url}
            placeholder="e.g. https://github.com/paper/paper"
            onChange={(event: any) => {
              setOriginalPackage({
                ...originalPackage,
                url: event.target.value,
              });
            }}
          ></TextField>
          <FormLabel>
            Are there additional data in different repositories? Use the button
            below to add links to these as well.
          </FormLabel>{" "}
          <Button variant="contained" onClick={addIntoSystem}>
            + Add additional reproduction packages for data
          </Button>
        </FormControl>
      </ListItem>
    </>
  );
}

export default AdditionalInfo;
