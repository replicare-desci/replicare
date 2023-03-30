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
  createDefaultUserPaperData,
} from "../firebase/firebaseFunctions";

import { useState, useEffect } from "react";
import React from "react";
import dayjs from "dayjs";
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const MyWork = () => {
  const userID = sessionStorage.getItem("id") as string;

  const [deleteData, setDeleteData] = useState<boolean>(true);
  const [data, setData] = useState([]);
  console.log(data);

  const deleted = () => {
    setDeleteData(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserPaperData = (userPaperData: any) => {
    console.log(userPaperData);
    setData(userPaperData);
  };
  useEffect(() => {
    getUserPaperData(userID, handleUserPaperData);
  }, [userID]);

  return (
    <>
      {deleteData ? (
        <Container>
          {data.length !== 0 ? (
            data?.map((item: any, index: number) => {
              return (
                <Box key={index} boxShadow={2} p={2} my={2} borderRadius={1}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Please enter a title in the Select a paper step.
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Created on:{" "}
                    {dayjs(item?.createdAt?.seconds * 1000).format("L LT")}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Paper status: candidate Number of claims assessed: 0
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Current stage: Selecting a Paper
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Number of display items assessed: 0
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Number of claims assessed: 0
                  </Typography>
                  <Box my={2}>
                    <Button variant="contained" sx={{ marginRight: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              );
            })
          ) : (
            <p> there is nothing </p>
          )}
        </Container>
      ) : null}

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
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleted();
                handleClose();
              }}
              autoFocus
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default MyWork;
