import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import Box from "@mui/material";
import ConnectionWallet from "../ConnectionWallet";

const Navbar = () => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Sidebar />
          {/* <Button sx={{ color: "#ffffff" }}>Signup</Button> */}
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            justifyContent={"center"}
          >
            RRDAO
          </Typography>
          <ConnectionWallet />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
