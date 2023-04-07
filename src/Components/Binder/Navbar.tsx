import Sidebar from "../Sidebar";
// import ConnectionWallet from "../ConnectionWallet";
import { Link } from "react-router-dom";
import ConnectWalletPopUp from "../ConnectWalletPopUp";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
const Navbar = () => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          {/* <Button sx={{ color: "#ffffff" }}>Signup</Button> */}
          <Link to="/">
            <Box display={"flex"}>
              {" "}
              <img style={{ width: "15%" }} src={logo} alt="logo" />
            </Box>
          </Link>
          {/* <ConnectionWallet /> */}
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ width: "100%" }}
          >
            <Link to="https://docs.replicare.dev">
              {" "}
              <Button
                sx={{
                  color: "primary.main",
                  backgroundColor: "background.paper",
                  mx: 2,
                }}
                variant="contained"
              >
                Docs
              </Button>
            </Link>
            <ConnectWalletPopUp /> <Sidebar />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
