import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { isAuthticated } from "@/utils/isAuthenticated";
import { useRouter } from "next/router";
import { successPopUp } from "@/utils/toastify";
import Meta from "@/components/Meta";

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
    <>
      <Meta title="Dashboard" />
      <Box
        component="main"
        sx={{ height: "100vh", bgcolor: "#000" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box component="div" textAlign="center">
          <Typography component="h1" variant="h5" fontWeight="bold" textTransform="capitalize" color="#fff">
            Welcome {user?.username}{" "}
          </Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ mt: 5 }}>
            Sign Out
          </Button>
        </Box>
      </Box>
    </>
  );
}
