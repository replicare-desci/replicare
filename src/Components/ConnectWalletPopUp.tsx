import * as React from "react";
import Person2Icon from "@mui/icons-material/Person2";
import { UserContext } from "../context/ContextProvider";
import ConnectionWallet from "../ConnectionWallet";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
// import { saveUserWalletAddress } from "../firebase/firebaseFunctions";

export default function ConnectWalletPopUp() {
  const { store, setStore } = UserContext();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = sessionStorage.getItem("id");
  return (
    <div>
      {!!id && id.length > 0 && store.user.walletAddress.length > 0 ? (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#222629",
            color: "primary.main",

            textTransform: "unset",

            ":hover": {
              bgcolor: "#222629",
              color: "white",
            },
          }}
          onClick={() => {
            sessionStorage.clear();
            setStore((prev) => {
              return {
                ...prev,
                user: {
                  ...prev.user,
                  firstName: "",
                  lastName: "",
                  walletAddress: "",
                  emailID: "",
                  id: "",
                  isVerified: false,
                },
              };
            });
          }}
        >
          {store.user.walletAddress.slice(0, 5) +
            ".." +
            store.user.walletAddress.slice(38, 42)}
        </Button>
      ) : (
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
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
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
            <Box px={7}>
              <Typography variant="caption">
                By connecting to Common, you agree to our &nbsp;
                <span>
                  <a href="/">Terms of Service</a>
                </span>
                &nbsp; and &nbsp;
                <span>
                  <a href="/">Privacy Policy</a>
                </span>
              </Typography>
              <ConnectionWallet />
            </Box>
            {/* <Box my={2}>
              <Link
                to="sign-up"
                onClick={handleClose}
                style={{ color: "#222629", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </Box> */}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
