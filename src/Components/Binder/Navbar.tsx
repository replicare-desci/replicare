import Sidebar from "../Sidebar";

import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import logo from "../../assets/images/logo.png";
import RainbowWallet from "../../RainbowWallet";

const Navbar = () => {
  return (
    <div>
      <AppBar position="relative" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar>
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
                  color: "primary.main",
                  marginX: 1,
                  backgroundColor: "background.default",

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
            <RainbowWallet />

            <Sidebar />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
