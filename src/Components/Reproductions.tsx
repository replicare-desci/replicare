import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MyWork from "./MyWork";
import { createDefaultUserPaperData } from "../firebase/firebaseFunctions";
import { UserContext } from "../context/ContextProvider";
import AddIcon from "@mui/icons-material/Add";
const Reproductions = () => {
  const { store } = UserContext(); //from userContext we are fetching the user id

  // const userID = sessionStorage.getItem("id") as string; // we can also fetch userId from session/local storage if stored.

  const userID: string = store?.user?.id;

  async function newReproductionHandler() {
    const reproductionResponse: boolean = await createDefaultUserPaperData(
      userID
    );

    if (reproductionResponse) {
      console.log("reproduction created successfully");
    } else {
      alert("some thing wrong");
    }
  }
  return (
    <div>
      {/* <div>Reproductions</div> */}
      <Container>
        <Grid container mt={5} mb={4}>
          <Typography variant="h3" component="h1" my={5}>
            My work
          </Typography>
          <Grid item xs={12} xl={12}>
            <Link
              to="/reproductions/index/new"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" onClick={newReproductionHandler}>
                <AddIcon sx={{ fontSize: 18, mr: 1 }} /> Start a reproduction
              </Button>
            </Link>
          </Grid>
        </Grid>
        <MyWork />
      </Container>
    </div>
  );
};

export default Reproductions;
