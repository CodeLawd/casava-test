import * as React from "react";
import { Avatar, CssBaseline, TextField, Paper, Box, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { successPopUp, errorPopUp } from "@/utils/toastify";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formDetails, setFormDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const { email, password } = formDetails;

  const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  const disabled = !email || !password || !regex.test(email);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/signin", formDetails);
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      setLoading(false);
      setFormDetails(initialState);
      successPopUp({ msg: "Login Successful" });
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      errorPopUp({ msg: error.response.data.message });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login to your account
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
              sx={{ mt: 3, mb: 2, py: 2 }}
              disabled={disabled}
            >
              Login
            </LoadingButton>

            <Box>
              <Link href="/" style={{ color: "#1664C0" }}>
                Dont have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/bg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />
    </Grid>
  );
}
