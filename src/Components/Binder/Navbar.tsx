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
import ArticleIcon from "@mui/icons-material/Article";
import logo from "../../assets/images/logo.png";
const Navbar = () => {
  return (
    <div>
      <AppBar position="relative" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          {/* <Button sx={{ color: "#ffffff" }}>Signup</Button> */}
          <Link to="/">
            <Box
              component="img"
              sx={{
                // height: "10%",
                width: "100%",

                // color: "primary.light",
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
            <Link
              to="https://docs.replicare.dev"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <Button
                sx={{
                  color: "primary.main",
                  backgroundColor: "background.default",

                  mx: 2,
                  ":hover": {
                    backgroundColor: "background.paper",

                    color: "primary.light",
                  },
                }}
                variant="contained"
              >
                <ArticleIcon sx={{ fontSize: 20, mr: 1 }} />
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
