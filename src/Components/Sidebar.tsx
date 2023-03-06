import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";

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
      sx={{ width: 500 }}
      className="sidebar-mobile-width"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ padding: 10 }} className="sidebar-mobile">
        <Typography variant="h4" component={"p"}>
          <span className="hover-underline-animation ">Home</span>
        </Typography>

        <Typography
          className="hover-underline-animation"
          variant="h4"
          component={"p"}
        >
          About
        </Typography>

        <Typography
          className="hover-underline-animation"
          variant="h4"
          component={"p"}
        >
          Events
        </Typography>

        <Typography
          className="hover-underline-animation"
          variant="h4"
          component={"p"}
        >
          Guide
        </Typography>

        <Typography
          className="hover-underline-animation"
          variant="h4"
          component={"p"}
        >
          Forum
        </Typography>

        <Typography
          className="hover-underline-animation"
          variant="h4"
          component={"p"}
        >
          Metrics
        </Typography>

        <Divider />
        <ListItem sx={{ padding: 0, marginY: 1 }}>
          <Button
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: 0,
              fontSize: 18,
            }}
          >
            Sign Up
          </Button>
        </ListItem>

        <ListItem sx={{ padding: 0, margin: 0 }}>
          <Button
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: 0,
              fontSize: 18,
            }}
          >
            Sign&nbsp; In
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ color: "#ffffff", zIndex: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            {menuIconClicked ? <ClearIcon /> : <MenuIcon />}
          </Button>
          <SwipeableDrawer
            sx={{ zIndex: 1 }}
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
