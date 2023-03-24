import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Person2Icon from "@mui/icons-material/Person2";

import ConnectionWallet from "../ConnectionWallet";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ConnectWalletPopUp() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "#222629",
          textTransform: "unset",

          ":hover": {
            bgcolor: "#222629",
            color: "white",
          },
        }}
        onClick={handleClickOpen}
      >
        <Person2Icon sx={{ marginRight: 1, fontSize: 20 }} />
        Sign in
      </Button>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <Grid container>
          <Grid
            item
            xl={4}
            sm={4}
            xs={12}
            sx={{ backgroundColor: "primary.main" }}
          >
            <DialogContent>
              <DialogContentText>
                <Typography variant="subtitle1">
                  This Community requires an Ethereum Wallet
                </Typography>
                <Divider
                  sx={{
                    color: "primary.main",
                    height: 4,
                    marginY: 1,
                    backgroundColor: "primary.main",
                  }}
                />
                <Typography variant="body2">
                  Many communities require different wallets based on the chain
                  they are built on and the types of tokens members hold.
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid
            item
            xl={8}
            sm={8}
            xs={12}
            my={2}
            // my={5}
            flexDirection={"column"}
            sx={{ textAlign: "center" }}
          >
            <Box justifyContent={"flex-end"} display="flex">
              <IconButton
                sx={{
                  width: "20",
                  marginRight: 1,
                  marginTop: 1,
                  marginLeft: "auto",
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="caption">
                By connecting to Common, you agree to our
                <span>
                  <a href="/">Terms of Service</a>
                </span>
                and
                <span>
                  <a href="/">Privacy Policy</a>
                </span>
              </Typography>
              <ConnectionWallet />
            </Box>
            {/* <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions> */}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
