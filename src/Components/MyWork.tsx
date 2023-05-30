import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  getUserPaperData,
  deleteUserPaperData,
} from "../firebase/firebaseFunctions";
import { Link } from "react-router-dom";
import { paperData } from "../types/index.d";

import { useState, useEffect, useCallback } from "react";
import React from "react";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CancelIcon from "@mui/icons-material/Cancel";
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const MyWork = () => {
  const userID = sessionStorage.getItem("id") as string;
  const [userPaperID, setUserPaperID] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  console.log(data);

  // deletes the data from userPaper Table
  const deleted = (userPaperID: string) => {
    deleteUserPaperData(userPaperID);
    setData((prev) => {
      return prev.filter((item: any) => item.id !== userPaperID);
    });
  };

  const handleClickOpen = (userPaperIDEvent: string) => {
    setUserPaperID(userPaperIDEvent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserPaperData = useCallback((userPaperData: any) => {
    console.log(userPaperData);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserPaperData(userID, handleUserPaperData);
        console.log("my work user data", res);
        setData(res);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [userID, handleUserPaperData]);

  return (
    <>
      <Container>
        {data.length !== 0 ? (
          data?.map((item: paperData, index: number) => {
            return (
              <Box key={index} boxShadow={2} p={2} my={2} borderRadius={1}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Please give your project a {/* TODO: nor working */}
                  <strong>
                    {item?.claims?.claimSummary
                      ? item?.claims?.claimSummary
                      : "nickname"}
                  </strong>{" "}
                  in the Scoping step.
                </Typography>
                {item?.paper?.title ? (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Title : <strong>{item?.paper?.title}</strong>
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Please enter a <strong>title</strong> in the Select a paper
                    step.
                  </Typography>
                )}

                <Typography variant="body1" sx={{ mb: 1 }}>
                  Created on:{" "}
                  <strong>{item.created_at.toDate().toLocaleString()}</strong>
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  Paper status:{" "}
                  <strong>
                    {item?.paper_type &&
                      item?.paper_type?.charAt(0).toUpperCase() +
                        item?.paper_type?.slice(1).replace("_", " ")}

                    {/* {item?.paper_type &&
                      item?.paper_type.split("_").join(" ").toString()} */}
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Current stage:{" "}
                  <strong>
                    {item?.workflow_stage &&
                      item?.workflow_stage?.charAt(0).toUpperCase() +
                        item?.workflow_stage.slice(1).replace("_", " ")}
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Number of display items assessed:<strong> 0</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Number of claims assessed:<strong> 0</strong>
                </Typography>
                <Box my={2}>
                  <Link to={`/reproductions/edit/${item?.id}`}>
                    <Button variant="contained" sx={{ marginRight: 1 }}>
                      <EditIcon sx={{ fontSize: 18, mr: 1 }} />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleClickOpen(item?.id);
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography
            variant="h6"
            component={"p"}
            sx={{
              textAlign: "center",
              my: 15,
            }}
          >
            {" "}
            There is not previous data available. Please create new by clicking
            the +Start reproduction button.{" "}
          </Typography>
        )}
      </Container>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-delete-reproduction-data"
        >
          <DialogTitle id="alert-dialog-title">
            {"This action cannot be undone. "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently delete your reproduction attempt
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              <CancelIcon sx={{ fontSize: 18, mr: 1 }} />
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                deleted(userPaperID);
              }}
              autoFocus
              variant="contained"
            >
              <DeleteForeverIcon sx={{ fontSize: 18, mr: 1 }} />
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default MyWork;
