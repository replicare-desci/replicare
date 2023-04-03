import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import "./styles/App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Main from "./Components/Main";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Reproductions from "./Components/Reproductions";
import SelectAPaper from "./Components/SelectAPaper";
import SelectPaper from "./Components/SelectPaper";
import { UserContext } from "./context/ContextProvider";
// import { useBeforeUnload } from "react-router-dom";
import NotFound from "./Components/NotFound";
import ViewSelectPaper from "./Components/ReproductionStagesOverview/ViewSelectPaper";
export default function App() {
  const { store } = UserContext();
  console.log(store);
  // useBeforeUnload((event: BeforeUnloadEvent) => sessionStorage.clear());
  return (
    <BrowserRouter>
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

          {store?.user?.isVerified && store?.user?.walletAddress && (
            <>
              <Route
                path="/update"
                element={
                  <>
                    <Navbar />
                    <SignUp />

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
                path="/reproductions/index/:pageType/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <SelectAPaper />
                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/reproductions/index/:pageType"
                element={
                  <>
                    <Navbar />
                    <SelectAPaper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reproductions/index/view/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <ViewSelectPaper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reproductions/index/:pageType/select-paper"
                element={
                  <>
                    <Navbar />
                    <SelectPaper />
                    <Footer />
                  </>
                }
              />
            </>
          )}

          <Route
            path="/sign-in"
            element={
              <>
                <Navbar />
                <SignIn />
                <Footer />
              </>
            }
          />
          <Route
            path="not-found"
            element={
              <>
                <Navbar />
                <NotFound />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/not-found" replace={false} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
