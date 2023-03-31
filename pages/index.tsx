import React, { useEffect, useState } from "react";
import { Avatar, CssBaseline, TextField, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { successPopUp, errorPopUp } from "@/utils/toastify";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import Link from "next/link";
import { isAuthticated } from "@/utils/isAuthenticated";
import Meta from "@/components/Meta";

const initialState = {
  email: "",
  username: "",
  password: "",
};

export default function Login() {
  const [formDetails, setFormDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const { username, email, password } = formDetails;

  // Validate fields
  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const disabled = !username || !email || !password || !regex.test(email);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/register", formDetails);
      setLoading(false);
      setFormDetails(initialState);
      successPopUp({ msg: "Account Created Successfully. Proceed to login" });
      router.push("/signin");
    } catch (error: any) {
      setLoading(false);
      errorPopUp({ msg: error.response.data.message });
    }
  };

  // Check if user is already signed in and redirect them to dashboard
  useEffect(() => {
    isAuthticated() && router.replace("/dashboard");
  }, []);

  return (
    <>
      <Meta title="Create Account" />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/bg.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1664C0" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create your account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                onChange={handleChange}
                value={formDetails.email}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                variant="standard"
                onChange={handleChange}
                value={formDetails.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                onChange={handleChange}
                value={formDetails.password}
              />

              <LoadingButton
                loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={disabled}
              >
                Create Account
              </LoadingButton>

              <Box>
                <Link href="/signin" style={{ color: "#1664C0" }}>
                  Already have an account? Sign In
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
