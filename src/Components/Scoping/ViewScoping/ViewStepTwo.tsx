import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { paperData } from "../../../types/index.d";
const ViewStepTwo = ({
  userPaperData,
  setUserPaperData,
}: {
  userPaperData: paperData;
  setUserPaperData: any;
}) => {
  return (
    <Container>
      <Box my={4}>
        <Typography>
          <strong>2.1 </strong>Download the original reproduction package,
          upload it to a new repository, and record it below. This will be the
          revised reproduction package and will store any improvements that you
          will implement as part of this project. See detailed guidance here{" "}
          <span>
            <a
              style={{
                textDecoration: "none",
                color: "#3234df",
              }}
              href="https://docs.replicare.dev"
            >
              docs.
            </a>
          </span>
        </Typography>
        {/* <FormHelperText>Contents of reproduction package</FormHelperText> */}
        <Box p={1} boxShadow={1} py={3} my={3} border={1}>
          {typeof userPaperData !== "undefined" &&
          userPaperData?.revised_reproduction_packages &&
          userPaperData?.revised_reproduction_packages.length > 0 ? (
            userPaperData?.revised_reproduction_packages.map(
              (item: any, index: number) => {
                return (
                  <>
                    {" "}
                    <Typography sx={{ fontWeight: 500 }}>
                      Package Name : {item?.name ? item?.name : "N/A"}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      Package URL : {item?.url ? item?.url : "N/A"}
                    </Typography>
                  </>
                );
              }
            )
          ) : (
            <Typography sx={{ fontWeight: 500 }}>N/A</Typography>
          )}
        </Box>
        {/* <Typography>
          Are there additional data in different repositories? Use the button
          below to add links to these as well.
        </Typography>{" "} */}
      </Box>
    </Container>
  );
};

export default ViewStepTwo;
