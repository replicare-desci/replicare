import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SelectAPaper = () => {
  return (
    <div>
      {/* <div>SelectAPaper</div> */}
      <Container>
        <Grid container py={12}>
          <Typography variant="h5" component="h1">
            Create a reproduction attempt
          </Typography>
          <Grid item xs={12} xl={12} p={2}>
            <Typography variant="body1" p={1}>
              Select A paper
            </Typography>
            <Typography variant="body2" p={2}>
              Declare the paper that you will analyze in the remainder of the
              exercise and record other "candidate" papers for which you were
              unable to obtain access to a reproduction package. See detailed
              guidance here.
            </Typography>
            <Link
              to="/reproductions/index/select-paper"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Edit this section</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SelectAPaper;
