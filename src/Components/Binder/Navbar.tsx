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
            <Box
              component="img"
              sx={{
                height: 64,

                py: 1,
              }}
              alt="replicare logo."
              src={logo}
            />
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
                  textDecoration: "none",
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
