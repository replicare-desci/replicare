import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Footer from "./Components/Binder/Footer";
import Navbar from "./Components/Binder/Navbar";
import "./styles/App.css";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Main from "./Components/Main";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Reproductions from "./Components/Reproductions";
import SelectPaperOverview from "./Components/SelectPaper/SelectPaperOverview";
import SelectPaper from "./Components/SelectPaper/SelectPaper";
import { UserContext } from "./context/ContextProvider";

import NotFound from "./Components/NotFound";
import ViewSelectPaper from "./Components/ReproductionStagesOverview/ViewSelectPaper";
import ViewScoping from "./Components/Scoping/ViewScoping/ViewScoping";
import Scoping from "./Components/Scoping/Scoping";
import DescribeInputStepOne from "./Components/Assessment/DescribeInputStepOne";
import DescribeCodeStepTwo from "./Components/Assessment/DescribeCodeStepTwo";
import DiagramBuilderStepThree from "./Components/Assessment/DiagramBuilderStepThree";
import MasterScriptStepFour from "./Components/Assessment/MasterScriptStepFour";
import AccessDisplayItemStepFive from "./Components/Assessment/AccessDisplayItemStepFive";
import PaperLevelReproducbilityStepSix from "./Components/Assessment/PaperLevelReproducbilityStepSix";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function App() {
  const { store } = UserContext();
  console.log("store", store);

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              {/* TODO: remove these  */}
              <Route
                path="/step6"
                element={
                  <>
                    <Navbar />
                    <PaperLevelReproducbilityStepSix />

                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/step5"
                element={
                  <>
                    <Navbar />
                    <AccessDisplayItemStepFive />

                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/step4"
                element={
                  <>
                    <Navbar />
                    <MasterScriptStepFour />

                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/step3"
                element={
                  <>
                    <Navbar />
                    <DiagramBuilderStepThree />

                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/step2"
                element={
                  <>
                    <Navbar />
                    <DescribeCodeStepTwo />

                    <Footer />
                  </>
                }
              />
              <Route
                path="/step1"
                element={
                  <>
                    <Navbar />
                    <DescribeInputStepOne />

                    <Footer />
                  </>
                }
              />{" "}
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
                path="/reproductions/:pageType/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <SelectPaperOverview />
                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/reproductions/select-paper/:pageType/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <SelectPaper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reproductions/select-paper/view/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <ViewSelectPaper />
                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/reproductions/scoping/view/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <ViewScoping />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reproductions/scoping/edit/:userPaperID"
                element={
                  <>
                    <Navbar />
                    <Scoping />
                    <Footer />
                  </>
                }
              ></Route>
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
          />{" "}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
