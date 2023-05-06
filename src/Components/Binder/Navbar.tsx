import Sidebar from "../Sidebar";
// import ConnectionWallet from "../ConnectionWallet";
import { Link } from "react-router-dom";
import ConnectWalletPopUp from "../ConnectWalletPopUp";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import logo from "../../assets/images/logo.png";
import RainbowWallet from "../../RainbowWallet";

const Navbar = () => {
  return (
    <div>
      <AppBar position="relative" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
          {/* <Button sx={{ color: "#ffffff" }}>Signup</Button> */}{" "}
          <Link to="/">
            <Box
              component="img"
              sx={{
                width: "100%",
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
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {" "}
              <Button
                sx={{
                  // color: "primary.main",
                  // backgroundColor: "background.default",

                  // mx: 2,
                  // ":hover": {
                  //   backgroundColor: "background.paper",

                  //   color: "primary.light",
                  // },

                  color: "primary.main",
                  marginX: 1,
                  backgroundColor: "background.default",
                  // paddingX: 3,
                  textTransform: "unset",
                  fontSize: 15,
                  fontWeight: "800",
                  borderRadius: 2,
                  transition: "all 100ms ease-in-out",

                  ":hover": {
                    backgroundColor: "background.paper",
                    transform: "scale(1.02)",
                  },
                }}
                variant="contained"
              >
                🗒️
                {/* <ArticleIcon sx={{ fontSize: 18, mr: 0.5 }} /> */}
                Docs
              </Button>
            </Link>
            {/* <ConnectWalletPopUp /> */}
            <RainbowWallet />

            <Sidebar />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
