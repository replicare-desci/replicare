import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getSelectUserPaperData } from "../../firebase/firebaseFunctions";
import dayjs from "dayjs";

const localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

type userPaperDataType = {
  authorAvailableForFurtherQuestion: string;
  authorContacted: string;
  buildFromScratch: string;
  checkBoxData: boolean[];
  createdAt: any;
  doiPaperData: {
    author: string;
    createdAt: any;
    doi: string;
    nameOfJournal: string;
    title: string;
    yearOfPublication: any;
  };
  paperID: string;
  reproductionData1: string;
  reproductionData2: string;
  reproductionPackageAvailable: string;
  userID: string;
};
const ViewSelectPaper = () => {
  const navigate = useNavigate();
  const checkBoxOptions = [
    {
      label: "Provided reproduction package.",
    },
    {
      label:
        "Declined to share reproduction package, citing legal or ethical reasons.",
    },
    {
      label:
        "Declined to share reproduction package but did not provide a reason.",
    },
    {
      label:
        "Declined to share the missing materials, citing not ready to share. Record date when you estimate that the authors may be ready to share the missing materials:",
    },
    {
      label: "Author(s) state that they no longer have access to the data.",
    },
    {
      label:
        "Shared detailed instructions on how to access the data (for restricted access only).",
    },
    {
      label: "Did not respond. As of:",
    },
  ];
  const [userPaperData, setUserPaperData] = useState<userPaperDataType>();
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
              <Box display={"flex"}>
                {" "}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Digital Object Identifier (or URL):
                </Typography>
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.doiPaperData?.doi
                    ? userPaperData?.doiPaperData?.doi
                    : `N/A`}
                </Typography>
              </Box>
              <Box display={"flex"}>
                {" "}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Title of the paper:
                </Typography>
                <Typography variant="subtitle2">
                  {" "}
                  {userPaperData?.doiPaperData?.title
                    ? userPaperData?.doiPaperData?.title
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
                  {userPaperData?.doiPaperData?.nameOfJournal
                    ? userPaperData?.doiPaperData?.nameOfJournal
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
                  {userPaperData?.doiPaperData?.yearOfPublication
                    ? dayjs(
                        userPaperData?.doiPaperData?.yearOfPublication
                      ).format("L LT")
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
                  {userPaperData?.doiPaperData?.author
                    ? userPaperData?.doiPaperData?.author
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
              {userPaperData?.reproductionPackageAvailable
                ? userPaperData?.reproductionPackageAvailable
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
              Consult the ACRe Guide for recommendations on contacting authors.
            </Typography>
            <Box
              p={1}
              py={2}
              boxShadow={1}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData?.authorContacted
                ? userPaperData?.authorContacted
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
                {" "}
                {userPaperData?.checkBoxData &&
                userPaperData?.checkBoxData.length > 0
                  ? userPaperData?.checkBoxData.map(
                      (item: boolean, index: number) => {
                        if (item) {
                          return (
                            <li>
                              <Typography variant="subtitle2" component={"p"}>
                                {checkBoxOptions[index].label}
                              </Typography>
                            </li>
                          );
                        }
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
              1.5 Are the authors available for further questions for ACRe
              reproductions?
            </Typography>
            <Box
              p={1}
              py={2}
              boxShadow={1}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData?.authorAvailableForFurtherQuestion
                ? userPaperData?.authorAvailableForFurtherQuestion
                : "N/A"}
            </Box>
          </Grid>{" "}
          <Grid item xl={12} xs={12} my={2}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600 }}
              component={"h6"}
            >
              1.6 If there are no reproduction packages, are you willing to
              build a reproduction package from scratch?
            </Typography>
            <Box
              p={1}
              py={2}
              boxShadow={1}
              border={1}
              //   sx={{ backgroundColor: "#222629" }}
            >
              {userPaperData?.buildFromScratch
                ? userPaperData?.buildFromScratch
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
                {userPaperData?.reproductionData1
                  ? userPaperData?.reproductionData1
                  : "N/A"}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Package URL:
                {userPaperData?.reproductionData2
                  ? userPaperData?.reproductionData2
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
