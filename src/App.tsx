import React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import "./styles/App.css";

import { Route, Routes, Outlet } from "react-router-dom";
import Main from "./Components/Main";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Reproductions from "./Components/Reproductions";
import SelectAPaper from "./Components/SelectAPaper";
import SelectPaper from "./Components/SelectPaper";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Main />
              <Footer />
            </>
          }
        />

        <Route
          path="/reproductions"
          element={
            <>
              <Navbar />
              <Reproductions />
              <Footer />
            </>
          }
        />

        <Route
          path="/reproductions/index"
          element={
            <>
              <Navbar />
              <SelectAPaper />
              <Footer />
            </>
          }
        />
        <Route
          path="/reproductions/index/select-paper"
          element={
            <>
              <Navbar />
              <SelectPaper />
              <Footer />
            </>
          }
        />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </ThemeProvider>
  );
}
