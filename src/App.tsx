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
// import { useBeforeUnload } from "react-router-dom";
import NotFound from "./Components/NotFound";
import ViewSelectPaper from "./Components/ReproductionStagesOverview/ViewSelectPaper";
import ViewScoping from "./Components/Scoping/ViewScoping/ViewScoping";
import Scoping from "./Components/Scoping/Scoping";
import SummarizePaperStepOne from "./Components/Scoping/SummarizePaperStepOne";
import DeclareRobustnessChecksStepFour from "./Components/Scoping/DeclareRobustnessChecksStepFour";
import AddRevisedReproductionPackagesStepTwo from "./Components/Scoping/AddRevisedReproductionPackagesStepTwo";
import OutlineClaimsStepThree from "./Components/Scoping/OutlineClaimsStepThree/OutlineClaimsStepThree";
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
                    <SelectPaperOverview />
                    <Footer />
                  </>
                }
              />{" "}
              <Route
                path="/reproductions/index/:pageType"
                element={
                  <>
                    <Navbar />
                    <SelectPaperOverview />
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
                path="/reproductions/index/:pageType/select-paper"
                element={
                  <>
                    <Navbar />
                    <SelectPaper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/reproductions/index/:pageType/scoping"
                element={
                  <>
                    <Navbar />
                    <Scoping />
                    <Footer />
                  </>
                }
              >
                {/* <Route
                  path="/scoping/step1"
                  element={
                    <>
                      <SummarizePaperStepOne />
                    </>
                  }
                ></Route>{" "}
                <Route
                  path="/scoping/step2"
                  element={
                    <>
                      <AddRevisedReproductionPackagesStepTwo />
                    </>
                  }
                ></Route>{" "}
                <Route
                  path="/scoping/step3"
                  element={
                    <>
                      <OutlineClaimsStepThree />
                    </>
                  }
                ></Route>{" "}
                <Route
                  path="/scoping/step4"
                  element={
                    <>
                      <DeclareRobustnessChecksStepFour />
                    </>
                  }
                ></Route> */}
              </Route>
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
