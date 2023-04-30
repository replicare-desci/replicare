import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  ListItem,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { paperData, revised_reproduction_packages } from "../../types";
interface props {
  scopingData: paperData;
  setScopingData: any;
}

const AddRevisedReproductionPackagesStepTwo = ({
  scopingData,
  setScopingData,
}: props) => {
  // const [count, setCount] = React.useState(0);
  // const renderAdditional = () => {
  //   setCount(count + 1);
  // };
  // handle change
  const addRevisedPackageChangeHandler = () => {
    if (revisedPackage.name.length > 0 && revisedPackage.url.length > 0) {
      setScopingData((prev: paperData) => {
        if (
          prev.original_reproduction_packages &&
          typeof prev.original_reproduction_packages !== "undefined" &&
          prev.original_reproduction_packages.length > 0
        ) {
          return {
            ...prev,
            revised_reproduction_packages: [
              ...prev.original_reproduction_packages,
            ],
          };
        }
        console.log(scopingData);
      });
      setRevisedPackage({
        name: "",
        url: "",
        stage: "original",
        content_type: "code",
      });
    } else {
      alert("Please fill the required fields");
    }
  };

  const [revisedPackage, setRevisedPackage] =
    useState<revised_reproduction_packages>({
      name: "",
      url: "",
      stage: "original",
      content_type: "code",
    });
  // const renderedComponents = Array.from({ length: count }, (_, index) => (
  //   <AdditionalInfo key={index} />
  // ));

  useEffect(() => {
    setScopingData((prev: paperData) => {
      if (
        prev?.original_reproduction_packages !== undefined &&
        prev?.original_reproduction_packages?.length > 0
      ) {
        return {
          ...prev,
          revised_reproduction_packages: [
            ...prev?.original_reproduction_packages,
          ],
        };
      }
    });
  }, [setScopingData]);
  return (
    <div>
      {scopingData?.original_reproduction_packages !== undefined &&
        scopingData?.original_reproduction_packages?.length > 0 &&
        scopingData?.original_reproduction_packages?.map(
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
                      value={item.name}
                      placeholder="e.g. Main code repository with data"
                      onChange={(event: any) => {
                        if (event.target.value.length > 0) {
                          setRevisedPackage({
                            ...revisedPackage,
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
                      value={item.url}
                      placeholder="e.g. https://github.com/paper/paper"
                      onChange={(event: any) => {
                        // required validation
                        if (event.target.value.length > 0) {
                          setRevisedPackage({
                            ...revisedPackage,
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
              type={"text"}
              value={revisedPackage.name}
              // value={revisedPackage.name}
              onChange={(event: any) => {
                setRevisedPackage({
                  ...revisedPackage,
                  name: event.target.value,
                });
              }}
              name="name"
              placeholder="e.g. Main code repository with data"
            ></TextField>
            <TextField
              type={"text"}
              value={revisedPackage.url}
              // value={revisedPackage.url}
              variant="standard"
              onChange={(event: any) => {
                setRevisedPackage({
                  ...revisedPackage,
                  url: event.target.value,
                });
              }}
              name="url"
              placeholder="e.g. https://github.com/paper/paper"
            ></TextField>
            <FormLabel>
              Are there additional data in different repositories? Use the
              button below to add links to these as well.
            </FormLabel>{" "}
            {/* {renderedComponents} */}
            <Button
              variant="contained"
              onClick={addRevisedPackageChangeHandler}
            >
              + Add additional reproduction packages for data
            </Button>
          </FormControl>
        </ListItem>
      </Box>
    </div>
  );
};

export default AddRevisedReproductionPackagesStepTwo;
