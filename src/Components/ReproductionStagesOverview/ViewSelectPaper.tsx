import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getSelectUserPaperData } from "../../firebase/firebaseFunctions";
import dayjs from "dayjs";
import { paperData } from "../../types/index.d";

const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

const ViewSelectPaper = () => {
  const navigate = useNavigate();

  const [userPaperData, setUserPaperData] = useState<paperData>();
  const { userPaperID } = useParams();
  useEffect(() => {
    getSelectUserPaperData(userPaperID as string)
      .then((data) => {
        setUserPaperData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userPaperID]);
  return (
    <div>
      <Container>
        <Typography variant="h4" my={5} component={"h1"} textAlign={"center"}>
          Select a paper
        </Typography>
        <Grid container>
          <Grid item px={1}>
            <Typography variant="caption" component={"p"}>
              Declare the paper that you will analyze in the remainder of the
              exercise and record other "candidate" papers for which you were
              unable to obtain access to a reproduction package. See detailed
              guidance
              <span>
                <a href="https://docs.replicare.dev">here</a>
              </span>
              .
            </Typography>
          </Grid>{" "}
          <Grid item>
            <Grid item my={3}>
              <Button variant="contained" onClick={() => navigate(-1)}>
                Return to stages overview
              </Button>
            </Grid>
            <Typography variant="h5" component={"h6"}>
              Basic Information
            </Typography>
          </Grid>
          <Grid item p={1}>
            <Typography variant="body1" component={"p"}>
              At this point, you are not expected to review the reproduction
              materials in detail, as you will dedicate most of your time to
              this in later stages of the exercise. If materials are available,
              you will declare this paper as your target to reproduce. Only then
              you will be asked to read the paper and define the scope of the
              reproduction exercise.
              <span>
                <a href="https://docs.replicare.dev">here</a>
              </span>
              .
            </Typography>
          </Grid>
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.1 Basic information about the paper.
            </Typography>
            <Box
              p={1}
              boxShadow={1}
              py={2}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData && userPaperData?.paper !== null && (
                <Box display={"flex"}>
                  {" "}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Digital Object Identifier (or URL):
                  </Typography>
                  <Typography variant="subtitle2">
                    {" "}
                    {userPaperData?.paper?.doi
                      ? userPaperData?.paper?.doi
                      : `N/A`}
                  </Typography>
                </Box>
              )}

              <Box display={"flex"}>
                {" "}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Title of the paper:
                </Typography>
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.paper?.title
                    ? userPaperData?.paper?.title
                    : `N/A`}
                </Typography>
              </Box>
              <Box display={"flex"}>
                {" "}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {" "}
                  Publication Name:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.paper?.journal_name
                    ? userPaperData?.paper?.journal_name
                    : `N/A`}{" "}
                </Typography>
              </Box>
              <Box display={"flex"}>
                {" "}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {" "}
                  Publication Year:{" "}
                </Typography>{" "}
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.paper?.publication_year
                    ? dayjs(userPaperData?.paper?.publication_year).format(
                        "L LT"
                      )
                    : `N/A`}{" "}
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {" "}
                  Authors:{" "}
                </Typography>
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.paper?.author
                    ? userPaperData?.paper?.author
                    : `N/A`}
                </Typography>
              </Box>
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.2 Is a reproduction package available for this paper?
            </Typography>
            <Box
              p={1}
              boxShadow={1}
              py={2}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData?.reproduction_package_available
                ? userPaperData?.reproduction_package_available
                : "N/A"}
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.3 Have you contacted the authors for a reproduction package?
              Consult the{" "}
              <span>
                <a href="https://docs.replicare.dev">docs</a>
              </span>{" "}
              for recommendations on contacting authors.
            </Typography>
            <Box
              p={1}
              py={2}
              boxShadow={1}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData?.authors_contacted
                ? userPaperData?.authors_contacted
                : "N/A"}
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.4 How did the authors respond? Select all that apply.
            </Typography>
            <Box
              p={1}
              boxShadow={1}
              py={2}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              <ul>
                {userPaperData?.authors_response &&
                userPaperData?.authors_response.length > 0
                  ? userPaperData?.authors_response.map(
                      (item: string, index: number) => {
                        return <li key={index}>{item}</li>;
                      }
                    )
                  : "N/A"}
              </ul>
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.5 If there are no reproduction packages, are you willing to
              build a reproduction package from scratch?
            </Typography>
            <Box p={1} py={2} boxShadow={1} border={1}>
              {userPaperData?.reproduction_package_from_scratch
                ? userPaperData?.reproduction_package_from_scratch
                : "N/A"}
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Box
              p={1}
              py={2}
              boxShadow={1}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Package name:
                {userPaperData?.original_reproduction_packages &&
                userPaperData?.original_reproduction_packages?.length > 0
                  ? userPaperData?.original_reproduction_packages[0]?.name
                  : "N/A"}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Package URL:
                {userPaperData?.original_reproduction_packages &&
                userPaperData?.original_reproduction_packages?.length > 0
                  ? userPaperData?.original_reproduction_packages[0]?.url
                  : "N/A"}
              </Typography>
            </Box>
          </Grid>{" "}
          <Grid item my={3} mb={5}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Return to stages overview
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ViewSelectPaper;
