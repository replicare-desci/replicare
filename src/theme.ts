import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#32454D",
      light: "#EFECEC",
      dark: "#141818",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#EFECEC",
      paper: "#8C8881",
    },
  },
  typography: {
    fontFamily: "Roboto,sans-serif",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#EFECEC",
          // color: "red",
        },
      },
    },
  },
});

export default theme;
