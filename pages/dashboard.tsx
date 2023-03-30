import React, { useEffect, useState } from "react";
import { Avatar, CssBaseline, Grid, Typography, Button } from "@mui/material";
import Link from "next/link";
import { isAuthticated } from "@/utils/isAuthenticated";
import { useRouter } from "next/router";
import { successPopUp } from "@/utils/toastify";

interface props {
  username: any;
}

export default function Dashboard() {
  const [user, setUser] = useState<props>();
  const router = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    successPopUp({ msg: "Successfully signed out" });
    router.push("/signin");
  };

  useEffect(() => {
    !isAuthticated() && router.replace("/signin");

    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as any));
    }
  }, []);

  return (
    <Grid container component="main">
      <CssBaseline />

      <Typography>Welcome {user?.username} </Typography>
      <Button variant="outlined" onClick={handleLogout}>
        Sign Out
      </Button>
    </Grid>
  );
}
