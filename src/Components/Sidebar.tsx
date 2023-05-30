import * as React from "react";

import {
  Box,
  Button,
  Divider,
  List,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
// import gitcoinLogo from "../assets/images/gitcoin.png";
import twitterLogo from "../assets/images/twitter.png";
import githubLogo from "../assets/images/Github-Logo-PNG-Photo.png";
type Anchor = "right";

export default function Sidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const [menuIconClicked, setMenuIconClicked] = React.useState(false);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      setMenuIconClicked((prev) => !prev);
    };

  //   const [selectedIndex, setSelectedIndex] = React.useState("");

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 500, backgroundColor: "primary.light" }}
      className="sidebar-mobile-width"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {" "}
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 4.5, pt: 3 }}>
        {" "}
        <Button onClick={() => setMenuIconClicked}>
          {" "}
          <ClearIcon sx={{ color: "#0000000", fontSize: 30 }} />
        </Button>
      </Box>
      <List sx={{ px: 9, textAlign: "left" }} className="sidebar-mobile">
        <Link to="/" style={{ textDecoration: "none" }} target={"_blank"}>
          <Typography
            variant="h4"
            sx={{ mb: 2, lineHeight: 0.8 }}
            component={"p"}
          >
            <span className="hover-underline-animation ">Home</span>
          </Typography>
        </Link>{" "}
        <Link
          to="/reproductions"
          style={{ textDecoration: "none" }}
          // target={"_blank"}
        >
          <Typography
            className="hover-underline-animation"
            variant="h4"
            sx={{ mb: 2, lineHeight: 0.8 }}
            component={"p"}
          >
            Your Work
          </Typography>
        </Link>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          // target={"_blank"}
        >
          <Typography
            className="hover-underline-animation"
            variant="h4"
            sx={{ mb: 2, lineHeight: 1 }}
            component={"p"}
          >
            Search Reproductions
          </Typography>{" "}
        </Link>
        <Link
          to="https://docs.replicare.dev/"
          style={{ textDecoration: "none" }}
          target={"_blank"}
        >
          <Typography
            className="hover-underline-animation"
            variant="h4"
            sx={{ mb: 4, lineHeight: 0.8 }}
            component={"p"}
          >
            Documentation
          </Typography>
        </Link>{" "}
        <Divider />{" "}
        <Link
          to="https://twitter.com/replicare_desci"
          style={{ textDecoration: "none" }}
          target={"_blank"}
        >
          <Box my={1}>
            <img
              src={twitterLogo}
              alt="twitter-logo"
              width={"35%"}
              // height={"80%"}
            />
          </Box>
        </Link>{" "}
        {/* <Link
          to="https://explorer.gitcoin.co/#/round/1/0x6e8dc2e623204d61b0e59e668702654ae336c9f7/0x6e8dc2e623204d61b0e59e668702654ae336c9f7-4"
          style={{ textDecoration: "none" }}
          target={"_blank"}
        >
          <Box>
            {" "}
            <img
              src={gitcoinLogo}
              alt="gitcoin-grant-logo"
              width={"35%"}
              // height={"50px"}
            />
          </Box>
        </Link>{" "} */}
        <Link
          to="https://explorer.gitcoin.co/#/round/1/0x6e8dc2e623204d61b0e59e668702654ae336c9f7/0x6e8dc2e623204d61b0e59e668702654ae336c9f7-4"
          style={{ textDecoration: "none" }}
          target={"_blank"}
        >
          <Box>
            {" "}
            <img
              src={githubLogo}
              alt="github-logo"
              width={"35%"}
              // height={"50px"}
            />
          </Box>
        </Link>{" "}
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ color: "primary.light", zIndex: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            {menuIconClicked ? (
              <ClearIcon sx={{ color: "#0000000" }} />
            ) : (
              <MenuIcon />
            )}
          </Button>
          <SwipeableDrawer
            // sx={{ zIndex: 1 }}
            anchor={anchor}
            open={menuIconClicked}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
