import React, { useState, useEffect } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  existsEmail,
  existsWalletAddress,
} from "../firebase/firebaseFunctions";
import {
  CssBaseline,
  Box,
  Avatar,
  Grid,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import { Link } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  function isValidEmail(emailID: string): boolean {
    // return /\S+@\S+\.\S+/.test(emailID);
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailID);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existsEmailVar = await existsEmail(db, emailID);
    const existsWalletAddressVar = await existsWalletAddress(db, walletAddress);
    console.log(existsEmailVar);
    // const form = event.target as HTMLFormElement;
    // const data = Object.fromEntries(new FormData(form));
    // const data = new FormData(event.currentTarget);
    // console.log(data);

    if (isValidEmail(emailID)) {
      if (!existsEmailVar && !existsWalletAddressVar) {
        const userCollectionRef = collection(db, "user");
        const docRef = await addDoc(userCollectionRef, {
          firstName: firstName,
          lastName: lastName,
          emailID: emailID,
          isVerified: true,
          walletAddress: walletAddress,
          // password: password,
        });
        // use toast to say account already exists
        toast.success("Account Created");

        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("Account already exists ");
        toast.error("Account Already exists");
      }
    } else {
      console.log("Invalid Email");

      toast.error("Invalid Email");
    }
  };

  // const [password, setPassword] = useState("");

  // const addUser = async () => {
  //   console.log("Document written with ID: ", docRef.id);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                type={"text"}
                autoFocus
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                type={"text"}
                name="lastName"
                // autoComplete="family-name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="emailID"
                label="Email Address"
                type={"emailID"}
                name="emailID"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="walletAddress"
                label="Wallet Address"
                type={"text"}
                name="walletAddress"
                onChange={(event) => {
                  setWalletAddress(event.target.value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via emailID."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            // onClick={addUser}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
