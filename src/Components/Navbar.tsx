import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import Box from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Button sx={{ color: "#ffffff" }}>Signup</Button>
          <Typography variant="h6" color="inherit" noWrap>
            RRDAO
          </Typography>
          <Sidebar />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
